from app.models import db, User
from faker import Faker

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', first_name='Demo', last_name='User', username='Demo', password='password')
    marnie = User(
        email='marnie@aa.io', first_name='Marnie', last_name='Mays', username='marnie', password='password')
    bobbie = User(
        email='bobbie@aa.io', first_name='Bobbie', last_name='Brown', username='bobbie',  password='password')

    for i in range (0, 20):
        new_user = User(
            email=fake.free_email(),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            username=fake.user_name(),
            password='password'
        )
        db.session.add(new_user)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
