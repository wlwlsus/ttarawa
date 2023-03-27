import { View, Text } from 'react-native'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import Input from '@components/common/Input'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { map } from '@styles/main'

import { color } from '@styles/GlobalStyles'
import { departState, destinState } from '~/store/atoms'

import Categories from '@components/main/Categories'

export default function MapHeader() {
  const [depart, setDepart] = useRecoilState(departState)
  const [destin, setDestin] = useRecoilState(destinState)

  useEffect(() => {
    console.log(destin)
  }, [destin])

  return (
    <View style={map.headerContainer}>
      <View style={map.header}>
        <View style={map.inputs}>
          <Input label="출발 |" value={depart.title} setValue={setDepart} />
          <Input label="도착 |" value={destin.title} setValue={setDestin} />
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
      <Categories />
    </View>
  )
}
