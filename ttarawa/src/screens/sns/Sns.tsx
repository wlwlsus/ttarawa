import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import BottomSheet from '@components/common/BottomSheet'
import SnsComponent from '@components/sns/Index'
import { sns } from '@styles/sns'
import { useRecoilState } from 'recoil'
import { snsModal } from '@store/atoms'

export default function Sns() {
  const [modalVisible, setModalVisible] = useRecoilState(snsModal)

  return (
    <View style={sns.rootContainer}>
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <SnsComponent />
    </View>
  )
}
