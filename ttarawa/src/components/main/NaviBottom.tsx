import { View, Text } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { remainingDistanceState } from '~/store/atoms'

export default function NaviBottom(props: {
  currentTime: any
  setCurrentTime: any
  stop: any
  handleOn: any
  time: any
  distance: any
}) {
  const [isRunning, setIsRunning] = useState(true)
  const remainingDistance = useRecoilValue(remainingDistanceState)

  // 시간초 재기
  useEffect(() => {
    let interval: any
    if (isRunning) {
      interval = setInterval(() => {
        props.setCurrentTime(props.currentTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, props.currentTime])
  // 시간값 변경
  useEffect(() => {
    props.setCurrentTime(props.time)
  }, [props.time])
  // 시간 표기 변환
  const formatTime = (time: any) => {
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
        <Text style={navi.infoContent}>{formatTime(props.currentTime)}</Text>
      </View>
      <IconButton
        icon1={
          <Ionicons name="ios-close-circle-sharp" size={70} color={color.red} />
        }
        press={() => {
          setIsRunning(false)
          props.handleOn()
          props.stop()
        }}
      />
      <View style={navi.info}>
        <Text style={navi.infoTitle}>남은거리</Text>
        <Text style={navi.infoContent}>
          {' '}
          {(remainingDistance * 100).toFixed(2)} km
        </Text>
      </View>
    </View>
  )
}
