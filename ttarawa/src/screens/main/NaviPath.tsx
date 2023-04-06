import { SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { useRecoilValue, useRecoilState } from 'recoil'
import { navi } from '@styles/main'
import {
  pathState,
  markerListState,
  locationListState,
  remainingDistanceState,
  markerCategoryState,
} from '@store/atoms'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import EndModal from '@components/main/EndModal'
import NaviBottom from '@components/main/NaviBottom'
import NaviTimer from '@components/main/NaviTimer'
import TimerModal from '@components/main/TimerModal'
import ReturnModal from '@components/main/ReturnModal'
import Categories from '@components/main/Categories'

// 마커 커스터마이징 아이콘들
import bikeIcon from '@assets/Icon/bike.png' // 대여소
import yellowbikeIcon from '@assets/Icon/yellowbike.png'
import redbikeIcon from '@assets/Icon/redbike.png'
import blackbikeIcon from '@assets/Icon/blackbike.png'
import cafeIcon from '@assets/Icon/cafe.png' // 카페
import restaurantIcon from '@assets/Icon/restaurant.png' // 음식점
import cultureIcon from '@assets/Icon/star.png' // 관광지(문화시설)
import toiletIcon from '@assets/Icon/toilets.png' // 화장실
import destinIcon from '@assets/Icon/destin2.png' // 목적지

export default function NaviPath(props: {
  route: any
  navigation: any
  distance: any
}) {
  // 카테고리 가져오기
  const category = useRecoilValue(markerCategoryState)
  const icons = [bikeIcon, restaurantIcon, cafeIcon, cultureIcon, toiletIcon]

  // 카테고리별 Marker 커스터마이징
  const getIcon = (checkMarker) => {
    // 대여소가 아니라면, 카테고리별 표시
    if (category !== 0) {
      return icons[category]
    }

    // 데여소라면, 개수별로, Icon 변경
    const visit = checkMarker.visit || 0

    if (visit >= 10) {
      return bikeIcon
    } else if (visit >= 4) {
      return yellowbikeIcon
    } else if (visit >= 1) {
      return redbikeIcon
    } else {
      return blackbikeIcon
    }
  }

  function convertDistanceToKm(distanceString: string) {
    const distanceMeter = parseInt(distanceString.split(' ')[0], 10)
    // const distanceKm = distanceMeter / 1000
    const distanceKm = distanceMeter
    return distanceKm.toFixed(2)
  }

  const route = props.route.params.route
  let distance = convertDistanceToKm(props.route.params.distance.distance)
  const navigation = props.navigation

  // endmodal
  const [endmodalVisible, setEndModalVisible] = useState(false)

  const cancleModal = () => {
    setEndModalVisible(false)
  }

  const goProfile = () => {
    navigation.navigate('Mypage', { screen: 'MyHistory' })
    setEndModalVisible(false)
  }
  // props로 넘긴 데이터 받기
  // const { depart, destin, middlePoint } = route

  // 지도 중심을 설정을 위한 현재 위치 설정
  const [region, setRegion] = useState({
    latitude: route.depart.lat,
    longitude: route.depart.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })

  const resultData = useRecoilValue(pathState)

  const [markerList, setMarkerList] = useRecoilState(markerListState)

  // 지나간 경로 표시 위한 위치저장
  const [locationList, setLocationList] = useRecoilState(locationListState)

  // recoil에서 remainingDistance 가져오기
  const [remainingDistance, setRemainingDistance] = useRecoilState(
    remainingDistanceState,
  )

  const [watcher, setWatcher] =
    useState<Promise<Location.LocationSubscription> | null>(null)

  function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371 // km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  function toRad(value: number) {
    return (value * Math.PI) / 180
  }

  const getClosestPointOnPath = (currentPosition: any, path: any) => {
    // 경로 상에서 가장 가까운 지점을 찾는 함수
    let minDistance = Number.MAX_VALUE
    let closestPoint = null

    path.forEach((point: any) => {
      const distance = Math.sqrt(
        Math.pow(currentPosition.latitude - point.latitude, 2) +
          Math.pow(currentPosition.longitude - point.longitude, 2),
      )
      if (distance < minDistance) {
        minDistance = distance
        closestPoint = point
      }
    })

    return closestPoint
  }

  const calculateRemainingDistance = (currentPosition: any, path: any) => {
    let remainingDistance = 0

    // 현재 위치와 경로 데이터의 가장 가까운 위치 사이의 거리 계산
    const closestPoint: any = getClosestPointOnPath(currentPosition, path)
    if (closestPoint) {
      const closestIndex = path.indexOf(closestPoint)
      const firstDistance = Math.sqrt(
        Math.pow(currentPosition.latitude - closestPoint.latitude, 2) +
          Math.pow(currentPosition.longitude - closestPoint.longitude, 2),
      )
      remainingDistance += firstDistance

      // 경로 데이터의 가장 가까운 위치 다음 위치부터 목적지까지 거리 계산
      for (let i = closestIndex; i < path.length - 1; i++) {
        const distance = Math.sqrt(
          Math.pow(path[i].latitude - path[i + 1].latitude, 2) +
            Math.pow(path[i].longitude - path[i + 1].longitude, 2),
        )
        remainingDistance += distance
      }
    }

    return remainingDistance
  }

  // 위치 저장
  const startLocationTracking = async () => {
    const watcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (location) => {
        const { latitude, longitude } = location.coords

        if (location.coords && resultData) {
          // recoil에 remainingDistance 값 저장
          const remainingDistance = calculateRemainingDistance(
            location.coords,
            resultData,
          )
          setRemainingDistance(remainingDistance)
        }

        setLocationList((prevData) => [
          ...prevData,
          { longitude: longitude, latitude: latitude },
        ])
        setRegion({
          ...region,
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
      },
    )
    setWatcher(watcher)
    return watcher
  }

  // 시작 시 실행
  useEffect(() => {
    startLocationTracking()
  }, [])

  // 저장 종료
  const stopLocationTracking = () => {
    if (!watcher) return

    watcher.then((locationSubscription: Location.LocationSubscription) => {
      locationSubscription.remove()
      setWatcher(null)
    })
  }

  // 따릉 타이머
  const [modalVisible, setModalVisible] = useState(false)
  const [returnModalVisible, setReturnModalVisible] = useState(false)
  const [rentalTime, setRentalTime] = useState(0) // 대여 시간
  const [ridingTime, setRidingTime] = useState(0) // 주행시간

  if (!region.latitude) return <></>
  return (
    <SafeAreaView style={[styles.androidSafeArea, navi.container]}>
      <NaviTimer
        rentalTime={rentalTime}
        setModalVisible={setModalVisible}
        setReturnModalVisible={setReturnModalVisible}
      />
      <Categories style={navi.categories} route={route} />

      <TimerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setRentalTime={setRentalTime}
      />

      <ReturnModal
        returnModalVisible={returnModalVisible}
        setReturnModalVisible={setReturnModalVisible}
        setRentalTime={setRentalTime}
      />
      {resultData && (
        <MapView
          style={navi.container}
          region={region}
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={route.depart} title="출발" pinColor={color.red} />
          <Marker coordinate={route.destin} title="도착" icon={destinIcon} />

          {markerList?.map((marker: any) => (
            <Marker
              key={marker.spotId}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              pinColor={color.primary}
              title={marker.name}
              description={
                marker.sub_category ? marker.sub_category : marker.subCategory
              }
              icon={getIcon(marker)}
            />
          ))}

          <Polyline
            coordinates={resultData}
            strokeColor="#AA0000"
            strokeWidth={5}
          />
        </MapView>
      )}

      <NaviBottom
        setRidingTime={setRidingTime}
        stopLocationTracking={stopLocationTracking}
        setEndModalVisible={setEndModalVisible}
        distance={distance}
      />

      <EndModal
        ridingTime={ridingTime}
        modalVisible={endmodalVisible}
        cancleModal={cancleModal}
        navigate={goProfile}
      />
    </SafeAreaView>
  )
}
