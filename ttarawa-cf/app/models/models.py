from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


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
