from re import L
from app.models import db, Product_Tag

def seed_product_tags():
    demo = Product_Tag (
        type = 'jackets'
    )
    demo2 = Product_Tag (
        type = 'shirts'
    )
    demo3 = Product_Tag (
        type = 'tshirts'
    )
    demo4 = Product_Tag (
        type = 'sweatshirts'
    )
    demo5 = Product_Tag (
        type = 'hoodies'
    )
    demo6 = Product_Tag (
        type = 'jeans'
    )
    demo7 = Product_Tag (
        type = 'pants'
    )
    demo8 = Product_Tag (
        type = 'shorts'
    )
    demo9 = Product_Tag (
        type = 'shoes'
    )
    demo10 = Product_Tag (
        type = 'hats'
    )
    demo11 = Product_Tag (
        type = 'accessories'
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
