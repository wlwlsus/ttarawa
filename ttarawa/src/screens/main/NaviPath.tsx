import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import TimerButton from '@components/common/TimerButton'

export default function Navi() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
      setIntervalId(id)
    } else {
      clearInterval(intervalId)
    }
  }, [isRunning])

  const handleStart = (seconds) => {
    setTime(seconds)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTime(0)
  }

  const getRemainingTime = () => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours}시간 ${minutes}분 ${seconds}초`
  }
  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <Text>네이게이션 화면</Text>
      <Pressable hitSlop={10}>
        <Text>따릉이 남은 시간</Text>
        {time > 0 && <Text>{getRemainingTime()}</Text>}
      </Pressable>

      <TimerButton title="1시간" onPress={() => handleStart(3600)} />
      <TimerButton title="2시간" onPress={() => handleStart(7200)} />
      <TimerButton title="Stop" onPress={handleStop} />
    </SafeAreaView>
  )
}
