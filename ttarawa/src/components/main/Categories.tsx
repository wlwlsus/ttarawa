import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'

import Input from '@components/common/Input'
import Button from '@components/common/Button'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { map } from '@styles/main'

import { color } from '@styles/GlobalStyles'

export default function Categories() {
  const [pressed, setPressed] = useState<Number>()

  const isPressed = {
    container: { backgroundColor: color.secondary },
    txt: { color: color.primary },
  }

  // 선택한 카테고리 정보 지도에 표시
  const showInfo = (categoryId: Number) => {
    setPressed(categoryId)
  }

  return (
    <View style={map.buttons}>
      <Button
        text="대여소"
        style={pressed === 0 ? isPressed : undefined}
        type="tab"
        press={() => showInfo(0)}
      />
      <Button
        text="음식점"
        style={pressed === 1 ? isPressed : undefined}
        type="tab"
        press={() => showInfo(1)}
      />
      <Button
        text="카페"
        style={pressed === 2 ? isPressed : undefined}
        type="tab"
        press={() => showInfo(2)}
      />
      <Button
        text="관광지"
        style={pressed === 3 ? isPressed : undefined}
        type="tab"
        press={() => showInfo(3)}
      />
      <Button
        text="화장실"
        style={pressed === 4 ? isPressed : undefined}
        type="tab"
        press={() => showInfo(4)}
      />
    </View>
  )
}
