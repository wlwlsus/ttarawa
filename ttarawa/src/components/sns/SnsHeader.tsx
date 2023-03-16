import { Image, View } from 'react-native'

export default function SnsHeader() {
  return (
    <View>
      <Image
        style={{ width: 120, height: 35 }}
        source={require('@assets/ttarawa/logo.png')}
      />
    </View>
  )
}
