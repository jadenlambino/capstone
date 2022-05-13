from .db import db

reviews_helper = db.Table(
    "reviews",
    db.Column(
        "Reviewer",
        db.Integer,
        db.ForeignKey('user.id'),
        primary_key=True
    ),
    db.Column(
        'Reviewed',
        db.Integer,
        db.ForeignKey('user.id'),
        primary_key=True
    )
)
