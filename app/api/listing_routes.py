from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Listing, db
from app.forms.listing_form import ListingForm

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
        new_listing = Listing (
            user_id = current_user.id,
            product_tag = data['product_tag'],
            name = data['name'],
            price = data['price'],
            description = data['description'],
            photos = data['photos']
        )
        db.session.add(new_listing)
        db.session.commit()
        return new_listing.to_dict()

    if form.errors:
        return form.errors, 403
