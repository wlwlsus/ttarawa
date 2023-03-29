import { WebView } from 'react-native-webview'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import {
  departState,
  destinState,
  markerListState,
  markerState,
} from '~/store/atoms'
import { useEffect } from 'react'

export default function InitTmap() {
  const depart = useRecoilValue(departState)
  const [destin, setDestin] = useRecoilState(destinState)
  const markerData = useRecoilValue(markerListState)
  const setMarker = useSetRecoilState(markerState)

  // 마커 클릭 시
  function handleMessage(event: any) {
    // 마커 인덱스 저장
    const index = JSON.parse(event.nativeEvent.data)
    setMarker(index)

    // 도착지로 지정
    const { name, lat, lng } = markerData[index]
    setDestin({ ...destin, name, lat, lng })
  }

  // 지도 센터
  let center = destin.name ? destin : depart

  const mapHtml: string = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>simpleMap</title>
      <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c"></script>
      <script type="text/javascript">
      let map
  
      const {lat, lng} =  ${JSON.stringify(center)}

      function initTmap() {
        map = new Tmapv3.Map('map_div', {
          center: new Tmapv3.LatLng(lat, lng),  // 지도 센터
          width: '100%', 
          height: '100vh',
          zoom: 16, // 줌레벨
        })
        
        // 마커 등록 함수
        addMarkers()
      }

      const markerData = ${JSON.stringify(markerData)}
      
      // 마커 저장 배열
      let markers = []

      function addMarkers() {
        for (let i = 0; i < markerData.length; i++) {
          let marker = new Tmapv3.Marker({
            position: new Tmapv3.LatLng(
              markerData[i].lat,
              markerData[i].lng,
            ),
            map: map,
            
          })
          marker.id =  String(markerData[i].spotId) // 마커 id를 마커 객체에 저장
          
          // 마커에 클릭 이벤트
          marker.on("Click", function(evt) {
            window.ReactNativeWebView.postMessage(JSON.stringify(i));
          });
          markers.push(marker)
        }
      }

      // 모든 마커 제거
      function removeMarkers() {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null)
        }
        markers = []
      }
      </script>
    </head>
    <body onload="initTmap()">
      <div id="map_div"></div>
    </body>
  </html>
  `
  return (
    <WebView
      source={{ html: mapHtml }}
      style={{ flex: 1, zIndex: 0 }}
      originWhitelist={['*']}
      onMessage={handleMessage}
    />
  )
}
