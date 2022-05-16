from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Listing, db
from app.forms.listing_form import ListingForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
def get_listings():
    listings = Listing.query.all()
    return {'listings': [listing.to_dict() for listing in listings]}

@listing_routes.route('/<int:id>/')
def get_single_listing(id):
    listing = Listing.query.filter(Listing.id == id).first()
    return {'listings': [listing.to_dict()]}

@listing_routes.route('/', methods=["POST"])
def post_listing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('--------------------------------')
    print(str(request.files) + '================================')
    print(str(request.form) + '!!!!!!!!!!!!!!!!!')

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

    if form.validate_on_submit():
        data = form.data
        print("++++++++++++++" + str(data))
        new_listing = Listing (
            user_id = current_user.id,
            product_tag = data['product_tag'],
            name = data['name'],
            price = float(data['price']),
            description = data['description'],
            photos = url
        )
        # print('++++++++++++++' +  str(data))
        db.session.add(new_listing)
        db.session.commit()
        return new_listing.to_dict()

    if form.errors:
        return form.errors, 403

@listing_routes.route('/<int:id>/', methods=["PATCH"])
def edit_listing(id):
    listing = Listing.query.filter_by(id=id).one()
    form = ListingForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(data['name'])
    print(data['price'])
    product_tag = data['product_tag']
    name = data['name']
    price = data['price']
    description = data['description']

    if form.validate_on_submit():
        listing.edit_product_tag(product_tag)
        listing.edit_name(name)
        listing.edit_price(price)
        listing.edit_description(description)
        db.session.commit()
        return listing.to_dict()

    if form.errors:
        return form.errors, 403
    # db.session.update(edit_listing)
    # return edit_listing.to_dict()

@listing_routes.route('/<int:id>/', methods=["DELETE"])
def delete_listing(id):
    listing = Listing.query.get(id)

    db.session.delete(listing)
    db.session.commit()

    return {"message": "Deleted successfully"}
