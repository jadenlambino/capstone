from unicodedata import name
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, FileField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Listing

class ListingForm(FlaskForm):
    # product_tag = SelectField('Product Tag', choices=[(1,'Jacket'), (2, 'Shirt'), (3 , 'T-Shirt'), (4 , 'Sweatshirt'), (5 , 'Hoodie'), (6 , 'Jeans'), (7 , 'Pants'), (8 , 'Shorts'), (9 , 'Shoes'), (10 , 'Hats'), (11, 'Accessories')], validate_choice=False)
    product_tag = IntegerField('Product Tag', validators=[DataRequired('Please select a product tag')])
    name = StringField('Name', validators=[DataRequired('Please give your listing a name')])
    price = FloatField('Price', validators=[DataRequired('Please set a price for your listing.')])
    description = StringField('Description', validators=[DataRequired('Tell users why they should buy your product!')])
    # photos = StringField('Photos')
