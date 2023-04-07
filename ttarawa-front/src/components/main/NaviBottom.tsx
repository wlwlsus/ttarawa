import { View, Text } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { remainingDistanceState } from '~/store/atoms'

export default function NaviBottom(props: {
  setRidingTime: any
  stopLocationTracking: any
  setEndModalVisible: any
  distance: string
}) {
  const remainingDistance = useRecoilValue(remainingDistanceState)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let countUp = setInterval(() => {
      setTime((prevTime) => prevTime + 1) // 이전 값 재사용을 위한 콜백함수
    }, 1000)

    return () => {
      clearInterval(countUp)
    }
  }, [])

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
        {/* <Text style={navi.infoContent}>{formatTime(props.currentTime)}</Text> */}
        <Text style={navi.infoContent}>{formatTime(time)}</Text>
      </View>
      <IconButton
        icon1={
          <Ionicons name="ios-close-circle-sharp" size={70} color={color.red} />
        }
        press={() => {
          props.setEndModalVisible(true)
          props.setRidingTime(time)
        }}
      />
      <View style={navi.info}>
        <Text style={navi.infoTitle}>남은거리</Text>
        <Text style={navi.infoContent}>
          {(remainingDistance * 100).toFixed(2)} km
        </Text>
      </View>
    </View>
  )
}
