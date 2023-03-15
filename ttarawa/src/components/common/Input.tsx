import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { color } from '@styles/GlobalStyles'

export default function Input(props: {
  label?: string
  placeholder?: string
  value?: string
  setValue: (params: string) => any
  dir?: string
}) {
  const direction = props.dir === 'right' ? styles.right : null

  return (
    <View style={[styles.container, direction]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(payload: string) => props.setValue(payload)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingHorizontal: 10,
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
  input: {
    fontSize: 20,
    padding: 7,
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  right: {
    flexDirection: 'row-reverse',
  },
})
