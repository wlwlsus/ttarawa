import { Text, Pressable, StyleSheet } from 'react-native'
import { color } from '../../styles/GlobalStyles'

export default function IconButton(props: {
  text?: string
  press?: (params: any) => any
  dir?: string // direction
  icon1?: Element
  icon2?: Element
  style: string
  nonShadow: boolean
  bg: string
}) {
  const bgTable: { [key: string]: object } = {
    yellow: styles.bgYellow,
    green: styles.bgGreen,
    white: styles.bgWhite,
    blue: styles.bgBlue,
  }

  const btnStyle: { [key: string]: object } | null =
    props.style === 'skyBtn'
      ? { btn: styles.skyBtn, text: styles.skyBtnText }
      : props.style === 'blueBtn'
      ? { btn: styles.blueBtn, text: styles.blueBtnText }
      : props.style == 'blueSquare'
      ? { btn: styles.blueSquare, text: styles.blueSquareText }
      : props.style === 'whiteBtn'
      ? { btn: styles.whiteBtn, text: styles.whiteBtnText }
      : props.style === 'blueCircle'
      ? { btn: styles.Circle }
      : null

  return (
    <Pressable
      hitSlop={10}
      style={[
        styles.container,
        btnStyle?.btn,
        props.dir === 'left' ? styles.left : null,
        !props.nonShadow ? styles.shadow : null,
        bgTable[props.bg],
      ]}
      onPress={props.press}
    >
      {props.icon1}
      {props.text && (
        <Text style={[styles.btnText, btnStyle?.text]}>{props.text}</Text>
      )}
      {props.icon2}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btnText: {
    color: color.black,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 30,
  },
  skyBtn: {
    backgroundColor: color.secondary,
    borderColor: color.primary,
    borderRadius: 17,
    padding: 10,
    borderWidth: 1.5,
    gap: 5,
  },
  skyBtnText: {
    color: color.primary,
    fontSize: 20,
  },
  blueBtn: {
    backgroundColor: color.primary,
    borderColor: color.primary,
    borderRadius: 17,
    padding: 10,
    borderWidth: 1,
    gap: 5,
  },
  blueBtnText: {
    color: color.white,
    fontSize: 20,
  },
  blueSquare: {
    backgroundColor: color.primary,
    borderRadius: 15,
    gap: 7,
    padding: 15,
  },
  blueSquareText: {
    color: color.white,
    fontSize: 15,
  },
  Circle: {
    borderRadius: 60,
    padding: 15,
    backgroundColor: 'black',
  },
  whiteBtn: {
    backgroundColor: color.white,
    borderRadius: 5,
    paddingVertical: 30,
    justifyContent: 'space-around',
    paddingLeft: 40,
  },
  whiteBtnText: {
    color: color.black,
    fontSize: 30,
  },
  left: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bgWhite: {
    backgroundColor: color.white,
  },
  bgGreen: {
    backgroundColor: color.green,
  },
  bgBlue: {
    backgroundColor: color.primary,
  },
  bgYellow: {
    backgroundColor: color.yellow,
  },
})
