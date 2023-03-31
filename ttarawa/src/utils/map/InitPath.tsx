import { WebView } from 'react-native-webview'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { map } from '@styles/main'
import { departState, destinState, pathState } from '@store/atoms'

interface FeatureProperties {
  totalDistance?: number
  totalTime?: number
  index: number
  pointIndex?: number
  name?: string
  description: string
  direction?: string
  nearPoiName?: string
  nearPoiX?: string
  nearPoiY?: string
  intersectionName?: string
  facilityType: string
  facilityName?: string
  turnType?: number
  pointType?: string
  lineIndex?: number
  distance?: number
  time?: number
  roadType?: number
  categoryRoadType?: number
}

interface Feature {
  type: string
  geometry: {
    type: string
    coordinates: number[] | [number[]]
  }
  properties: FeatureProperties
}

export default function InitPath() {
  // store에서 출발, 도작지 불러오기
  const departData: { name: string; lat: number; lng: number } =
    useRecoilValue(departState)

  const destinData: { name: string; lat: number; lng: number } =
    useRecoilValue(destinState)

  const resultData: Feature[] = useRecoilValue(pathState)

  const middlePoint: { lat: number; lng: number } = {
    lat: (departData.lat + destinData.lat) / 2,
    lng: (departData.lng + destinData.lng) / 2,
  }

  const pathHtml: string = `<!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>simpleMap</title>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA"></script>
        <script type="text/javascript">
          var map
          var marker_s, marker_e, marker_p1, marker_p2
          var totalMarkerArr = []
          var drawInfoArr = []
          var resultdrawArr = []
  
          const middlePoint = ${JSON.stringify(middlePoint)}
          const depart = ${JSON.stringify(departData)}
          const destin = ${JSON.stringify(destinData)}
  
          const resultData = ${JSON.stringify(resultData)}
  
          function initTmap() {
            // 1. 지도 띄우기
            map = new Tmapv2.Map('map_div', {
              center : new Tmapv2.LatLng(middlePoint.lat, middlePoint.lng),
              width: '100%',
              height: '100vh',
              zoom: 15,
            })
  
            // 2. 시작, 도착 심볼찍기
            // 시작
            marker_s = new Tmapv2.Marker({
              position : new Tmapv2.LatLng(depart.lat, depart.lng),
              icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_b_s.png',
              iconSize: new Tmapv2.Size(60, 95),
              map: map,
            })
  
            // 도착
            marker_e = new Tmapv2.Marker({
              position : new Tmapv2.LatLng(destin.lat, destin.lng),
              icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_b_e.png',
              iconSize: new Tmapv2.Size(60, 95),
              map: map,
            })
  
            // 3. 경로탐색 API 사용요청
            //기존 그려진 라인 & 마커가 있다면 초기화
            if (resultdrawArr.length > 0) {
              for (var i in resultdrawArr) {
                resultdrawArr[i].setMap(null)
              }
              resultdrawArr = []
            }
  
            drawInfoArr = []
  
            for (var i in resultData) {
              //for문 [S]
              var geometry = resultData[i].geometry
              var properties = resultData[i].properties
              var polyline_
  
              if (geometry.type == 'LineString') {
                for (var j in geometry.coordinates) {
                  // 경로들의 결과값(구간)들을 포인트 객체로 변환
                  var latlng = new Tmapv2.Point(
                    geometry.coordinates[j][0],
                    geometry.coordinates[j][1],
                  )
                  // 포인트 객체를 받아 좌표값으로 변환
                  var convertPoint =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng)
                  // 포인트객체의 정보로 좌표값 변환 객체로 저장
                  var convertChange = new Tmapv2.LatLng(
                    convertPoint._lat,
                    convertPoint._lng,
                  )
                  // 배열에 담기
                  drawInfoArr.push(convertChange)
                }
              } else {
                var markerImg = ''
                var pType = ''
                var size
  
                if (properties.pointType == 'S') {
                  //출발지 마커
                  markerImg =
                    'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png'
                  pType = 'S'
                  size = new Tmapv2.Size(0, 0)
                } else if (properties.pointType == 'E') {
                  //도착지 마커
                  markerImg =
                    'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png'
                  pType = 'Eㄱ'
                  size = new Tmapv2.Size(0, 0)
                } else {
                  //각 포인트 마커
                  markerImg = 'http://topopen.tmap.co.kr/imgs/point.png'
                  pType = 'P'
                  size = new Tmapv2.Size(0, 0)
                }
  
                // 경로들의 결과값들을 포인트 객체로 변환
                var latlon = new Tmapv2.Point(
                  geometry.coordinates[0],
                  geometry.coordinates[1],
                )
  
                // 포인트 객체를 받아 좌표값으로 다시 변환
                var convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon)
  
                var routeInfoObj = {
                  markerImage: markerImg,
                  lng: convertPoint._lng,
                  lat: convertPoint._lat,
                  pointType: pType,
                }
  
                // Marker 추가
                marker_p = new Tmapv2.Marker({
                  position: new Tmapv2.LatLng(
                    routeInfoObj.lat,
                    routeInfoObj.lng,
                  ),
                  icon: routeInfoObj.markerImage,
                  iconSize: size,
                  map: map,
                })
              }
            } //for문 [E]
            drawLine(drawInfoArr)
          }
  
          function addComma(num) {
            var regexp = /\B(?=(\d{3})+(?!\d))/g
            return num.toString().replace(regexp, ',')
          }
  
          function drawLine(arrPoint) {
            var polyline_
            polyline_ = new Tmapv2.Polyline({
              path: arrPoint,
              strokeColor: '#AA0000',
              strokeWeight: 15,
              map: map,
            })
            resultdrawArr.push(polyline_)
          }
        </script>
      </head>
      <body onload="initTmap();">
        <!-- 190430 기존 지도를 모두 이미지 처리 위해 주석 처리 S -->
        <div id="map_wrap" class="map_wrap3">
          <div id="map_div"></div>
        </div>
        <div class="map_act_btn_wrap clear_box"></div>
      </body>
    </html>  
  `

  return (
    <WebView
      source={{
        html: pathHtml,
      }}
      style={map.mapContainer}
      originWhitelist={['*']}
    />
  )
}
