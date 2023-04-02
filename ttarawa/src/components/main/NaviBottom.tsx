import { View, Text, SafeAreaView } from 'react-native'
import { navi } from '@styles/main'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'
export default function NaviBottom() {
  return (
    <View style={navi.bottomBar}>
      <View style={navi.info}>
        <Text>주행시간</Text>
        <Text style={navi.infoContent}>HH : MM : SS</Text>
      </View>
      <IconButton
        icon1={
          <Ionicons name="ios-close-circle-sharp" size={60} color={color.red} />
        }
        press={() => console.log('종료')}
      />
      <View style={navi.info}>
        <Text>남은거리</Text>
        <Text style={navi.infoContent}>N km</Text>
      </View>
    </View>
  )
}
