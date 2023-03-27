import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import BottomSheet from '@components/common/BottomSheet'
import SnsComponent from '@components/sns/Index'
import { sns } from '@styles/sns'

export default function Sns() {
  const [modalVisible, setModalVisible] = useState(false)
  const pressButton = () => {
    setModalVisible(true)
  }

  return (
    <View style={sns.rootContainer}>
      <Button title={'Open'} onPress={pressButton} />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <SnsComponent />
    </View>
  )
}
