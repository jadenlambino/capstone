from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), nullable=False)
    reviewed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    body = db.Column(db.String(1000), nullable=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'reviewed_id': self.reviewed_id,
            'reviewer_id': self.reviewer_id,
            'rating': self.rating,
            'body': self.body,
            'listing_id': self.listing_id
        }

    def edit_rating(self, rating):
        self.rating = rating
        return rating

    def edit_body(self, body):
        self.body = body
        return body

    listing = db.relationship('Listing', back_populates='review')
    reviewed = db.relationship('User', back_populates='reviewed', foreign_keys=[reviewed_id])
    reviewer = db.relationship('User', back_populates='reviewer', foreign_keys=[reviewer_id])
