from flask import Blueprint
from flask import jsonify

from ..api.routes import create_recommendation

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/recommendations', methods=['GET'])
def recommendations():
    print("컨트롤러")
    recommended_tours = create_recommendation()

    # 추천 목록 반환
    response = [tour.to_dict() for tour in recommended_tours]
    return jsonify(response)

# @app.route('/recommendations', methods=['GET'])
# def recommendations():
#     # lat = request.args.get('lat')
#     # lng = request.args.get('lng')
#     # min_distance = request.args.get('min_distance')
#     # max_distance = request.args.get('max_distance')
#     # num_destinations = request.args.get('num_destinations')
#     # user_info = request.args.get('user_info')
#
#     # 추천 목록 생성
#     recommended_tours = create_recommendation()
#
#     # 추천 목록 반환
#     response = [tour.to_dict() for tour in recommended_tours]
#     return jsonify(response)
