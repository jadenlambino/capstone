from app.models import db, Listing

def seed_listings():
    demo = Listing (
        user_id = 1,
        product_tag = 1,
        name = 'Jacket',
        price = 100.00,
        description = 'This is a jacket',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/fd1abf11f09a4b188464bb31468d23ac.jpg'
    )
    demo2 = Listing (
        user_id = 1,
        product_tag = 3,
        name = 'T-shirt',
        price = 20.00,
        description = 'This is a T-shirt',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/35746892932948d0bff53c13cf057fd6.jpg'
    )
    demo3 = Listing (
        user_id = 2,
        product_tag = 4,
        name = 'Sweatshirt',
        price = 40.00,
        description = 'This is a sweatshirt',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/1f7f8ca450574db9a23f393a5b7bb55c.jpg'
    )
    demo4 = Listing (
        user_id = 2,
        product_tag = 6,
        name = 'Jeans',
        price = 90.00,
        description = 'These are some jeans',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/9b03f031bcdb4513965fab3ab398433f.jpeg'
    )
    demo5 = Listing (
        user_id = 3,
        product_tag = 8,
        name = 'Shorts',
        price = 27.00,
        description = 'These are some shorts',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/0a1a75b18b084219bfd30cb9f92e2096.jpeg'
    )
    demo6 = Listing (
        user_id = 3,
        product_tag = 10,
        name = 'Hat',
        price = 30.00,
        description = 'This is a hat',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/064866afbee5437b840081680b20fd64.jpeg'
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
    # db.session.execute('TRUNCATE listing_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
