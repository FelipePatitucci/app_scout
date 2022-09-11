from dataclasses import dataclass
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

@dataclass
class User(db.Model, UserMixin):
    id: int
    email: str
    password: str
    first_name: str
    notes: 'Note'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(30))
    first_name = db.Column(db.String(100))
    notes = db.relationship('Note')

@dataclass
class Note(db.Model):
    id: int
    data: str
    date: str
    user_id: int

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

