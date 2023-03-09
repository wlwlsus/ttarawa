import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

function IconButton(props: {
  text: string
  press: (params: any) => any
  dir?: string // direction
  icon1?: string | undefined
  icon2?: string | undefined
  style: string
}) {

  const btnStyle: object =
    props.style === 'skyBtn'? 
      styles.skyBtn
      : props.style === 'blutBtn'?
      styles.blueBtn :
      
  
  return (
    <Pressable
      style={[styles.ButtonWrapper, props.dir == 'left' ? styles.left : null]}
      onPress={props.press}
    >
      {props.icon1}
      {props.text && <Text style={styles.btnText}>{props.text}</Text>}
      {props.icon2}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  ButtonWrapper: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: 'grey',
  },
})

export default IconButton
