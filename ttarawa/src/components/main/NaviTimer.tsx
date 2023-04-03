import { View, Text, SafeAreaView } from 'react-native'
import { navi } from '@styles/main'

export default function NaviTimer() {
  return (
    <View style={navi.timer}>
      <Text style={navi.infoTitle}>따릉이 남은 시간</Text>
      <Text style={navi.time}>HH : MM : SS</Text>
    </View>
  )
}
