import { View, Text, SafeAreaView } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
import React, { useEffect, useState } from 'react'
export default function NaviBottom({ time }) {
  const [currentTime, setCurrentTime] = useState(time)

  useEffect(() => {
    let interval

    interval = setInterval(() => {
      setCurrentTime(currentTime + 1)
    }, 1000)

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
    <View style={navi.bottomBar}>
      <View style={navi.info}>
        <Text style={navi.infoTitle}>주행시간</Text>
        <Text style={navi.infoContent}>{formatTime(currentTime)}</Text>
      </View>
      <IconButton
        icon1={
          <Ionicons name="ios-close-circle-sharp" size={70} color={color.red} />
        }
        press={() => console.log('종료')}
      />
      <View style={navi.info}>
        <Text style={navi.infoTitle}>남은거리</Text>
        <Text style={navi.infoContent}>N km</Text>
      </View>
    </View>
  )
}
