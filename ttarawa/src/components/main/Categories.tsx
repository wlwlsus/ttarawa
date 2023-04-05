import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import Button from '@components/common/Button'

import { useRecoilState, useRecoilValue } from 'recoil'
import { markerListState } from '~/store/atoms'

import { color } from '@styles/GlobalStyles'
import main from '@services/main'
import { departState } from '@store/atoms'

import getRentalSpot from '@utils/getRentalSpot'

export default function Categories({ style, route }) {
  const [pressed, setPressed] = useState<number>(0) // 카테고리 넘버
  const [markerList, setMarkerList] = useRecoilState(markerListState)
  const depart = useRecoilValue(departState)

  const hideMark = route.name // NaviPath가 아니면 숨기기

  // 눌린 버튼 스타일
  const isPressed = {
    container: { backgroundColor: color.secondary },
    txt: { color: color.primary },
  }

  // 따릉이
  const showRental = async () => {
    const spotList = await getRentalSpot(depart.lat, depart.lng)
    setMarkerList(spotList)
  }

  // 음식점, 카페, 관광지, 화장실
  const showInfo = () => {
    setMarkerList([]) // markerList 초기화 (spotId 때문)
    main
      .fetchDestin(Number(pressed), 0, 10, depart.lat, depart.lng)
      .then((res) => {
        // console.log(res)
        setMarkerList(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (pressed === 0) {
      showRental()
    } else {
      showInfo()
    }
  }, [pressed])

  return (
    <View style={style}>
      <Button
        text="대여소"
        style={pressed === 0 ? isPressed : undefined}
        type="tab"
        press={() => setPressed(0)}
      />
      <Button
        text="음식점"
        style={pressed === 1 ? isPressed : undefined}
        type="tab"
        press={() => setPressed(1)}
      />
      <Button
        text="카페"
        style={pressed === 2 ? isPressed : undefined}
        type="tab"
        press={() => setPressed(2)}
      />
      <Button
        text="관광지"
        style={pressed === 3 ? isPressed : undefined}
        type="tab"
        press={() => setPressed(3)}
      />
      <Button
        text="화장실"
        style={pressed === 4 ? isPressed : undefined}
        type="tab"
        press={() => setPressed(4)}
      />
      {!hideMark && (
        <Button
          text="숨기기"
          type="tab"
          press={() => {
            setMarkerList([]), setPressed(5)
          }}
        />
      )}
    </View>
  )
}
