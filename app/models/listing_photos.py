from .db import db

class ListingPhotos(db.Model):
    __tablename__ = 'listing_photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    url = db.Column(db.String)
