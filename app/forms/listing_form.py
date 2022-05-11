from unicodedata import name
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Listing

class ListingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired('Please give your listing a name')])
