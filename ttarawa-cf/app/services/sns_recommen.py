import geopy.distance
from geopy import Nominatim
from geopy.distance import geodesic
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import not_
from app.models.models import Users, History
from app import create_app, db
import numpy as np
import requests, json
from sklearn.metrics.pairwise import manhattan_distances


def test_recommend_rides():
    app = create_app()
    app.config['TESTING'] = True
    with app.app_context():
        user_location = (37.503325874722,127.04403462366)
        current_user = Users.query.filter_by(users_id=40).first()
        recommended_rides = recommend_rides(user_location, current_user)
        print("sss",recommended_rides)


def recommend_rides(user_location, current_user):

    # 현재 로그인한 유저의 주행기록 조회
    user_rides = History.query.filter_by(users_id=current_user.users_id).all()
    user_ride_data = [(history.history_id, history.distance, history.time) for history in user_rides]

    # 다른 사람들의 주행기록 조회
    all_rides = History.query.filter(not_(History.users_id == current_user.users_id)).all()
    all_ride_data = [(history.history_id, history.users_id, history.distance, history.time, history.start_address) for history in all_rides]

    # 사용자의 주행기록과 다른 사람들의 주행기록 유사도 비교
    similarity_scores = {}
    for ride_data in all_ride_data:
        history_id, users_id, distance, time, start_address = ride_data
        other_ride_data = [distance, time]
        similarity_score = 0
        for user_ride in user_ride_data:
            now_user_ride = [user_ride[1], user_ride[2]]
            similarity_score += 1 / (1 + manhattan_distances([now_user_ride], [other_ride_data])[0])
        similarity_scores[history_id] = similarity_score

    # 유사도가 가까운 순으로 정렬
    sorted_rides = sorted(all_ride_data, key=lambda x: similarity_scores[x[0]], reverse=True)

    # 사용자 위치와 주행기록들의 출발 위치 비교
    distances = {}
    for ride_data in sorted_rides:
        history_id, users_id, distance, time, start_address = ride_data
        start_address_to_code = get_coordinates(start_address)

        if user_location == None or start_address_to_code == None:
            continue

        dist = geopy.distance.distance(start_address_to_code, user_location).m
        distances[history_id] = dist

    # 거리순으로 정렬
    sorted_rides = [ride_data for ride_data in sorted_rides if ride_data[0] in distances]
    sorted_rides = sorted(sorted_rides, key=lambda x: distances[x[0]])

    # 추천 결과 return
    recommended_rides = []
    for history_data in sorted_rides:
        recommended_rides.append(history_data[0])

    return recommended_rides


def get_coordinates(address):
  url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
  # 'KaKaoAK '는 그대로 두시고 개인키만 지우고 입력해 주세요.
  # ex) KakaoAK 6af8d4826f0e56c54bc794fa8a294
  headers = {"Authorization": "KakaoAK d7d7a42861b64d89868bc0f51679f971"}
  api_json = json.loads(str(requests.get(url,headers=headers).text))
  address = api_json['documents'][0]['address']
  crd = (address['y'], address['x'])

  return crd

