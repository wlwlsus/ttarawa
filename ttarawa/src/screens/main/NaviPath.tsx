import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { navi } from '@styles/main'
import {
  pathState,
  markerListState,
  locationListState,
  remainingDistanceState,
} from '@store/atoms'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import EndModal from '@components/main/EndModal'
import NaviBottom from '@components/main/NaviBottom'
import NaviTimer from '@components/main/NaviTimer'
import TimerModal from '@components/main/TimerModal'
import Categories from '@components/main/Categories'
import Button from '@components/common/Button'
import getLocation from '~/utils/getLocation'

export default function NaviPath(props: {
  route: any
  navigation: any
  distance: any
}) {
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
  const handleEndModalVisible = () => {
    setEndModalVisible(!endmodalVisible)
    console.log('End')
  }
  const cancleModal = () => {
    setEndModalVisible(false)
  }
  const goProfile = () => {
    navigation.navigate('Mypage', { screen: 'MyHistory' })
    setEndModalVisible(false)
  }
  // props로 넘긴 데이터 받기
  const { depart, destin, middlePoint } = route

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
          console.log('남은 거리: ')
          console.log(remainingDistance)

          setRemainingDistance(remainingDistance)
        }

        setLocationList((prevData) => [
          ...prevData,
          { longitude: longitude, latitude: latitude },
        ])
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
      console.log('stop it')
    })
  }
  // 주행시간 타이머
  const [ttime, setTTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(ttime)

  // 따릉 타이머
  const [modalVisible, setModalVisible] = useState(false)
  const [time, setTime] = useState(0)

  const handleModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const handleSetTime = (newTime: any) => {
    setTime(newTime)
    setModalVisible(false)
  }

  const cancleTime = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={[styles.androidSafeArea, navi.container]}>
      <NaviTimer time={time} onpress={handleModalVisible} />

      <Categories style={navi.categories} route={route} />

      <TimerModal
        modalVisible={modalVisible}
        handleSetTime={handleSetTime}
        cancleTime={cancleTime}
      />

      {resultData && (
        <MapView
          style={navi.container}
          initialRegion={{
            latitude: middlePoint.latitude,
            longitude: middlePoint.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={depart} title="출발" pinColor={color.red} />
          <Marker coordinate={destin} title="도착" pinColor={color.red} />

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
        time={ttime}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        stop={stopLocationTracking}
        handleOn={handleEndModalVisible}
        distance={distance}
      />
      <EndModal
        time={currentTime}
        modalVisible={endmodalVisible}
        cancleModal={cancleModal}
        navigate={goProfile}
      />
    </SafeAreaView>
  )
}
