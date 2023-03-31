import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const TimerModal = ({ modalVisible, handleSetTime }) => {
  const handlePress = (time: number) => {
    handleSetTime(time)
  }

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => handlePress(3600)}
        >
          <Text>1시간</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => handlePress(7200)}
        >
          <Text>2시간</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = {
  modalContainer: {
    flex: 1,
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
