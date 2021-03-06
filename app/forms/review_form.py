from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, FileField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):

    def check_length(form, field):
        string = field.data
        if len(string) > 1000:
            raise ValidationError('This field must be less than 1000 characters.')

    listing_id = IntegerField('Listing Id')
    reviewed_id = IntegerField("Reviewed ID", validators=[DataRequired('')])
    reviewer_id = IntegerField("Reviewer ID", validators=[DataRequired('')])
    rating = FloatField("Rating", validators=[DataRequired('Please enter a valid rating')])
    body = StringField("Body", validators=[DataRequired('Please write out your review'), check_length])
