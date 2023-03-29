import { SafeAreaView, View, ScrollView, Dimensions } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import InitTmap from '@utils/map/InitTmap'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import * as Location from 'expo-location'
import MapCard from '@components/card/MapCard'
import CategoryContent from '@components/main/CategoryContent'
import { useRecoilValue, useRecoilState } from 'recoil'
import { departState, markerListState, markerState } from '~/store/atoms'
import main from '@services/main'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function Map() {
  const [depart, setDepart] = useRecoilState(departState)
  const [markerList, setMarkerList] = useRecoilState(markerListState)
  const marker = useRecoilValue(markerState)

  // Todo: 현재위치로 바꾸기
  const latitude = 37.4979
  const longitude = 127.0276

  // 현재 위치 가져오기
  const getCurrent = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') return console.log('위치허용해줘')

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )

    // 도착지 설정
    setDepart({
      lat: latitude,
      lng: longitude,
      title: location[0].name,
    })
  }

  // 해당 마커로 카드 스크롤
  const scrollViewRef = useRef()

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: SCREEN_WIDTH * marker,
      animated: true,
    })
  }, [marker])

  useEffect(() => {
    getCurrent()
    main
      .fetchDestin(3, 0, 10, latitude, longitude)
      .then((res) => {
        setMarkerList(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <MapHeader />
      <InitTmap />
      <View style={map.content}>
        <IconButton
          icon1={
            <MaterialIcons
              name="my-location"
              size={45}
              color={color.primary}
              style={map.location}
            />
          }
          press={getCurrent}
        />
        {markerList.length ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            {markerList.map((marker, index) => (
              <View key={index} style={map.cardContainer}>
                <MapCard
                  children={
                    <CategoryContent
                      title={marker.name}
                      distance={marker.distance}
                      address={marker.address}
                    />
                  }
                  icon={
                    <FontAwesome5
                      name="flag-checkered"
                      size={30}
                      color={color.white}
                    />
                  }
                  btnText="목적지 설정"
                  press={() => console.log('hi')}
                />
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  )
}
