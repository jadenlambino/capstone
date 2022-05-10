from enum import unique
from .db import db

class Product_Tag(db.Model):
    __tablename__ = 'product_tags'

    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(255), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }

    listings = db.relationship('Listing', back_populates='tag')
