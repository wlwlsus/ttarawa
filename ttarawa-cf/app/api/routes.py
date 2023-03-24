from flask import Blueprint, jsonify, request, abort
from ..services.recommendation import get_recommendations

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['GET'])
def create_recommendation():
    try:
        print(f'request values : {request.args}')
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        min_distance = request.args.get('min_distance', type=int, default=0)
        max_distance = request.args.get('max_distance', type=int, default=1)
        num_destinations = request.args.get('num_destinations', type=int, default=10)
        user_info = request.args.get('user_info', type=str, default=None)

        recommended_tours = get_recommendations(lat, lng, min_distance, max_distance, num_destinations, user_info)
        response = recommended_tours.to_dict(orient='records')

        return jsonify(response)

    except Exception as e:
        abort(500, f'Error : {e}')
