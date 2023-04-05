import * as Location from 'expo-location'

// 현재 위치의 위도, 경도, 위치 이름을 반환하는 함수
export default async function getLocation() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()

    // 위치 허용 권한
    if (status !== 'granted') {
      return
    }

    // 현재 위치 정보 얻기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })

    // 현재 장소 이름
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )
    // 경도, 위도, 현재 장소이름 반환
    return { lat: latitude, lng: longitude, name: location[0].street }
  } catch (error) {
    return null
  }
}
