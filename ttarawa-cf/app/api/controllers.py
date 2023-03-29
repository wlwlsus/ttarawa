from flask import Blueprint

from ..api.routes import create_recommendation

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['POST'])
def recommendations():
    return create_recommendation()
