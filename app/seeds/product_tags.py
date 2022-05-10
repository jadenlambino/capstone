from re import L
from app.models import db, Product_Tag

def seed_product_tags():
    demo = Product_Tag (
        type = 'Jacket'
    )
    demo2 = Product_Tag (
        type = 'Shirt'
    )
    demo3 = Product_Tag (
        type = 'T-Shirt'
    )
    demo4 = Product_Tag (
        type = 'Sweatshirt'
    )
    demo5 = Product_Tag (
        type = 'Hoodie'
    )
    demo6 = Product_Tag (
        type = 'Jeans'
    )
    demo7 = Product_Tag (
        type = 'Pants'
    )
    demo8 = Product_Tag (
        type = 'Shorts'
    )
    demo9 = Product_Tag (
        type = 'Shoes'
    )
    demo10 = Product_Tag (
        type = 'Hats'
    )
    demo11 = Product_Tag (
        type = 'Accessories'
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

    db.session.commit()

def undo_product_tags():
    db.session.execute('TRUNCATE product_tags RESTART IDENTITY CASCADE;')
    db.session.commit()
