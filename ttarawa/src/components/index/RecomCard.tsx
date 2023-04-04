import { StyleSheet, View, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { color } from '@styles/GlobalStyles'
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { ReactNode } from 'react'
import { destinState } from '@store/atoms'
import { useSetRecoilState } from 'recoil'

interface Props {
  name: string
  lat: number
  lng: number
  distance: number
  visit: number
  category: number
  navigation: NavigationProp<any>
}

export default function RecomCard({
  name,
  lat,
  lng,
  distance,
  visit,
  category,
  navigation,
}: Props) {
  const setDestin = useSetRecoilState(destinState)
  // 여행시작으로 가는 함수 만들어야함 (지도 만들고 난 뒤)
  const goMap = async () => {
    setDestin({ name, lat, lng })

    // Tabs 안에 있는 Main의 SearchPath로 이동
    await navigation.navigate('Tabs', {
      screen: 'Main',
      params: {
        screen: 'SearchPath',
      },
    })
  }

  const categoryTable: ReactNode[] = [
    <Feather name="coffee" size={18} color={color.black} />,
    <MaterialIcons name="restaurant" size={18} color={color.gray} />,
    <FontAwesome5 name="landmark" size={18} color={color.secondary} />,
  ]

  return (
    <View style={styles.card}>
      <View style={styles.icon}>{categoryTable[category]}</View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.distance}>주행거리: 약 {distance}km</Text>
        <Text style={styles.distance}>
          최근 <Text style={styles.cnt}>{visit}</Text>명 방문
        </Text>
      </View>
      <IconButton
        type="secondary"
        dir="left"
        text="여행 시작"
        press={goMap}
        icon1={
          <MaterialIcons
            name="directions-bike"
            size={20}
            color={color.primary}
          />
        }
      ></IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: color.white,
    alignItems: 'center',
    borderRadius: 13,
    padding: 10,
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    alignSelf: 'flex-end',
  },

  name: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cnt: {
    fontWeight: '700',
  },
  distance: {
    fontSize: 14,
    paddingVertical: 2,
  },
})
