import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
import React, { useEffect, useState } from 'react'

// // 좌표를 나타내는 인터페이스
// interface Point {
//   latitude: number // 위도
//   longitude: number // 경도
// }

// interface NavigationProps {
//   path: Point[] // 경로 정보(지점들의 좌표 정보)
//   currentPosition: Point // 현재 위치
// }

export default function NaviBottom({
  currentTime,
  setCurrentTime,
  stop,
  handleOn,
  time,
}) {
  //   { path, currentPosition }: NavigationProps,
  //   const [remainingDistance, setRemainingDistance] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(true)
  // 현재 위치가 변경될 때마다 실행되는 useEffect
  // useEffect(() => {
  //   // 가장 가까운 지점의 인덱스를 찾음
  //   const index = findClosestIndex(currentPosition, path)
  //   // 현재 위치가 경로상에 있는지 여부를 판단
  //   const isOnPath = checkIsOnPath(
  //     currentPosition,
  //     path[index],
  //     path[index + 1],
  //   )
  //   if (isOnPath) {
  //     // 경로상에 위치하면 다음 지점까지의 거리를 계산
  //     setRemainingDistance(
  //       calculateRemainingDistance(currentPosition, path[index + 1]),
  //     )
  //   } else {
  //     // 경로 이탈 발생 시, 경로상에서 다시 진입할 지점을 찾아 거리 계산
  //     setRemainingDistance(
  //       findRemainingDistanceOnDetour(currentPosition, path, index),
  //     )
  //   }
  // }, [currentPosition, path])

  // // 현재 위치에서 가장 가까운 지점의 인덱스를 찾는 함수
  // const findClosestIndex = (currentPosition: Point, path: Point[]) => {
  //   let closestIndex = 0
  //   let closestDistance = Number.MAX_VALUE
  //   // 모든 지점에 대해 현재 위치와의 거리를 계산하여 가장 가까운 지점의 인덱스를 찾음
  //   for (let i = 0; i < path.length - 1; i++) {
  //     const distance = calculateDistance(currentPosition, path[i])
  //     if (distance < closestDistance) {
  //       closestIndex = i
  //       closestDistance = distance
  //     }
  //   }
  //   return closestIndex
  // }

  // // 현재 위치가 경로상에 있는지 여부를 체크하는 함수
  // const checkIsOnPath = (currentPosition: Point, p1: Point, p2: Point) => {
  //   const distance = calculateDistance(p1, p2)
  //   const distance1 = calculateDistance(currentPosition, p1)
  //   const distance2 = calculateDistance(currentPosition, p2)
  //   if (distance1 + distance2 === distance) {
  //     return true
  //   }
  //   return false
  // }

  // // 현재 위치와 경로 상 다음 지점 사이의 거리를 계산하는 함수
  // const calculateRemainingDistance = (
  //   currentPosition: Point,
  //   nextPoint: Point,
  // ) => {
  //   return calculateDistance(currentPosition, nextPoint)
  // }

  // // 경로 이탈이 발생했을 때, 경로상에서 다시 진입할 지점을 찾고, 해당 지점에서부터 다음 지점까지의 거리를 계산하는 함수
  // const findRemainingDistanceOnDetour = (
  //   currentPosition: Point,
  //   path: Point[],
  //   index: number,
  // ) => {
  //   // 현재 위치와 가장 가까운 경로상의 지점을 찾음
  //   const closestPoint = path[index]
  //   // 현재 위치와 가장 가까운 경로상의 지점과 다음 지점 사이의 직선과의 교점을 찾음
  //   const intersection = findIntersection(
  //     currentPosition,
  //     closestPoint,
  //     path[index + 1],
  //   )
  //   // 교점부터 다음 지점까지의 거리를 계산
  //   const remainingDistance = calculateRemainingDistance(
  //     intersection,
  //     path[index + 1],
  //   )
  //   return remainingDistance
  // }

  // // 두 지점 사이의 거리를 계산하는 함수
  // const calculateDistance = (p1: Point, p2: Point) => {
  //   const R = 6371 // 지구 반지름
  //   const dLat = deg2rad(p2.latitude - p1.latitude)
  //   const dLon = deg2rad(p2.longitude - p1.longitude)
  //   const a =
  //     Math.sin(dLat / 2) ** 2 +
  //     Math.cos(deg2rad(p1.latitude)) *
  //       Math.cos(deg2rad(p2.latitude)) *
  //       Math.sin(dLon / 2) ** 2
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  //   return R * c * 1000 // 미터 단위로 반환
  // }

  // // 두 지점의 위도와 경도 차이를 라디안으로 변환하는 함수
  // const deg2rad = (deg: number) => {
  //   return (deg * Math.PI) / 180
  // }

  // // 현재 위치와 가장 가까운 경로상의 지점과 다음 지점 사이의 교점을 찾는 함수
  // const findIntersection = (currentPosition: Point, p1: Point, p2: Point) => {
  //   const a = p2.latitude - p1.latitude
  //   const b = p1.longitude - p2.longitude
  //   const c = p2.longitude * p1.latitude - p1.longitude * p2.latitude
  //   const d = a * currentPosition.longitude + b * currentPosition.latitude
  //   const e = -(a * p1.longitude + b * p1.latitude + c)
  //   const longitude = (d * b - e * currentPosition.longitude) / (a * b)
  //   const latitude = (e - a * currentPosition.latitude) / b
  //   return { latitude, longitude }
  // }

  // 시간초 재기
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(currentTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, currentTime])
  // 시간값 변경
  useEffect(() => {
    setCurrentTime(time)
  }, [time])
  // 시간 표기 변환
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // 현재 위치 받기

  return (
    <View style={navi.bottomBar}>
      <View style={navi.info}>
        <Text style={navi.infoTitle}>주행시간</Text>
        <Text style={navi.infoContent}>{formatTime(currentTime)}</Text>
      </View>

      <IconButton
        icon1={
          <Ionicons name="ios-close-circle-sharp" size={70} color={color.red} />
        }
        press={() => {
          setIsRunning(false)
          handleOn()
          stop()
        }}
      />

      <View style={navi.info}>
        <Text style={navi.infoTitle}>남은거리</Text>
        <Text style={navi.infoContent}> N km</Text>
      </View>
    </View>
  )
}
