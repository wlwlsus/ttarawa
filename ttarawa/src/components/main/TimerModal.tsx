import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '@styles/GlobalStyles'

const TimerModal = ({ modalVisible, handleSetTime, cancleTime }) => {
  const handlePress = (time: number) => {
    handleSetTime(time)
  }
  const [time, setTime] = useState(0)
  const cancleTimer = () => {
    cancleTime()
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.modalContainer}>
        <View
          style={{
            height: '70%',
            width: '90%',
            backgroundColor: color.white,
            borderRadius: 10,
          }}
        >
          <Text style={styles.modalButton} onPress={() => setTime(3600)}>
            1시간
          </Text>

          <Text style={styles.modalButton} onPress={() => setTime(7200)}>
            2시간
          </Text>

          <Text style={styles.modalButton} onPress={() => cancleTimer()}>
            취소
          </Text>

          <Text style={styles.modalButton} onPress={() => handlePress(time)}>
            확인
          </Text>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: color.modalBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
  },
}

export default TimerModal
