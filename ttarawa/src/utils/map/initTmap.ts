// store에서 현재 위치 불러오기
const lat: number = 37.5652045
const lng: number = 126.98702028

// store에서 markers 불러오기
const markerData: { latitude: number; longitude: number }[] = [
  { latitude: 37.5652045, longitude: 126.98602028 },
  { latitude: 37.5652045, longitude: 126.98702028 },
  { latitude: 37.5652045, longitude: 126.98802028 },
  { latitude: 37.5652045, longitude: 126.98612028 },
]

export const mapHtml: string = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>simpleMap</title>
      <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c"></script>
      <script type="text/javascript">
      let map

      function initTmap() {
        map = new Tmapv3.Map('map_div', {
          center: new Tmapv3.LatLng(37.5652045, 126.98702028),
          width: '100%', // 지도의 넓이
          height: '1900px', // 지도의 높이
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
              markerData[i].latitude,
              markerData[i].longitude,
            ),
            map: map,
          })
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
