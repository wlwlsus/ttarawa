import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import Timer from '@components/common/Timer'
import TimerModal from '@components/common/TimerModal'

export default function NaviPath() {
  const [modalVisible, setModalVisible] = useState(false)
  const [time, setTime] = useState(0)

  const handleModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const handleSetTime = (newTime) => {
    setTime(newTime)
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <Text>네이게이션 화면</Text>

      <View>
        <TouchableOpacity
          style={styles.timerContainer}
          onPress={handleModalVisible}
        >
          <Timer time={time} />
        </TouchableOpacity>
        <TimerModal modalVisible={modalVisible} handleSetTime={handleSetTime} />
      </View>
    </SafeAreaView>
  )
}
