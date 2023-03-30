import { View, Text, Button } from 'react-native'
import BottomSheet from '@components/common/BottomSheet'
import SnsContent from '@components/sns/SnsContent'
import { sns } from '@styles/sns'
import { useRecoilState } from 'recoil'
import { snsModal } from '@store/atoms'
import SnsMenu from '@components/sns/SnsMenu'

export default function Sns() {
  const [modalVisible, setModalVisible] = useRecoilState(snsModal)

  return (
    <View style={sns.rootContainer}>
      <SnsContent />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={<SnsMenu />}
      />
    </View>
  )
}
