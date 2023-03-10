import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { color } from '@styles/GlobalStyles'

export default function Label(props: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary,
    padding: 5,
    borderRadius: 10,
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: color.primary,
  },
})
