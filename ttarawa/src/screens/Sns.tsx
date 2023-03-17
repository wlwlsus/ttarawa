import { View, Text, StyleSheet } from 'react-native'
import SNS from '@components/sns/Index'

export default function Sns() {
  return (
    <View style={styles.snsContainer}>
      <SNS />
    </View>
  )
}

const styles = StyleSheet.create({
  snsContainer: {
    flex: 1,
  },
})
