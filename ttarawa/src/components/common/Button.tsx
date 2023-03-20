import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  Pressable,
} from 'react-native'
import { color } from '@styles/GlobalStyles'

interface Props {
  text: string
  type?: 'transparent' | 'large' | 'tab'
  press: (params: any) => void
  style?: {
    container?: StyleProp<ViewStyle>
    txt?: StyleProp<TextStyle>
  }
}

export default function Button({
  text,
  type = 'transparent',
  style = {},
  press,
}: Props) {
  const { container: containerStyle = {}, txt: textStyle = {} } = style
  const btnStyle = [styles.container, styles[type], containerStyle]
  const textStyles = [styles.text, styles[`${type}Text`], textStyle]

  return (
    <Pressable hitSlop={10} style={btnStyle} onPress={press}>
      <Text style={textStyles}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
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
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  transparent: {
    backgroundColor: 'transparent',
    padding: 20,
    shadowColor: 'transparent',
  },

  transparentText: {
    color: color.primary,
    fontSize: 20,
  },

  large: {
    backgroundColor: color.primary,
    padding: 20,
  },

  largeText: {
    color: color.white,
    fontSize: 20,
  },

  tab: {
    width: 57,
    backgroundColor: color.white,
    padding: 7,
  },

  tabText: {
    fontSize: 15,
  },
})
