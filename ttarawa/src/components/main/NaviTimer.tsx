import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navi } from '@styles/main'

export default function NaviTimer({ time, onpress }) {
  const [currentTime, setCurrentTime] = useState(time)

  useEffect(() => {
    let interval
    if (currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentTime])

  useEffect(() => {
    setCurrentTime(time)
  }, [time])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Pressable onPress={onpress} style={navi.timer}>
      <Text style={navi.infoTitle}>따릉이 남은 시간</Text>
      <Text style={navi.time}>{formatTime(currentTime)}</Text>
    </Pressable>
  )
}
