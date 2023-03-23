import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'

import Input from '@components/common/Input'
import Button from '@components/common/Button'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { map } from '@styles/main'

import { color } from '@styles/GlobalStyles'

interface Props {
  depart: string
  destin: string
  setDepart: (params: string) => void
  setDestin: (params: string) => void
}

export default function MapHeader({
  depart,
  setDepart,
  destin,
  setDestin,
}: Props) {
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
    <View style={map.headerContainer}>
      <View style={map.header}>
        <View style={map.inputs}>
          <Input label="출발 |" value={depart} setValue={setDepart} />
          <Input label="도착 |" value={destin} setValue={setDestin} />
        </View>
        <IconButton
          type="square"
          text="경로확인"
          icon1={
            <MaterialCommunityIcons
              name="map-outline"
              size={40}
              color={color.white}
            />
          }
          press={() => console.log('경로확인')}
          style={
            depart && destin
              ? { container: { backgroundColor: color.primary } }
              : undefined
          }
        />
      </View>
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
    </View>
  )
}
