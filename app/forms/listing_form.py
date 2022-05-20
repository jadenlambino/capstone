from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, FileField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Listing

class ListingForm(FlaskForm):

    # def is_float(form, field):
    #     num = field.data
    #     check = isinstance(num, float)
    #     if check == False:
    #         raise ValidationError('Please enter a valid number.')

    def check_length(form, field):
        string = field.data
        if len(string) > 255:
            raise ValidationError('This field must be less than 255 characters.')

    # product_tag = SelectField('Product Tag', choices=[(1,'Jacket'), (2, 'Shirt'), (3 , 'T-Shirt'), (4 , 'Sweatshirt'), (5 , 'Hoodie'), (6 , 'Jeans'), (7 , 'Pants'), (8 , 'Shorts'), (9 , 'Shoes'), (10 , 'Hats'), (11, 'Accessories')], validate_choice=False)
    product_tag = IntegerField('Product Tag', validators=[DataRequired('Please select a product tag')])
    name = StringField('Name', validators=[DataRequired('Please give your listing a name'), check_length])
    price = FloatField('Price', validators=[DataRequired('Please set a valid price for your listing, no letters or symbols are permitted.')])
    description = StringField('Description', validators=[DataRequired('Tell users why they should buy your product!'), check_length])
    photos = StringField('Photos')
