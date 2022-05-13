from flask.cli import AppGroup
from .users import seed_users, undo_users
from .product_tags import seed_product_tags, undo_product_tags
from .listings import seed_listings, undo_listings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_product_tags()
    seed_listings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_product_tags()
    undo_listings()
    # Add other undo functions here
