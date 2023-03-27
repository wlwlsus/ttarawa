import { SafeAreaView, View } from 'react-native'
import { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import { mapHtml } from '@utils/map/initTmap'
import { MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import * as Location from 'expo-location'
import MapCard from '@components/card/MapCard'
import { FontAwesome5 } from '@expo/vector-icons'
import CategoryContent from '@components/main/CategoryContent'

export default function Map() {
  const [depart, setDepart] = useState('')
  const [destin, setDestin] = useState('')

  // 현재위치 가져오기
  const getCurrent = async () => {
    // 현재 경도 위도
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })

    // 현재 위치
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )
    setDepart(location[0].city)
  }

  useEffect(() => {
    getCurrent()
  })

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <MapHeader
        depart={depart}
        setDepart={setDepart}
        destin={destin}
        setDestin={setDestin}
      />
      <WebView
        source={{ html: mapHtml }}
        style={{ flex: 1, zIndex: 0 }}
        originWhitelist={['*']}
      />
      <View style={map.location}>
        <IconButton
          icon1={
            <MaterialIcons
              name="my-location"
              size={45}
              color={color.primary}
              style={map.location}
            />
          }
          press={() => getCurrent}
        />
        <MapCard
          children={
            <CategoryContent
              title="멀티캠퍼스 역삼"
              distance={2.3}
              address="서울 강남구 테헤란로 212(역삼동)"
            />
          }
          icon={
            <FontAwesome5 name="flag-checkered" size={30} color={color.white} />
          }
          btnText="목적지 설정"
          press={() => console.log('hi')}
        />
      </View>
    </SafeAreaView>
  )
}
