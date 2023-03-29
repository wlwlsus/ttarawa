import {
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { color } from '@styles/GlobalStyles'
import { ReactNode } from 'react'

interface Props {
  text?: string
  type?: 'transparent' | 'primary' | 'secondary' | 'square' | 'circle' | 'large'
  icon1?: ReactNode
  icon2?: ReactNode
  dir?: 'left' // 아이콘 & 텍스트 방향
  nonShadow?: boolean
  press: (params: any) => void
  style?: {
    container?: StyleProp<ViewStyle>
    txt?: StyleProp<TextStyle>
  }
}

export default function IconButton({
  text,
  type = 'transparent',
  icon1,
  icon2,
  dir,
  nonShadow = false,
  press,
  style = {},
}: Props) {
  const { container: containerStyle = {}, txt: textStyle = {} } = style
  const btnStyle = [
    styles.container,
    styles[type],
    dir && styles.left,
    !nonShadow && styles.shadow,
    containerStyle,
  ]
  const textStyles = [styles.text, styles[`${type}Text`], textStyle]

  return (
    <Pressable hitSlop={10} style={btnStyle} onPress={press}>
      {icon1}
      {text && <Text style={textStyles}>{text}</Text>}
      {icon2}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  text: {
    color: color.black,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },

  transparent: {},

  transparentText: {
    fontSize: 17,
  },

  primary: {
    backgroundColor: color.primary,
    borderColor: color.primary,
    borderRadius: 17,
    padding: 7,
    borderWidth: 1,
    gap: 5,
  },

  primaryText: {
    color: color.white,
    fontSize: 16,
  },

  secondary: {
    backgroundColor: color.secondary,
    borderColor: color.primary,
    borderRadius: 17,
    padding: 7,
    borderWidth: 1.5,
    gap: 5,
  },

  secondaryText: {
    color: color.primary,
    fontSize: 17,
  },

  square: {
    backgroundColor: color.lightGray,
    borderRadius: 15,
    gap: 7,
    paddingHorizontal: 15,
  },

  squareText: {
    color: color.white,
    fontSize: 15,
  },

  circle: {
    borderRadius: 60,
    padding: 15,
    backgroundColor: color.black,
  },

  large: {
    backgroundColor: color.white,
    borderRadius: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 30,
    paddingLeft: 40,
  },

  largeText: {
    color: color.black,
    fontSize: 23,
  },

  left: {
    flexDirection: 'row',
  },

  shadow: {
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
