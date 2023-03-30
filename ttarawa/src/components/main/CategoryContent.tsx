import { StyleSheet, Text, View, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'

interface Props {
  title: string
  distance: number
  address: string
  spotNum: string
}

export default function CategoryContent({
  title,
  distance,
  address,
  spotNum,
}: Props) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {distance && <Text style={styles.distance}>{distance}km</Text>}
      </View>
      <View>
        {address && <Text>{address}</Text>}
        {spotNum && (
          <Text style={styles.spotNum}> 따릉이 대여소 번호 : {spotNum}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    marginLeft: 5,
    fontSize: 15,
    color: color.primary,
  },
  spotNum: {
    fontSize: 16,
  },
})
