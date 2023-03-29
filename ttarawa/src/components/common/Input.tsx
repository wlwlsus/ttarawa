import { StyleSheet, View, Text, TextInput } from 'react-native'
import { color } from '@styles/GlobalStyles'

interface Props {
  label?: string
  placeholder?: string
  value?: string
  setValue: (params: string) => any
  dir?: string
  disabled?: boolean
}

export default function Input({
  label,
  placeholder,
  value,
  setValue,
  dir,
  disabled,
}: Props) {
  const direction = dir === 'right' ? styles.right : null

  return (
    <View style={[styles.container, direction]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(payload: string) => setValue(payload)}
        editable={!disabled}
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
