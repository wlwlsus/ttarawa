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
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 2,
  },

  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: color.primary,
  },
})
