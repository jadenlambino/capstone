from app.models import db, Listing

def seed_listings():
    demo = Listing (
        user_id = 1,
        product_tag = 1,
        name = 'Jacket',
        price = 100.00,
        description = 'This is a jacket',
    )
    demo2 = Listing (
        user_id = 1,
        product_tag = 3,
        name = 'T-shirt',
        price = 20.00,
        description = 'This is a T-shirt',
    )
    demo3 = Listing (
        user_id = 2,
        product_tag = 4,
        name = 'Sweatshirt',
        price = 40.00,
        description = 'This is a sweatshirt',
    )
    demo4 = Listing (
        user_id = 2,
        product_tag = 6,
        name = 'Jeans',
        price = 90.00,
        description = 'These are some jeans',
    )
    demo5 = Listing (
        user_id = 3,
        product_tag = 8,
        name = 'Shorts',
        price = 27.00,
        description = 'These are some shorts',
    )
    demo6 = Listing (
        user_id = 3,
        product_tag = 10,
        name = 'Hat',
        price = 30.00,
        description = 'This is a hat',
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)

    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE listing_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
