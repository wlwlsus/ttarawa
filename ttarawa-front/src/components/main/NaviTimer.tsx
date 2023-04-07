import { Text, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { navi } from '@styles/main'
import noti from '@utils/notification'

export default function NaviTimer({
  rentalTime,
  setModalVisible,
  setReturnModalVisible,
}) {
  const [time, setTime] = useState(rentalTime)

  // 잔여 시간에 따라 클릭시 보여줄 modal 결정
  const handlePress = () => {
    if (time) {
      setReturnModalVisible(true)
      setModalVisible(false)
    } else {
      setReturnModalVisible(false)
      setModalVisible(true)
    }
  }

  // rentalTime 변경이 감지가 안돼서 일단 dependency에 넣어놓음
  // Todo: 리팩토링 필요
  useEffect(() => {
    if (!rentalTime) {
      setTime(0)
      return
    }

    setTime(rentalTime)
    let countDown = setInterval(() => {
      setTime((prevTime) => prevTime - 1) // 이전 값 재사용을 위한 콜백함수
    }, 1000)

    return () => {
      clearInterval(countDown)
    }
  }, [rentalTime])

  // 잔여시간 20분, 10분시 반납 알람
  useEffect(() => {
    if (time === 1200 || time === 600) {
      const min = time / 60
      noti.returnNoti(min)
    }
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
    <Pressable onPress={handlePress} style={navi.timer}>
      <Text style={navi.infoTitle}>따릉이 남은 시간</Text>
      <Text style={navi.time}>{formatTime(time)}</Text>
    </Pressable>
  )
}
