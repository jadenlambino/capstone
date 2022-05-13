from flask import Blueprint, request
from app.models import db, ListingPhotos
from flask_login import current_user
# from app.models.listing_photos import ListingPhotos
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.route("", methods=["POST"])
def upload_image():
    print(request)
    print(request.data)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    print(image.filename)
    print(image)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        print(upload)
        return upload, 400
    print("hello from 29")
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = ListingPhotos(listing_id=current_user.id, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}
