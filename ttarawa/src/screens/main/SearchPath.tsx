import { SafeAreaView, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import MapCard from '@components/main/MapCard'
import { MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import InitPath from '@utils/map/InitPath'

import { useRecoilValue, useRecoilState } from 'recoil'
import { departState, destinState, pathInfo } from '@store/atoms'

import { convertToKm, convertToTime } from '@utils/caculator'

export default function SearchPath({ navigation }) {
  const depart: { name: string; lat: number; lng: number } =
    useRecoilValue(departState)

  const destin: { name: string; lat: number; lng: number } =
    useRecoilValue(destinState)

  const [resultData, setResultData] = useRecoilState(pathInfo)

  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')

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
            const distance = convertToKm(
              data.features[0].properties.totalDistance,
            )
            const time = convertToTime(data.features[0].properties.totalTime)
            setDistance(distance)
            setTime(time)

            return data.features

            // setResultData(data.features)
            // console.log('check')
          })
          .then(function (data) {
            setResultData(data)
            console.log('check')
          })
          .catch(function (error) {
            console.log('Fetch Error :-S', error)
          })
      }
    }
    fetchRoute()
  }, [depart, destin])

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      {resultData && (
        <View style={map.container}>
          <MapHeader noneButton={true} />

          {/* webview */}
          <InitPath />

          {/* 추천경로 & 주행시작 */}
          <View
            style={{
              zIndex: 999,
              height: 90,
            }}
          >
            <MapCard
              children={
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 8,
                    gap: 10,
                  }}
                >
                  <IconButton
                    icon1={
                      <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color="black"
                      />
                    }
                    press={() => {
                      navigation.pop()
                    }}
                  />

                  {/* Contents */}
                  <View>
                    <Text>추천경로</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{time}</Text>
                      <Text>{distance}</Text>
                    </View>
                  </View>
                </View>
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
                navigation.navigate('NaviPath')
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
