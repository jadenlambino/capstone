from flask import Blueprint, jsonify, request
from flask_login import current_user
from sqlalchemy import true
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Listing, db
from app.forms.listing_form import ListingForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)
import ast

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

    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400

    # image = request.files["image"]

    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     print(upload)
    #     return upload, 400
    # print("hello from 29")
    # url = upload["url"]

    if form.validate_on_submit():
        data = form.data
        new_listing = Listing (
            user_id = current_user.id,
            product_tag = data['product_tag'],
            name = data['name'],
            price = float(data['price']),
            description = data['description'],
            photos = data['photos']
        )
        # print('++++++++++++++' +  str(data))
        db.session.add(new_listing)
        db.session.commit()
        return new_listing.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

@listing_routes.route('/<int:id>/', methods=["PATCH"])
def edit_listing(id):
    listing = Listing.query.filter_by(id=id).one()
    form = ListingForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403
    # db.session.update(edit_listing)
    # return edit_listing.to_dict()

@listing_routes.route('/<int:id>/buy', methods=['PATCH'])
def buy_listing(id):
    listing = Listing.query.filter_by(id=id).one()
    data = request.data.decode('utf-8')
    data_dict = ast.literal_eval(data)

    listing.set_purchase(data_dict['buyer_id'])

    db.session.commit()
    return listing.to_dict()

@listing_routes.route('/<int:id>/', methods=["DELETE"])
def delete_listing(id):
    listing = Listing.query.get(id)

    db.session.delete(listing)
    db.session.commit()

    return {"message": "Deleted successfully"}
