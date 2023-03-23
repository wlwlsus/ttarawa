import { SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/header/MapHeader'
import { mapHtml } from '@utils/initTmap'
import { MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import * as Location from 'expo-location'

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
      <IconButton
        icon1={
          <MaterialIcons
            style={map.location}
            name="my-location"
            size={45}
            color={color.primary}
          />
        }
        press={() => getCurrent}
      />
    </SafeAreaView>
  )
}
