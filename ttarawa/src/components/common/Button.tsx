import { StyleSheet, Text, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'

export default function Button(props: {
  text: string
  style: string
  press: (params: any) => any // type check off (수정 필요)
}) {
  const btnStyle: { btn: object; text: object } =
    props.style === 'blue'
      ? { btn: styles.blueBtn, text: styles.blueBtnText }
      : props.style === 'white'
      ? { btn: styles.whiteBtn, text: styles.whiteBtnText }
      : { btn: styles.tabBtn, text: styles.tabBtnText }

  return (
    <Pressable
      hitSlop={10}
      style={[styles.container, btnStyle.btn]}
      onPress={props.press}
    >
      <Text style={[styles.text, btnStyle.text]}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
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
    backgroundColor: 'transparent',
    padding: 20,
    marginHorizontal: 20,
  },
  whiteBtnText: {
    color: color.primary,
    fontSize: 20,
  },

  tabBtn: {
    backgroundColor: color.white,
    padding: 5,
  },
  tabBtnText: {
    fontSize: 20,
  },
})
