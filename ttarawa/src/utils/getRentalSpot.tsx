import axios from 'axios'

// API 요청 URL
const API_URL =
  'http://openapi.seoul.go.kr:8088/6e4b774546776c7737336b4d756a46/json/bikeList/'

// API 호출 함수
export default async function getRentalSpot(lat: number, lng: number) {
  try {
    const allStations = []

    // 대여소 정보를 구간별로 요청하여 모든 대여소 정보 가져오기
    for (let startIndex = 1; startIndex <= 2707; startIndex += 1000) {
      const endIndex = Math.min(startIndex + 999, 2707)
      const url = `${API_URL}${startIndex}/${endIndex}/`
      const response = await axios.get(url)
      const responseData = response.data

      if (responseData.rentBikeStatus) {
        allStations.push(...responseData.rentBikeStatus.row)
      }
    }

    // 모든 대여소와 현재 위치 간의 거리 계산
    const distances = allStations.map((station) => {
      const stationLatitude = parseFloat(station.stationLatitude)
      const stationLongitude = parseFloat(station.stationLongitude)

      // 현재 위치와 대여소 간의 거리 계산
      const distance =
        Math.sqrt(
          Math.pow(stationLatitude - lat, 2) +
            Math.pow(stationLongitude - lng, 2),
        ) * 100000

      return { station, distance }
    })

    // 거리를 기준 정렬, 가까운 대여소 10개  출력
    const nearestStations = distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10)

    const spotList: object[] = []

    // 장소 이름, 위도, 경도, 주소 가공
    nearestStations.forEach(async (nearestStation) => {
      const spot = {
        name: nearestStation.station.stationName.split('.')[1].trim(),
        lat: nearestStation.station.stationLatitude,
        lng: nearestStation.station.stationLongitude,
        spotNum: nearestStation.station.stationName.split('.')[0],
      }
      spotList.push(spot)
    })

    return spotList
  } catch (error) {
    console.error(error)
  }
}
