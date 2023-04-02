import { View, Text, SafeAreaView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { useRecoilValue } from 'recoil'
import { map } from '@styles/main'
import { pathState } from '@store/atoms'
import MapView, { Marker, Polyline } from 'react-native-maps'

export default function NaviPath({ route }) {
  // props로 넘긴 데이터 받기
  const { depart, destin, middlePoint } = route.params

  const resultData = useRecoilValue(pathState)

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <Text>네이게이션 화면</Text>
      {resultData && <MapView
        style={map.container}
        initialRegion={{
          latitude: middlePoint.latitude,
          longitude: middlePoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={depart} title="Depart" pinColor="skyblue"/>
        <Marker coordinate={destin} title="Destin" pinColor="skyblue"/>
        <Polyline
          coordinates={resultData}
          strokeColor='#AA0000'
          strokeWidth={5}
        />
      </MapView>}
    </SafeAreaView>
  )
}

