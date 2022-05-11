from .db import db

class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_tag = db.Column(db.Integer, db.ForeignKey('product_tags.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    photos = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'product_tag' : self.product_tag,
            'name' : self.name,
            'price' : self.price,
            'description' : self.description,
            'photos' : self.photos
        }

    def edit_listing(self, product_tag, name, price, description, photos):
        self.product_tag = product_tag
        self.name = name
        self.price = price
        self.description = description
        self.photos = photos
        return [product_tag, name, price, description, photos]

    user = db.relationship('User', back_populates='listings')
    tag = db.relationship('Product_Tag', back_populates='listings')
