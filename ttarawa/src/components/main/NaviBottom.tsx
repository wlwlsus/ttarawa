import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
import getTrack from '~/utils/getTrack'
import React, { useEffect, useState } from 'react'
export default function NaviBottom({ time, stop, handleOn }) {
  const [currentTime, setCurrentTime] = useState(time)
  const [isRunning, setIsRunning] = useState(true)

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
        <Text style={navi.infoContent}>0.5 km</Text>
      </View>
    </View>
  )
}
