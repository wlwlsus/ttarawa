// // store에서 현재 위치 불러오기
// const lat: number = 37.5652045
// const lng: number = 126.98702028

// store에서 markers 불러오기
const departData: { latitude: number; longitude: number } = {
  latitude: 37.564991,
  longitude: 126.983937,
}

const destinData: { latitude: number; longitude: number } = {
  latitude: 37.566158,
  longitude: 126.98894,
}

const middlePoint: { latitude: number; longitude: number } = {
  latitude: (departData.latitude + destinData.latitude) / 2,
  longitude: (departData.longitude + destinData.longitude) / 2,
}

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

const resultData: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14135786, 4518153],
    },
    properties: {
      totalDistance: 604,
      totalTime: 496,
      index: 0,
      pointIndex: 0,
      name: '',
      description: '29m 이동',
      direction: '',
      nearPoiName: '',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '11',
      facilityName: '',
      turnType: 200,
      pointType: 'SP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14135786, 4518153],
        [14135822, 4518155],
      ],
    },
    properties: {
      index: 1,
      lineIndex: 0,
      name: '',
      description: ', 29m',
      distance: 29,
      time: 21,
      roadType: 0,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14135822, 4518155],
    },
    properties: {
      index: 2,
      pointIndex: 1,
      name: '미스터빈대떡 명동점',
      description: '미스터빈대떡 명동점 에서 좌회전 후 95m 이동 ',
      direction: '',
      nearPoiName: '미스터빈대떡 명동점',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '11',
      facilityName: '',
      turnType: 12,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14135822, 4518155],
        [14135823, 4518177],
        [14135819, 4518221],
        [14135815, 4518243],
        [14135809, 4518275],
      ],
    },
    properties: {
      index: 3,
      lineIndex: 1,
      name: '',
      description: ', 95m',
      distance: 95,
      time: 74,
      roadType: 22,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14135809, 4518275],
    },
    properties: {
      index: 4,
      pointIndex: 2,
      name: '화로이야기',
      description: '화로이야기 에서 우회전 후 보행자도로 을 따라 14m 이동 ',
      direction: '',
      nearPoiName: '화로이야기',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '11',
      facilityName: '',
      turnType: 13,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14135809, 4518275],
        [14135814, 4518281],
        [14135821, 4518288],
      ],
    },
    properties: {
      index: 5,
      lineIndex: 2,
      name: '보행자도로',
      description: '보행자도로, 14m',
      distance: 14,
      time: 11,
      roadType: 22,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14135821, 4518288],
        [14135835, 4518289],
        [14135957, 4518290],
        [14135972, 4518291],
        [14135986, 4518291],
        [14135997, 4518291],
      ],
    },
    properties: {
      index: 6,
      lineIndex: 3,
      name: '을지로',
      description: '을지로, 140m',
      distance: 140,
      time: 129,
      roadType: 22,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14135997, 4518291],
    },
    properties: {
      index: 7,
      pointIndex: 3,
      name: '',
      description: '횡단보도 후 보행자도로 을 따라 6m 이동 ',
      direction: '',
      nearPoiName: '',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '15',
      facilityName: '',
      turnType: 211,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14135997, 4518291],
        [14136005, 4518292],
      ],
    },
    properties: {
      index: 8,
      lineIndex: 4,
      name: '보행자도로',
      description: '보행자도로, 6m',
      distance: 6,
      time: 5,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '15',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136005, 4518292],
    },
    properties: {
      index: 9,
      pointIndex: 4,
      name: '',
      description: '직진 후 107m 이동 ',
      direction: '',
      nearPoiName: '',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '11',
      facilityName: '',
      turnType: 11,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136005, 4518292],
        [14136030, 4518293],
        [14136058, 4518295],
        [14136139, 4518300],
      ],
    },
    properties: {
      index: 10,
      lineIndex: 5,
      name: '',
      description: ', 107m',
      distance: 107,
      time: 76,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136139, 4518300],
    },
    properties: {
      index: 11,
      pointIndex: 5,
      name: '을지지하쇼핑센터',
      description: '을지지하쇼핑센터 에서 우회전 후 을지로 을 따라 15m 이동 ',
      direction: '',
      nearPoiName: '을지지하쇼핑센터',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '을지2가7번출구',
      facilityType: '11',
      facilityName: '',
      turnType: 13,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136139, 4518300],
        [14136154, 4518289],
      ],
    },
    properties: {
      index: 12,
      lineIndex: 6,
      name: '을지로',
      description: '을지로, 15m',
      distance: 15,
      time: 10,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136154, 4518289],
        [14136166, 4518282],
        [14136168, 4518259],
      ],
    },
    properties: {
      index: 13,
      lineIndex: 7,
      name: '삼일대로',
      description: '삼일대로, 29m',
      distance: 29,
      time: 51,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136168, 4518259],
    },
    properties: {
      index: 14,
      pointIndex: 6,
      name: '정관장 을지로본점',
      description:
        '정관장 을지로본점 에서 좌측 횡단보도 후 보행자도로 을 따라 35m 이동 ',
      direction: '',
      nearPoiName: '정관장 을지로본점',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '15',
      facilityName: '',
      turnType: 212,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136168, 4518259],
        [14136212, 4518261],
      ],
    },
    properties: {
      index: 15,
      lineIndex: 8,
      name: '보행자도로',
      description: '보행자도로, 35m',
      distance: 35,
      time: 24,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '15',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136212, 4518261],
    },
    properties: {
      index: 16,
      pointIndex: 7,
      name: '',
      description: '좌회전 후 17m 이동 ',
      direction: '',
      nearPoiName: '',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '',
      facilityType: '11',
      facilityName: '',
      turnType: 12,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136212, 4518261],
        [14136212, 4518272],
        [14136213, 4518283],
      ],
    },
    properties: {
      index: 17,
      lineIndex: 9,
      name: '',
      description: ', 17m',
      distance: 17,
      time: 12,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136213, 4518283],
    },
    properties: {
      index: 18,
      pointIndex: 8,
      name: '',
      description: '우회전 후 삼일대로 을 따라 15m 이동 ',
      direction: '',
      nearPoiName: '',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '을지2가5번출구',
      facilityType: '11',
      facilityName: '',
      turnType: 13,
      pointType: 'GP',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136213, 4518283],
        [14136216, 4518302],
      ],
    },
    properties: {
      index: 19,
      lineIndex: 10,
      name: '삼일대로',
      description: '삼일대로, 15m',
      distance: 15,
      time: 11,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [14136216, 4518302],
        [14136217, 4518302],
        [14136218, 4518302],
        [14136232, 4518303],
        [14136344, 4518307],
      ],
    },
    properties: {
      index: 20,
      lineIndex: 11,
      name: '을지로',
      description: '을지로, 102m',
      distance: 102,
      time: 72,
      roadType: 21,
      categoryRoadType: 0,
      facilityType: '11',
      facilityName: '',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14136344, 4518307],
    },
    properties: {
      index: 21,
      pointIndex: 9,
      name: '도착지',
      description: '도착',
      direction: '',
      nearPoiName: '도착지',
      nearPoiX: '0.0',
      nearPoiY: '0.0',
      intersectionName: '을지로3가역',
      facilityType: '',
      facilityName: '',
      turnType: 201,
      pointType: 'EP',
    },
  },
]

export const pathHtml: string = `<!DOCTYPE html>
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
            center : new Tmapv2.LatLng(middlePoint.latitude, middlePoint.longitude),
            width: '100%',
            height: '1900px',
            zoom: 17,
          })

          // 2. 시작, 도착 심볼찍기
          // 시작
          marker_s = new Tmapv2.Marker({
            position : new Tmapv2.LatLng(depart.latitude, depart.longitude),
            icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
            iconSize: new Tmapv2.Size(48, 76),
            map: map,
          })

          // 도착
          marker_e = new Tmapv2.Marker({
            position : new Tmapv2.LatLng(destin.latitude, destin.longitude),
            icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
            iconSize: new Tmapv2.Size(48, 76),
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
                size = new Tmapv2.Size(24, 38)
              } else if (properties.pointType == 'E') {
                //도착지 마커
                markerImg =
                  'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png'
                pType = 'E'
                size = new Tmapv2.Size(24, 38)
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
            strokeColor: '#0000AA',
            strokeWeight: 6,
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
