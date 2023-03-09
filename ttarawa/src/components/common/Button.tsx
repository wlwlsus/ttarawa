import { StyleSheet } from 'react-native'
import { View, Text, Pressable } from 'react-native'

import { color } from '../../styles/GlobalStyles'

export default function Button(props: {
  text: string
  style: string
  press: (params: any) => any // type check off (수정 필요)
}) {
  const btnStyle: [object, object] =
    props.style === 'blue'
      ? [styles.blueBtn, styles.blueBtnText]
      : props.style === 'white'
      ? [styles.whiteBtn, styles.whiteBtnText]
      : [styles.tabBtn, styles.tabBtnText]

  return (
    <Pressable hitSlop={50} onPress={props.press}>
      <View style={btnStyle[0]}>
        <Text style={btnStyle[1]}>{props.text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  blueBtn: {
    backgroundColor: color.primary,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  blueBtnText: {
    textAlign: 'center',
    color: color.white,
    fontSize: 25,
    fontWeight: '600',
  },

  whiteBtn: {
    backgroundColor: color.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  whiteBtnText: {
    textAlign: 'center',
    color: color.primary,
    fontSize: 25,
    fontWeight: '600',
  },

  tabBtn: {
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 5,
  },

  tabBtnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
})
