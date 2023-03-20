import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import BottomSheet from '@components/common/BottomSheet'
import SnsComponent from '@components/sns/Index'

export default function Sns() {
  const [modalVisible, setModalVisible] = useState(false)
  const pressButton = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.rootContainer}>
      <Button title={'Open'} onPress={pressButton} />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <SnsComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
