"""added column to listings model

Revision ID: 2e6290614a88
Revises: 0a30eeb56090
Create Date: 2022-05-17 15:40:01.040768

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '2e6290614a88'
down_revision = '0a30eeb56090'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('listings', sa.Column('is_reviewed', sa.Boolean(), nullable=False))
    if environment == "production":
        op.execute(f"ALTER TABLE <table_name> SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('listings', 'is_reviewed')
    # ### end Alembic commands ###
