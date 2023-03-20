import { StyleSheet, View, Text } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { ReactNode } from 'react'

interface Props {
  name: string
  distance: number
  visit: number
  category: number
}

export default function RecomCard({ name, distance, visit, category }: Props) {
  // 여행시작으로 가는 함수 만들어야함 (지도 만들고 난 뒤)
  const goMap = () => {
    console.log(name)
  }

  const categoryTable: ReactNode[] = [
    <Feather name="coffee" size={18} color={color.gray} />,
    <MaterialIcons name="restaurant" size={18} color={color.gray} />,
    <FontAwesome5 name="landmark" size={18} color={color.green} />,
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
            size={22}
            color={color.primary}
          />
        }
      ></IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 162,
    backgroundColor: color.white,
    alignItems: 'center',
    borderRadius: 13,
    margin: 11,
    padding: 10,
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
    marginBottom: 10,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 3,
  },
  cnt: {
    fontWeight: '700',
  },
  distance: {
    fontSize: 14,
    paddingVertical: 2,
  },
})
