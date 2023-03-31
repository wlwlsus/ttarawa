import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const Timer = ({ time }) => {
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

  return <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
}

const styles = {
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
}

export default Timer
