from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    first_name = StringField('First Name', validators=[DataRequired('Please enter your first name')])
    last_name = StringField('Last Name', validators=[DataRequired('Please enter your last name')])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    profile_picture = StringField('Profile Picture')
    password = StringField('password', validators=[DataRequired()])
