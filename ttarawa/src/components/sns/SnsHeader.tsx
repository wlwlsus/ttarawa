import { Image, View } from 'react-native'
import { header } from '@styles/sns'
import IconButton from '@components/common/IconButton'
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'
import { color, styles } from '@styles/GlobalStyles'

export default function SnsHeader({ navigation }) {
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
        press={() => console.log('menu')}
      />
    </View>
  )
}
