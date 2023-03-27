import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'

import Input from '@components/common/Input'
import Button from '@components/common/Button'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { map } from '@styles/main'

import { color } from '@styles/GlobalStyles'

import Categories from '@components/main/Categories'

interface Props {
  depart: string
  destin: string
  setDepart: (params: string) => void
  setDestin: (params: string) => void
  noneButton?: boolean
}

export default function MapHeader({
  depart,
  setDepart,
  destin,
  setDestin,
  noneButton,
}: Props) {
  return (
    <View style={map.headerContainer}>
      <View style={map.header}>
        <View style={map.inputs}>
          <Input
            label="출발 |"
            value={depart}
            setValue={setDepart}
            disabled={noneButton}
          />
          <Input
            label="도착 |"
            value={destin}
            setValue={setDestin}
            disabled={noneButton}
          />
        </View>
        {!noneButton && (
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
        )}
      </View>
      {!noneButton && <Categories />}
    </View>
  )
}
