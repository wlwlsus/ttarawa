import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { navi } from '@styles/main'
import { pathState, markerListState } from '@store/atoms'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'

import NaviBottom from '@components/main/NaviBottom'
import NaviTimer from '@components/main/NaviTimer'
import TimerModal from '@components/main/TimerModal'
import Categories from '@components/main/Categories'
import Button from '@components/common/Button'

export default function NaviPath({ route }) {
  // props로 넘긴 데이터 받기
  const { depart, destin, middlePoint } = route.params

  const resultData = useRecoilValue(pathState)

  const [markerList, setMarkerList] = useRecoilState(markerListState)

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
      <NaviBottom time={ttime} />
    </SafeAreaView>
  )
}
