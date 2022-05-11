from flask import Blueprint, jsonify, request
from app.models import Listing, db

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
def get_listings():
    listings = Listing.query.all()
    return {'listings': [listing.to_dict() for listing in listings]}

def post_listing():
    pass
