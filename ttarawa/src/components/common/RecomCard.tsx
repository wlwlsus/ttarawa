import { View, Text } from 'react-native'
import { color } from '@styles/GlobalStyles'
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { recom } from '@styles/index'

export default function RecomCard(props: {
  name: string
  distance: number
  visit: number
  categoryId: number
}) {
  // 여행시작으로 가는 함수 만들어야함 (지도 만들고 난 뒤 아마 출발지, 목적지 등등 가지고가면될듯)
  const GOmap = () => {
    // console.log(props.name, '으로 출발')
  }

  const categoryTable: {
    1: Element
    2: Element
    3: Element
    4: Element
  } = {
    1: <Feather name="coffee" size={20} color={color.gray} />,
    2: <MaterialIcons name="restaurant" size={20} color={color.gray} />,
    3: (
      <MaterialCommunityIcons
        name="ferris-wheel"
        size={20}
        color={color.gray}
      />
    ),
    4: <FontAwesome5 name="restroom" size={18} color={color.red} />,
  }

  return (
    <View style={recom.card}>
      <>
        <View style={recom.icon}>{categoryTable[props.categoryId]}</View>
        <Text style={recom.name}>{props.name}</Text>
        <View style={recom.cardBody}>
          <Text style={recom.distance}>주행거리: 약 {props.distance}km</Text>
          <Text style={recom.distance}>
            최근 <Text style={recom.cnt}>{props.visit}</Text>명 방문
          </Text>
        </View>
        <IconButton
          style={'skyBtn'}
          dir={'left'}
          text={'여행 시작'}
          press={GOmap}
          nonShadow={false}
          icon1={
            <MaterialCommunityIcons
              name="bike"
              size={20}
              color={color.primary}
            />
          }
        ></IconButton>
      </>
    </View>
  )
}
