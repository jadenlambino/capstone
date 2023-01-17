from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .listings import Listing
from .reviews import Review
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .reviews import Review


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_picture = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        listings = Listing.query.filter(Listing.user_id == self.id).all()
        purchases = Listing.query.filter(Listing.buyer_id == self.id).all()
        reviews = Review.query.filter(Review.reviewed_id == self.id).all()
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'listings': [listing.to_dict() for listing in listings],
            'reviews': [review.to_dict() for review in reviews],
            'purchases': [purchase.to_dict() for purchase in purchases],
            'profile_picture': self.profile_picture
        }

    listings = db.relationship('Listing', back_populates='user', cascade="all, delete", foreign_keys='Listing.user_id')
    buyer = db.relationship('Listing', back_populates='buyer', foreign_keys='Listing.buyer_id')
    reviewed = db.relationship('Review', back_populates='reviewed', cascade='all, delete', foreign_keys='Review.reviewed_id')
    reviewer = db.relationship('Review', back_populates='reviewer', cascade='all, delete', foreign_keys='Review.reviewer_id')
