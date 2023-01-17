from flask_sqlalchemy import SQLAlchemy

# import and set acriable to access flask environment
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

db = SQLAlchemy()

# add function to add a prefic to table names in production environment only
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
