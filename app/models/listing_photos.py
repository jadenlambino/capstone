from .db import db

class ListingPhotos(db.Model):
    __tablename__ = 'listing_photos'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    url = db.Column(db.String, nullable=False)

    listing = db.relationship('Listing', back_populates='listing_photos')
