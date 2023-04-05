import { SafeAreaView, View } from 'react-native'
import { useState, useEffect } from 'react'
import { styles, color } from '@styles/GlobalStyles'
import { path, map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import MapCard from '@components/main/MapCard'
import { MaterialIcons } from '@expo/vector-icons'

import PathContent from '@components/main/PathContent'
import { useRecoilValue, useRecoilState } from 'recoil'
import { departState, destinState, pathState } from '@store/atoms'

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import proj4 from 'proj4' // 위도경도 변환 라이브러리

import { convertToKm, convertToTime } from '@utils/caculator'

export default function SearchPath({ navigation }) {
  // 출발지 정보 가져오기
  const departData: { name: string; lat: number; lng: number } =
    useRecoilValue(departState)

  // 도착지 정보 가져오기
  const destinData: { name: string; lat: number; lng: number } =
    useRecoilValue(destinState)

  // 경로들 리코일에 저장??
  const [resultData, setResultData] = useRecoilState(pathState)

  // 출발지, 도착지 저장?
  const depart = { latitude: departData.lat, longitude: departData.lng }
  const destin = {
    latitude: Number(destinData.lat),
    longitude: Number(destinData.lng),
  }

  const middlePoint: { latitude: number; longitude: number } = {
    latitude: (departData.lat + Number(destinData.lat)) / 2,
    longitude: (departData.lng + Number(destinData.lng)) / 2,
  }

  // 총 거리, 시간 저장 변수
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const fetchRoute = async () => {
      if (depart && destin) {
        const headers = {
          'Content-Type': 'application/json',
          // appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
          appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
        }

        const data = JSON.stringify({
          startX: departData?.lng,
          startY: departData?.lat,
          endX: destinData?.lng,
          endY: destinData?.lat,
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          startName: '출발지',
          endName: '도착지',
        })

        const response = await fetch(
          'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json',
          {
            method: 'POST',
            headers: headers,
            body: data,
          },
        )
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
            const distance = convertToKm(
              data.features[0].properties.totalDistance,
            )
            const time = convertToTime(data.features[0].properties.totalTime)
            setDistance(distance)
            setTime(time)

            return data.features
          })
          .then(function (data) {
            const pathData: { latitude: number; longitude: number }[] = [depart]

            for (const feature of data) {
              if (feature.geometry.type === 'LineString') {
                const coordinates = feature.geometry.coordinates
                for (const coordinate of coordinates) {
                  const latLng = proj4('EPSG:3857', 'EPSG:4326', [
                    coordinate[0],
                    coordinate[1],
                  ])
                  pathData.push({ latitude: latLng[1], longitude: latLng[0] })
                }
              }
            }
            pathData.push(destin)

            return pathData
          })
          .then(function (data) {
            setResultData(data)
          })
          .catch(function (error) {
            console.log('Fetch Error :-S', error)
          })
      }
    }

    fetchRoute() // 함수 실행
  }, [departData, destinData])

  if (!resultData) return <></>
  return (
    <SafeAreaView style={[styles.androidSafeArea, path.container]}>
      <MapHeader noneButton={true} navigation={navigation} />

      {/* webview */}
      <MapView
        style={map.container}
        initialRegion={{
          latitude: middlePoint.latitude,
          longitude: middlePoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE} // iphone 설정
      >
        <Marker coordinate={depart} title="출발" pinColor={color.red} />
        <Marker coordinate={destin} title="도착" pinColor={color.red} />
        <Polyline
          coordinates={resultData}
          strokeColor="#AA0000"
          strokeWidth={5}
        />
      </MapView>

      {/* 추천경로 & 주행시작 */}
      <View style={path.pathCard}>
        <MapCard
          children={
            <PathContent
              navigation={navigation}
              time={time}
              distance={distance}
            />
          }
          icon={
            <MaterialIcons
              name="directions-bike"
              size={30}
              color={color.white}
            />
          }
          btnText="주행시작"
          press={() => {
            // 출발지, 목적지, 중간지점 props로 넘겨줌
            navigation.navigate('NaviPath', {
              route: { depart, destin, middlePoint },
              distance: { distance },
            })
          }}
        />
      </View>
    </SafeAreaView>
  )
}
