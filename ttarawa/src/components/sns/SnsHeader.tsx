import { Image, View } from 'react-native'
import { header } from '@styles/sns'
import IconButton from '@components/common/IconButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { color } from '@styles/GlobalStyles'
import { useSetRecoilState } from 'recoil'
import { snsModal } from '@store/atoms'

export default function SnsHeader({ navigation }) {
  const setModalVisible = useSetRecoilState(snsModal)

  return (
    <View style={header.container}>
      <Image style={header.logo} source={require('@assets/ttarawa/logo.png')} />
      <IconButton
        icon1={
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={color.gray}
          />
        }
        press={() => setModalVisible(true)}
      />
    </View>
  )
}
