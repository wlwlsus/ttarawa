import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { navi } from '@styles/main'
import { pathState, markerListState, locationListState } from '@store/atoms'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import EndModal from '@components/main/EndModal'
import NaviBottom from '@components/main/NaviBottom'
import NaviTimer from '@components/main/NaviTimer'
import TimerModal from '@components/main/TimerModal'
import Categories from '@components/main/Categories'
import Button from '@components/common/Button'

export default function NaviPath({ route, navigation }) {
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
  const { depart, destin, middlePoint } = route.params

  const resultData = useRecoilValue(pathState)

  const [markerList, setMarkerList] = useRecoilState(markerListState)

  // 지나간 경로 표시 위한 위치저장
  const [locationList, setLocationList] = useRecoilState(locationListState)
  const [watcher, setWatcher] =
    useState<Promise<Location.LocationSubscription> | null>(null)

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
        setLocationList((prevData) => [
          ...prevData,
          { longitude: longitude, latitude: latitude },
        ])
        console.log('getLOCATION')
      },
    )
    setWatcher(watcher)
    console.log(locationList)
    return watcher
  }
  // // 시작 시 실행
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

  // 따릉 타이머
  const [modalVisible, setModalVisible] = useState(false)
  const [time, setTime] = useState(0)
  const [ttime, setTTime] = useState(0)
  const handleModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const handleSetTime = (newTime) => {
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

          {markerList?.map((marker) => (
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
        stop={stopLocationTracking}
        handleOn={handleEndModalVisible}
      />
      <EndModal
        time={ttime}
        modalVisible={endmodalVisible}
        cancleModal={cancleModal}
        navigate={goProfile}
      />
      {/* stop={stopLocationTracking} /> */}
      {/* <EndModal
        modalVisible={modalVisible}
        handleSetTime={handleSetTime}
        cancleTime={cancleTime}
      /> */}
    </SafeAreaView>
  )
}
