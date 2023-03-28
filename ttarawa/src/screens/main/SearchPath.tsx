import { SafeAreaView, Text, View } from 'react-native'
import { useState, useEffect, useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import MapCard from '@components/main/MapCard'
import InitPath from '@utils/map/InitPath'

import { useRecoilValue, useRecoilState } from 'recoil'
import { departState, destinState, pathInfo } from '@store/atoms'

export default function SearchPath() {
  // Recoil 적용
  // const depart: { title: string; lat: number; lng: number } =
  //   useRecoilValue(departState)

  // const destin: { title: string; lat: number; lng: number } =
  //   useRecoilValue(destinState)

  const [resultData, setResultData] = useRecoilState(pathInfo)

  // ---------- 삭제할 부분 -----------------------
  const [depart, setDepart] = useState<{
    title: string
    lat: number
    lng: number
  }>({
    title: '메트로호텔',
    lat: 37.564991,
    lng: 126.983937,
  })

  const [destin, setDestin] = useState<{
    title: string
    lat: number
    lng: number
  }>({
    title: '을지로 3가',
    lat: 37.566158,
    lng: 126.98894,
  })

  // -------------------------------------------------------

  useEffect(() => {
    const fetchRoute = async () => {
      if (depart && destin) {
        const headers = {
          'Content-Type': 'application/json',
          appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
          // appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
        }

        const data = JSON.stringify({
          startX: depart?.lng,
          startY: depart?.lat,
          endX: destin?.lng,
          endY: destin?.lat,
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
            setResultData(data.features)
            // console.log('check')
          })
          .catch(function (error) {
            console.log('Fetch Error :-S', error)
          })
      }
    }
    fetchRoute()
  }, [])

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      {resultData && (
        <View style={map.container}>
          <MapHeader
            depart={depart?.title}
            destin={destin?.title}
            noneButton={true}
          />
          <InitPath />
          {/* <MapCard /> */}
        </View>
      )}
    </SafeAreaView>
  )
}
