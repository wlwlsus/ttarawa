import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import BottomSheet from '@components/common/BottomSheet'
import SnsContent from '~/components/sns/SnsContent'
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
      <SnsContent />
    </View>
  )
}
