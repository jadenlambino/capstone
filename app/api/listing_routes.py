from crypt import methods
from email.mime import image
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

@listing_routes.route('/', methods=["POST"])
def post_listing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print("++++++++++++++" + str(data))
        new_listing = Listing (
            user_id = current_user.id,
            product_tag = data['product_tag'],
            name = data['name'],
            price = float(data['price']),
            description = data['description'],
            photos = ""
        )
        print('++++++++++++++' +  str(data))
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
