from app.models import db, Review

def seed_reviews():
    demo = Review (
        listing_id = 1,
        reviewed_id = 1,
        reviewer_id = 2,
        rating = 5,
        body = 'This is too review with it',
    )

    db.session.add(demo)
    db.session.commit()

def undo_reviews():
        db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
        db.session.commit()
