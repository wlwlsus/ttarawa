import { StyleSheet, Text, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'

interface Proptypes {
  text: string
  style?: string
  press: (params: any) => void
}

export default function Button({ text, style, press }: Proptypes) {
  const btnStyle: { btn: object; text: object } =
    style === 'blue'
      ? { btn: styles.blueBtn, text: styles.blueBtnText }
      : style === 'white'
      ? { btn: styles.whiteBtn, text: styles.whiteBtnText }
      : style === 'tabSelected'
      ? { btn: styles.tabSelected, text: styles.tabSelectedText }
      : { btn: styles.tabBtn, text: styles.tabBtnText }

  return (
    <Pressable
      hitSlop={10}
      style={[styles.container, btnStyle.btn]}
      onPress={press}
    >
      <Text style={[styles.text, btnStyle.text]}>{text}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  blueBtn: {
    backgroundColor: color.primary,
    padding: 20,
    marginHorizontal: 20,
  },
  blueBtnText: {
    color: color.white,
  },

  whiteBtn: {
    backgroundColor: color.white,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: 'transparent',
  },
  whiteBtnText: {
    color: color.primary,
    fontSize: 20,
  },

  tabBtn: {
    width: 57,
    backgroundColor: color.white,
    padding: 7,
  },
  tabBtnText: {
    fontSize: 15,
  },
  tabSelected: {
    width: 57,
    backgroundColor: color.secondary,
    padding: 7,
  },
  tabSelectedText: {
    color: color.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
})
