import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import Button from '@components/common/Button'

import { map } from '@styles/main'
import { useRecoilState } from 'recoil'
import { markerListState } from '~/store/atoms'

import { color } from '@styles/GlobalStyles'
import main from '~/services/main'

export default function Categories() {
  const [pressed, setPressed] = useState<Number>(3)
  const [markerList, setMarkerList] = useRecoilState(markerListState)

  const isPressed = {
    container: { backgroundColor: color.secondary },
    txt: { color: color.primary },
  }

  // 선택한 카테고리 정보 지도에 표시
  const showInfo = (categoryId: Number) => {
    setPressed(categoryId)
  }

  // Todo: 현재 위치 가져와야 함
  const latitude = 37.4979
  const longitude = 127.0276

  useEffect(() => {
    main
      .fetchDestin(Number(pressed), 0, 10, latitude, longitude)
      .then((res) => {
        setMarkerList(res)
      })
      .catch((err) => console.log(err))
  }, [pressed])

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
