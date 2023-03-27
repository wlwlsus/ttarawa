from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Enum
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ssafy605-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mariadb://root:root@127.0.0.1:3307/ssafy605'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Tour(db.Model):
    tour_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    address = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(255), nullable=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    mid_category = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    reviews = db.Column(db.Float, nullable=True)
    search = db.Column(db.Integer, nullable=True)
    sub_category = db.Column(db.String(255), nullable=True)

    def __init__(self, tour_id, address, category, lat, lng, mid_category, name, rating, reviews, search, sub_category):
        self.tour_id = tour_id
        self.address = address
        self.category = category
        self.lat = lat
        self.lng = lng
        self.mid_category = mid_category
        self.name = name
        self.rating = rating
        self.reviews = reviews
        self.search = search
        self.sub_category = sub_category

class Role(Enum):
    ROLE_USER = "ROLE_USER"
    ROLE_ADMIN = "ROLE_ADMIN"
    def __str__(self):
        return str(self.value)


class Users(db.Model):
    __tablename__ = "users"
    users_id = db.Column(db.BigInteger,  primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), nullable = False)
    nickname = db.Column(db.String(15), nullable = False)
    profile = db.Column(db.String(255), nullable = False)
    provider = db.Column(db.String(15), nullable = True)
    created_date = db.Column(db.DateTime, default=datetime.now)
    modified_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    role = db.Column(db.Enum('ROLE_ADMIN', 'ROLE_USER'), nullable=False, default='ROLE_USER')




# class UsersInfo(db.Model):
#     __tablename__ = "users_info"
#
#     users_info_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
#     users_id = db.Column(db.BigInteger, db.ForeignKey('users.users_id'), nullable=False)
#     badge_id = db.Column(db.BigInteger, db.ForeignKey('badge.badge_id'), nullable=False)
#     total_distance = db.Column(db.BigInteger, nullable=False, default=0)
#



class History(db.Model):
    __tablename__ = "history"
    history_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    # users_id = db.Column(db.BigInteger, db.ForeignKey('Users.users_id'))
    # users = db.relationship('Users', backref=db.backref('histories', lazy=True))
    users_id = db.Column(db.BigInteger, db.ForeignKey('users.users_id'))
    # user = db.relationship('Users', backref='histories')
    favorites_count = db.Column(db.Integer, nullable=False, default=0)
    personal = db.Column(db.Boolean, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(255))
    start_address = db.Column(db.String(255), nullable=False)
    end_address = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    modified_date = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

# class Favorites(db.Model):
#     __tablename__ = 'favorites'
#     favorites_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     history_id = db.Column(db.Integer, db.ForeignKey('history.history_id'), nullable=False)
#     users_id = db.Column(db.Integer, db.ForeignKey('users.users_id'), nullable=False)
#     # history = db.relationship('History', backref=db.backref('favorites', lazy=True))
#     # users = db.relationship('Users', backref=db.backref('favorites', lazy=True))