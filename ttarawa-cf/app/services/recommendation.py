import numpy as np
import pandas as pd
from flask import abort

from app.models.models import Tour


def haversine(lat1, lng1, lat2, lng2):
    # 지구 반경 (km)
    R = 6371.0088

    # 위도, 경도를 라디안 단위로 변환
    lat1, lng1, lat2, lng2 = map(np.radians, [lat1, lng1, lat2, lng2])

    # haversine 식 적용
    d_lat = lat2 - lat1
    d_lng = lng2 - lng1
    a = np.sin(d_lat / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(d_lng / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = R * c

    return distance


def get_user_similar_destinations(user_info, lat, lng, num_destinations=10):
    try:
        tours = Tour.query.with_entities(
            Tour.tour_id, Tour.address, Tour.category, Tour.lat, Tour.lng,
            Tour.mid_category, Tour.name, Tour.rating, Tour.reviews,
            Tour.search, Tour.sub_category
        ).all()

        df = pd.DataFrame(tours,
                          columns=['tour_id', 'address', 'category', 'lat', 'lng', 'mid_category', 'name', 'rating',
                                   'reviews', 'search', 'sub_category'])

        # # 유사도 계산
        # vectors = df.loc[similar_destinations_indices, ['rating', 'reviews', 'search']].values
        # similarities = cosine_similarity([user_info] * len(similar_destinations_indices), vectors)
        # similar_destinations_indices = [x for _, x in
        #                                 sorted(zip(similarities[0], similar_destinations_indices), reverse=True)]

        # 거리 계산
        distances = df.apply(lambda row: haversine(lat, lng, row['lat'], row['lng']), axis=1)
        df['distances'] = distances

        # 추천 가능한 목적지의 인덱스 리스트 초기화
        similar_destinations_indices = []

        # 추천 가능한 목적지를 검색 거리순으로 정렬
        df_sorted_by_search = df.sort_values(by='search', ascending=False)

        # num_destinations 개수만큼 추천 가능한 목적지 선택
        for i in range(len(df_sorted_by_search)):
            # 추천 가능한 목적지 개수가 num_destinations 이상이면 반복문 종료
            if len(similar_destinations_indices) >= num_destinations:
                break

            # 거리, 검색 거리 모두 범위 내에 있는 목적지의 인덱스를 추천 가능한 목적지 인덱스 리스트에 추가
            if user_info - 0.5 <= distances[i] <= user_info + 0.5 and df_sorted_by_search.index[
                i] not in similar_destinations_indices:
                similar_destinations_indices.append(df_sorted_by_search.index[i])

        # 추천 목적지 개수가 num_destinations 이하인 경우, 범위를 늘려가며 추가 추천
        while len(similar_destinations_indices) < num_destinations:
            # 범위 확장
            user_info += 0.5

            # 거리, 검색 거리 모두 범위 내에 있는 목적지의 인덱스를 추천 가능한 목적지 인덱스 리스트에 추가
            for i in range(len(df)):
                if len(similar_destinations_indices) >= num_destinations:
                    break
                if distances[i] <= user_info and df_sorted_by_search.index[i] not in similar_destinations_indices:
                    similar_destinations_indices.append(df_sorted_by_search.index[i])

        # 추천 목적지 반환
        similar_destinations = df.loc[similar_destinations_indices][:num_destinations]
        similar_destinations = similar_destinations.sort_values(by=['search'], ascending=[False])
        return similar_destinations

    except Exception as e:
        print(f'Flask Server Error : {e}')
        abort(500, str(e))


def get_nearby_destinations(lat, lng, min_distance=0, max_distance=1, num_destinations=10):
    try:
        tours = Tour.query.with_entities(
            Tour.tour_id, Tour.address, Tour.category, Tour.lat, Tour.lng,
            Tour.mid_category, Tour.name, Tour.rating, Tour.reviews,
            Tour.search, Tour.sub_category
        ).all()

        df = pd.DataFrame(tours,
                          columns=['tour_id', 'address', 'category', 'lat', 'lng', 'mid_category', 'name', 'rating',
                                   'reviews', 'search', 'sub_category'])

        distances = df.apply(lambda row: haversine(lat, lng, row['lat'], row['lng']), axis=1)
        df['distances'] = distances
        nearby_destinations = df[(distances >= min_distance) & (distances <= max_distance) & (df['rating'] >= 3.0) & (
                df['reviews'] >= 5)]

        # 같은 sub_category를 최대 2개까지 선택
        sub_category_counts = nearby_destinations['sub_category'].value_counts()
        selected_destinations = pd.DataFrame(columns=nearby_destinations.columns)
        for sub_category in sub_category_counts.index:
            sub_category_destinations = nearby_destinations[nearby_destinations['sub_category'] == sub_category][:2]
            selected_destinations = pd.concat([selected_destinations, sub_category_destinations])

        # sub_category가 제외된 추천 목적지 리스트에서 검색 거리순으로 정렬하여 반환
        if len(selected_destinations) < num_destinations:
            # 목적지 개수가 부족하면 min_distance와 max_distance 범위를 늘려가면서 추가로 추출
            while len(selected_destinations) < num_destinations:
                max_distance += 0.5
                nearby_destinations = df[
                    (distances >= min_distance) & (distances <= max_distance) & (df['rating'] >= 3.0) & (
                            df['reviews'] >= 5)]
                sub_category_counts = nearby_destinations['sub_category'].value_counts()
                for sub_category in sub_category_counts.index:
                    sub_category_destinations = nearby_destinations[
                                                    nearby_destinations['sub_category'] == sub_category][:2]
                    selected_destinations = pd.concat([selected_destinations, sub_category_destinations])
                    if len(selected_destinations) >= num_destinations:
                        break
                # if max_distance > 10:  # max_distance가 10km 이상이면 중지
                #     break

        nearby_destinations = selected_destinations.iloc[:num_destinations].sort_values(by='search', ascending=False)
        return nearby_destinations
    except Exception as e:
        print(f'Flask Server Error : {e}')
        abort(500, str(e))


def get_destinations(lat, lng, min_distance=0, max_distance=1, num_destinations=10):
    try:
        tours = Tour.query.with_entities(
            Tour.tour_id, Tour.address, Tour.category, Tour.lat, Tour.lng,
            Tour.mid_category, Tour.name, Tour.rating, Tour.reviews,
            Tour.search, Tour.sub_category
        ).all()

        df = pd.DataFrame(tours,
                          columns=['tour_id', 'address', 'category', 'lat', 'lng', 'mid_category', 'name', 'rating',
                                   'reviews', 'search', 'sub_category'])

        distances = df.apply(lambda row: haversine(lat, lng, row['lat'], row['lng']), axis=1)
        df['distances'] = distances
        nearby_destinations = df[(distances >= min_distance) & (distances <= max_distance) & (df['rating'] >= 3.0) & (
                df['reviews'] >= 5)]

        # 같은 sub_category를 최대 2개까지 선택
        sub_category_counts = nearby_destinations['sub_category'].value_counts()
        selected_destinations = pd.DataFrame(columns=nearby_destinations.columns)
        for sub_category in sub_category_counts.index:
            sub_category_destinations = nearby_destinations[nearby_destinations['sub_category'] == sub_category][:2]
            selected_destinations = pd.concat([selected_destinations, sub_category_destinations])

        # 중복 제거
        selected_destinations = selected_destinations.drop_duplicates(subset=['tour_id'])

        # sub_category가 제외된 추천 목적지 리스트에서 검색 거리순으로 정렬하여 반환
        if len(selected_destinations) < num_destinations:
            # 목적지 개수가 부족하면 min_distance와 max_distance 범위를 늘려가면서 추가로 추출
            while len(selected_destinations) < num_destinations:
                max_distance += 0.5
                nearby_destinations = df[
                    (distances >= min_distance) & (distances <= max_distance) & (df['rating'] >= 3.0) & (
                            df['reviews'] >= 5)]
                sub_category_counts = nearby_destinations['sub_category'].value_counts()
                for sub_category in sub_category_counts.index:
                    sub_category_destinations = nearby_destinations[
                                                    nearby_destinations['sub_category'] == sub_category][:2]
                    selected_destinations = pd.concat([selected_destinations, sub_category_destinations])
                    # 중복 제거
                    selected_destinations = selected_destinations.drop_duplicates(subset=['tour_id'])
                    if len(selected_destinations) >= num_destinations:
                        break
                if max_distance > 10:  # max_distance가 10km 이상이면 중지
                    break

        nearby_destinations = selected_destinations.iloc[:num_destinations].sort_values(by='search', ascending=False)
        return nearby_destinations.to_dict('records')
    except Exception as e:
        print(f'Flask Server Error : {e}')
        abort(500, str(e))


def get_recommendations(lat, lng, min_distance=0, max_distance=1, num_destinations=10, user_info=None):
    if 0 < user_info <= 1:  # 처음 주행하는 사람을 위한 것
        # nearby_destinations = get_nearby_destinations(lat, lng, min_distance, max_distance, num_destinations)
        nearby_destinations = get_destinations(lat, lng, min_distance, max_distance, num_destinations)
        return nearby_destinations
    else:  # 사용자 주행 거리 기반 추천
        _min = user_info - 0.5
        _max = user_info + 0.5
        similar_destinations = get_destinations(lat, lng, _min, _max, num_destinations)
        return similar_destinations
