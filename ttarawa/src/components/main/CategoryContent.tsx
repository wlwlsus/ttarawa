import { StyleSheet, Text, View, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'

interface Props {
  title: string
  distance: number
  address: string
}

export default function CategoryContent({ title, distance, address }: Props) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.distance}>{distance}km</Text>
      </View>
      <View>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  distance: { fontSize: 15, color: color.primary },
  address: {},
})
