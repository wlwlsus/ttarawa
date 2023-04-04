import { locationListState } from '~/store/atoms'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'

export default function getDistance(locationData) {
  function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }

  // 두 지점 사이의 거리를 계산하는 함수 (단위: meter)
  function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371000 // 지구 반지름 (단위: meter)
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const lat1Rad = toRadians(lat1)
    const lat2Rad = toRadians(lat2)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return Math.round(d) // double -> long으로 변환
  }

  function getTotalDistance() {
    // 총 거리 계산을 위한 변수
    let totalDistance: number = 0
    // 좌표 리스트에서 한 쌍씩 좌표를 선택하여 거리를 계산하고, 총 거리를 계산하는 반복문
    for (let i = 0; i < locationData.length - 3; i += 2) {
      const lat1 = locationData[i + 1]
      const lon1 = locationData[i]
      const lat2 = locationData[i + 3]
      const lon2 = locationData[i + 2]
      let d = distance(lat1, lon1, lat2, lon2) // Haversine 공식을 사용하여 거리 계산
      if (d < 2) d = 0 // 움직인 거리 1m 이하면 정지 상태(?)
      totalDistance += d // 총 거리 누적
    }
    // 총 거리 출력
    console.log(`총 길이: ${totalDistance}m`)

    return totalDistance
  }
  useEffect(() => {
    getTotalDistance()
  }, [])
}
