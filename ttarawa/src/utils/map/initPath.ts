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

export const pathHtml: string = `<!DOCTYPE html>
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>simpleMap</title>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script
    src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA"></script>
  
  <script type="text/javascript">
    let map;
    let marker_s, marker_e, marker_p1, marker_p2;
    let totalMarkerArr = [];
    let drawInfoArr = [];
    let resultdrawArr = [];

    const middlePoint = ${JSON.stringify(middlePoint)}
    const depart = ${JSON.stringify(departData)}
    const destin = ${JSON.stringify(destinData)}


    function initTmap() {
      // 1. 지도 띄우기
      map = new Tmapv2.Map("map_div", {
      center : new Tmapv2.LatLng(middlePoint.latitude, middlePoint.longitude),
        width : "100%",
        height : "1900px",
        zoom : 17,
        zoomControl : true,
        scrollwheel : true
      });

      // 2. 시작, 도착 심볼찍기
      // 시작
      marker_s = new Tmapv2.Marker(
          {
            position : new Tmapv2.LatLng(depart.latitude, depart.longitude),
            icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_s.png",
            iconSize : new Tmapv2.Size(24, 38),
            map : map
          });

      // 도착
      marker_e = new Tmapv2.Marker(
          {
            position : new Tmapv2.LatLng(destin.latitude, destin.longitude),
            icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
            iconSize : new Tmapv2.Size(24, 38),
            map : map
          });

      // 3. 경로탐색 API 사용요청
      let headers = {}; 
        headers["appKey"]="R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA;

      $.ajax({
          method : "POST",
          headers : headers,
          url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
          async : false,
          data : {
            "startX" : depart.longitude,
            "startY" : depart.latitude,
            "endX" : destin.longitude,
            "endY" : destin.latitude,
            "reqCoordType" : "WGS84GEO",
            "resCoordType" : "EPSG3857",
            "startName" : "출발지",
            "endName" : "도착지"
          },
          success : function(response) {
            let resultData = response.features;

            //결과 출력
            let tDistance = "총 거리 : "
                + ((resultData[0].properties.totalDistance) / 1000)
                    .toFixed(1) + "km,";
            let tTime = " 총 시간 : "
                + ((resultData[0].properties.totalTime) / 60)
                    .toFixed(0) + "분";

            $("#result").text(tDistance + tTime);
            
            //기존 그려진 라인 & 마커가 있다면 초기화
            if (resultdrawArr.length > 0) {
              for ( let i in resultdrawArr) {
                resultdrawArr[i]
                    .setMap(null);
              }
              resultdrawArr = [];
            }
            
            drawInfoArr = [];

            for ( let i in resultData) { //for문 [S]
              let geometry = resultData[i].geometry;
              let properties = resultData[i].properties;
              let polyline_;


              if (geometry.type == "LineString") {
                for ( let j in geometry.coordinates) {
                  // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                  let latlng = new Tmapv2.Point(
                      geometry.coordinates[j][0],
                      geometry.coordinates[j][1]);
                  // 포인트 객체를 받아 좌표값으로 변환
                  let convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                      latlng);
                  // 포인트객체의 정보로 좌표값 변환 객체로 저장
                  let convertChange = new Tmapv2.LatLng(
                      convertPoint._lat,
                      convertPoint._lng);
                  // 배열에 담기
                  drawInfoArr.push(convertChange);
                }
              } else {
                let markerImg = "";
                let pType = "";
                let size;

                if (properties.pointType == "S") { //출발지 마커
                  markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                  pType = "S";
                  size = new Tmapv2.Size(24, 38);
                } else if (properties.pointType == "E") { //도착지 마커
                  markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                  pType = "E";
                  size = new Tmapv2.Size(24, 38);
                } else { //각 포인트 마커
                  markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                  pType = "P";
                  size = new Tmapv2.Size(8, 8);
                }

                // 경로들의 결과값들을 포인트 객체로 변환 
                let latlon = new Tmapv2.Point(
                    geometry.coordinates[0],
                    geometry.coordinates[1]);

                // 포인트 객체를 받아 좌표값으로 다시 변환
                let convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlon);

                let routeInfoObj = {
                  markerImage : markerImg,
                  lng : convertPoint._lng,
                  lat : convertPoint._lat,
                  pointType : pType
                };

                // Marker 추가
                marker_p = new Tmapv2.Marker(
                    {
                      position : new Tmapv2.LatLng(
                          routeInfoObj.lat,
                          routeInfoObj.lng),
                      icon : routeInfoObj.markerImage,
                      iconSize : size,
                      map : map
                    });
              }
            }//for문 [E]
            drawLine(drawInfoArr);
          },
          error : function(request, status, error) {
            console.log("code:" + request.status + "\n"
                + "message:" + request.responseText + "\n"
                + "error:" + error);
          }
        });

    }

    function addComma(num) {
      let regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ',');
    }
    
    function drawLine(arrPoint) {
      let polyline_;

      polyline_ = new Tmapv2.Polyline({
        path : arrPoint,
        strokeColor : "#DD0000",
        strokeWeight : 6,
        map : map
      });
      resultdrawArr.push(polyline_);
    }
  </script>
  </head>
  <body onload="initTmap();">
    
      <!-- 190430 기존 지도를 모두 이미지 처리 위해 주석 처리 S -->
      <div id="map_wrap" class="map_wrap3">
        <div id="map_div"></div>
      </div>
      <div class="map_act_btn_wrap clear_box"></div>
      <p id="result"></p>
      <br />
  </body>
  </html>
  `
