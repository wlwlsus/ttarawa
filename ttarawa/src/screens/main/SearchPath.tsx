import { SafeAreaView, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
// import MapHeader from '@components/header/MapHeader'
import { pathHtml } from '@utils/map/initPath'
import { MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
// import * as Location from 'expo-location'

import Input from '@components/common/Input'
import Button from '@components/common/Button'

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SearchPath() {
  const [depart, setDepart] = useState<{
    latitude: number
    longitude: number
  }>()

  const [destin, setDestin] = useState<{
    latitude: number
    longitude: number
  }>()

  const [resultData, setResultData] = useState()

  useEffect(() => {
    setDepart({
      latitude: 37.564991,
      longitude: 126.983937,
    })

    setDestin({
      latitude: 37.566158,
      longitude: 126.98894,
    })

    const fetchRoute = async () => {
      if (depart && destin) {
        const headers = {
          'Content-Type': 'application/json',
          // appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
          appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
        }

        const data = JSON.stringify({
          startX: depart.longitude,
          startY: depart.latitude,
          endX: destin.longitude,
          endY: destin.latitude,
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
        <WebView
          source={{
            html: pathHtml,
          }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
        />
      )}
    </SafeAreaView>
  )
}
