from app.models import db, Listing

def seed_listings():
    demo = Listing (
        user_id = 1,
        product_tag = 1,
        name = 'Jacket',
        price = 100.00,
        description = 'This is a jacket',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/a03626a2fc3b4524b47aabb081e590b6.jpg'
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
    demo7 = Listing (
        user_id = 1,
        product_tag = 3,
        name = 'Kid Cudi T-shirt',
        price = 50,
        description = 'This is the coolest tshirt ever!',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/b7bd3a187c284a8dbb9d366281b87c5f.jpg'
    )
    demo8 = Listing (
        user_id = 2,
        product_tag = 3,
        name = 'Vlone T-shirt',
        price = 200,
        description = 'Where my vlone thugs at >:)',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/959c3834b9dd4afda5b574b2b324c986.jpg'
    )
    demo9 = Listing (
        user_id = 3,
        product_tag = 3,
        name = 'Earl Sweatshirt T-shirt',
        price = 75,
        description = 'All my Earl fans would love this shirt!',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/6156bbb085a142b39dfd575528d282d2.jpg'
    )
    demo10 = Listing (
        user_id = 1,
        product_tag = 1,
        name = 'Sick jacket',
        price = 50000,
        description = 'This jacket is probably the coolest jacket you could own',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/6c5f2e95e6e44dc4b2b397281bb0ff07.jpg'
    )
    demo11 = Listing (
        user_id = 2,
        product_tag = 1,
        name = 'Vintage Jacket',
        price = 12355,
        description = 'One of a kind jacket anyone would be lucky to have!',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/21f43377e2904c1b96164ccb36a13163.jpg'
    )
    demo12 = Listing (
        user_id = 3,
        product_tag = 10,
        name = 'Beanie with the swag',
        price = 40,
        description = 'This beanie is fasho gonna give the best swag!',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/e5e7b268431248e0be2d1868634621d2.jpg'
    )
    demo13 = Listing (
        user_id = 1,
        product_tag = 11,
        name = 'Supreme Ziplocks',
        price = 1,
        description = 'Someone please buy this I do not want it',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/d1a6e7274e084d29be355c5561269ff2.jpg'
    )
    demo14 = Listing (
        user_id = 2,
        product_tag = 11,
        name = 'Hello Kitty Slingbag',
        price = 10000,
        description = 'Limited edition Hello Kitty bag',
        photos = 'https://jaden-capstone.s3.us-west-1.amazonaws.com/46ee1cdba04349fc8501e13b95d9c81c.jpg'
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)

    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    # db.session.execute('TRUNCATE listing_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
