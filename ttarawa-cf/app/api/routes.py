from flask import Blueprint, jsonify, request
from ..services.recommendation import get_recommendations

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['GET'])
def create_recommendation():
    print("라우터")
    print(f'request 값 : {request.args}')
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    min_distance = request.args.get('min_distance')
    max_distance = request.args.get('max_distance')
    num_destinations = request.args.get('num_destinations')
    user_info = request.args.get('user_info')

    recommended_tours = get_recommendations(lat, lng, min_distance, max_distance, num_destinations, user_info)
    response = [tour.to_dict() for tour in recommended_tours]
    return jsonify(response)
