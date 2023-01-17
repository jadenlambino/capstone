from email.policy import default
from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product_tags import Product_Tag
from app.models import product_tags, user
from .reviews import Review

class Listing(db.Model):
    __tablename__ = 'listings'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_tag = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_tags.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    photos = db.Column(db.String, nullable=False)
    is_purchased = db.Column(db.Boolean, nullable=False, default=False)
    is_reviewed = db.Column(db.Boolean, nullable=False, default=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    def to_dict(self):
        product_type = Product_Tag.query.get(self.product_tag)
        username = user.User.query.get(self.user_id)
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'product_type' : product_type.type,
            'product_tag': self.product_tag,
            'name' : self.name,
            'price' : self.price,
            'description' : self.description,
            'photos': self.photos,
            'is_purchased' : self.is_purchased,
            'buyer_id': self.buyer_id,
            'is_reviewed' : self.is_reviewed,
            'username' : username.username,
        }

    # def edit_listing(self, product_tag, name, price, description, photos):
    #     self.product_tag = product_tag
    #     self.name = name
    #     self.price = price
    #     self.description = description
    #     self.photos = photos
    #     return [product_tag, name, price, description, photos]

    def edit_product_tag(self, product_tag):
        self.product_tag = product_tag
        return product_tag

    def edit_name(self, name):
        self.name = name
        return name

    def edit_price(self, price):
        self.price = price
        return price

    def edit_description(self,description):
        self.description = description
        return description

    def set_purchase(self, buyer_id):
        self.is_purchased = True
        self.buyer_id = buyer_id
        return {'message': 'purchase complete!'}

    def set_review(self):
        self.is_reviewed = True
        return

    def unset_review(self):
        self.is_reviewed = False

    user = db.relationship('User', back_populates='listings', foreign_keys=[user_id])
    buyer = db.relationship('User', back_populates='buyer', foreign_keys=[buyer_id])
    tag = db.relationship('Product_Tag', back_populates='listings')
    review = db.relationship('Review', back_populates='listing', cascade="all, delete")
    # listing_photos = db.relationship('ListingPhotos', back_populates='listing')
