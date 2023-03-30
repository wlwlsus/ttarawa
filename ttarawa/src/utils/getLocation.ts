import * as Location from 'expo-location'

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

    return { lat: latitude, lng: longitude }
  } catch (error) {
    return null
  }
}
