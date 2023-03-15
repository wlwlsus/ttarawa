import { View, Text, StyleSheet } from 'react-native'
import SNS from '@components/sns/Index'
import { FlatList } from 'react-native-gesture-handler/lib/typescript/components/GestureComponents'

export default function Sns() {
  return (
    <View style={styles.snsContainer}>
      {/* <FlatList> */}
      <SNS />
      {/* </FlatList> */}
    </View>
  )
}

const styles = StyleSheet.create({
  snsContainer: {
    flex: 1,
  },
})
