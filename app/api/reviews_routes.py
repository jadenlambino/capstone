from flask import Blueprint
from flask_login import current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews(id):
    reviews = Review.query.filter(id == Review.reviewed_id)
    return {'reviews': [review.to_dict() for review in reviews]}

# @review_routes.route('/<int:id>/', methods=['POST'])
# def create_review(id):
