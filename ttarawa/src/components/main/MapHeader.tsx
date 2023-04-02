import { View, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import Input from '@components/common/Input'
import IconButton from '@components/common/IconButton'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { map } from '@styles/main'

import { color } from '@styles/GlobalStyles'
import { departState, destinState } from '@store/atoms'

import Categories from '@components/main/Categories'
import SearchPath from '~/screens/main/SearchPath'

interface Props {
  navigation: NavigationProp<any>
  noneButton?: boolean
}

export default function MapHeader({ noneButton, navigation }: Props) {
  const [depart, setDepart] = useRecoilState(departState)
  const [destin, setDestin] = useRecoilState(destinState)

  return (
    <View style={map.headerContainer}>
      <View style={map.header}>
        <View style={map.inputs}>
          <Input
            label="출발 |"
            value={depart.name}
            setValue={setDepart}
            disabled={noneButton}
          />
          <Input
            label="도착 |"
            value={destin.name}
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
            press={() => navigation.navigate(SearchPath)}
            style={
              depart.name && destin.name
                ? { container: { backgroundColor: color.primary } }
                : undefined
            }
          />
        )}
      </View>
      {!noneButton && <Categories style={map.buttons} />}
    </View>
  )
}
