import { View, Text, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'

import { color, styles } from '@styles/GlobalStyles'
import { searchpath } from '@styles/main'

import Input from '@components/common/Input'
import Button from '@components/common/Button'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SearchPath() {
  // 초기값을 지정해주면 알아서 type 유추
  const [depart, setDepart] = useState('')
  const [destin, setDestin] = useState('')
  const [pressed, setPressed] = useState<Number>()

  const isPressed = {
    container: { backgroundColor: color.secondary },
    txt: { color: color.primary },
  }

  // 선택한 카테고리 정보 지도에 표시
  const showInfo = (categoryId: Number) => {
    setPressed(categoryId)
  }

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>simpleMap</title>
      <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA"></script>
      <script type="text/javascript">
        // 페이지가 로딩이 된 후 호출하는 함수입니다.
        function initTmap() {
          // map 생성
          // Tmapv3.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
          var map = new Tmapv3.Map('map_div', {
            // 지도가 생성될 div
            center: new Tmapv3.LatLng(37.5652045, 126.98702028),
            width: '100%', // 지도의 넓이
            height: '1900px',
            zoom: 16, // 지도 줌레벨
          })
        }
      </script>
    </head>
    <body onload="initTmap()">
      <!-- 맵 생성 실행 -->
      <div id="map_div"></div>
    </body>
  </html>
  `

  return (
    <SafeAreaView style={[styles.androidSafeArea, searchpath.container]}>
      <WebView
        source={{
          html,
        }}
        style={{ flex: 1 }}
        originWhitelist={['*']}
      />
    </SafeAreaView>
  )
}
