from flask import Blueprint
from flask import jsonify

from ..api.routes import create_recommendation

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['GET'])
def recommendations():
    return create_recommendation()
