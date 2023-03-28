import { WebView } from 'react-native-webview'
import { useRecoilValue } from 'recoil'
import { departState, destinState, markerListState } from '~/store/atoms'
export default function InitTmap() {
  // store에서 현재 위치 불러오기
  const depart = useRecoilValue(departState)
  const destin = useRecoilValue(destinState)
  const markerData = useRecoilValue(markerListState)

  const mapHtml: string = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>simpleMap</title>
      <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c"></script>
      <script type="text/javascript">
      let map
  
      const {lat, lng} =  ${JSON.stringify(depart)}

      function initTmap() {
        map = new Tmapv3.Map('map_div', {
          center: new Tmapv3.LatLng(lat, lng),
          width: '100%', // 지도의 넓이
          height: '100vh', // 지도의 높이
          zoom: 16, // 지도 줌레벨
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
            markers.push(marker)

            // 마커 클릭 시 React Native state 업데이트
            marker.addListener('click', () => {
              window.ReactNativeWebView.postMessage(marker.id)
            })
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
    />
  )
}
