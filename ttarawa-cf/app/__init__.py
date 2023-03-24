from flask import Flask

from app.api.controllers import recommendations_blueprint

from app.config.database import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, SECRET_KEY

from .models.models import db


def create_app():
    app = Flask(__name__)
    app.register_blueprint(recommendations_blueprint)

    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
    app.config['SECRET_KEY'] = SECRET_KEY

    db.init_app(app)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
