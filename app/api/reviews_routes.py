from flask import Blueprint, request
from flask_login import current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

# @review_routes.route('/')
# def get_reviews(id):
#     reviews = Review.query.filter(id == Review.reviewed_id)
#     return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(str(form.data) + '---------------------------------')
    if form.validate_on_submit():
        data = form.data
        new_review = Review (
            listing_id=data['listing_id'],
            reviewed_id = data['reviewed_id'],
            reviewer_id = current_user.id,
            rating = data['rating'],
            body = data['body']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    if form.errors:
        return form.errors, 403

@review_routes.route('/<int:id>/', methods=['PATCH'])
def edit_review(id):
    review = Review.query.filter_by(id = id).one()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data

    if form.validate_on_submit():
        review.edit_rating(data['rating'])
        review.edit_body(data['body'])
        db.session.commit()
        return review.to_dict()

    if form.errors:
        return form.errors, 403
