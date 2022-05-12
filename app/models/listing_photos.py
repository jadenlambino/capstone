from .db import db

class ListingPhotos(db.Model):
    __tablename__ = 'listing_photos'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
