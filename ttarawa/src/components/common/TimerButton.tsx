import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function TimerButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
