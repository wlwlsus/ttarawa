import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { color } from '@styles/GlobalStyles'

export default function Input(props: {
  label?: string
  placeholder?: string
  value?: string
  setValue: (params: string) => any
  dir?: string
  disabled?: boolean
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
        editable={!props.disabled}
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  input: {
    fontSize: 17,
    padding: 6,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row-reverse',
  },
})
