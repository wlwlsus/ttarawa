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
  const depart: { name: string; lat: number; lng: number } =
    useRecoilValue(departState)

  const destin: { name: string; lat: number; lng: number } =
    useRecoilValue(destinState)

  const [resultData, setResultData] = useRecoilState(pathInfo)

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
          <MapHeader noneButton={true} />
          <InitPath />
          {/* <MapCard /> */}
        </View>
      )}
    </SafeAreaView>
  )
}
