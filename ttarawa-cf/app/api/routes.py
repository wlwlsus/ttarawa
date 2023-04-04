from flask import Blueprint, jsonify, request, abort
from ..services.recommendation import get_recommendations

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['POST'])
def create_recommendation():
    try:
        print(f'request values : {request.get_json()}')
        data = request.get_json()
        # Http Body
        lat = float(data.get("lat"))
        lng = float(data.get("lng"))
        min_distance = int(data.get("min_distance", 0))
        max_distance = int(data.get("max_distance", 1))
        num_destinations = int(data.get("num_destinations", 14))
        user_info = int(data.get("user_info", 0))

        # Query Parameter
        # lat = request.args.get('lat', type=float)
        # lng = request.args.get('lng', type=float)
        # min_distance = request.args.get('min_distance', type=int, default=0)
        # max_distance = request.args.get('max_distance', type=int, default=1)
        # num_destinations = request.args.get('num_destinations', type=int, default=10)
        # user_info = request.args.get('user_info', type=str, default=None)

        recommended_tours = get_recommendations(lat, lng, min_distance, max_distance, num_destinations, user_info)
        response = recommended_tours.to_dict(orient='records')

        return jsonify(response)

    except Exception as e:
        print(f'Error {e}')
        abort(500, f'Error : {e}')
