import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import { color } from '@styles/GlobalStyles'

export default function PathContent({ navigation, time, distance }) {
  return (
    <View style={styles.container}>
      <View style={styles.route}>
        <IconButton
          icon1={
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={color.primary}
            />
          }
          press={() => {
            navigation.pop()
          }}
        />

        <Text style={styles.title}>추천경로</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
    gap: 10,
  },
  route: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    paddingRight: 40,
  },
  time: {
    fontSize: 22,
    color: color.primary,
    fontWeight: 'bold',
    marginRight: 10,
  },
  distance: {
    fontSize: 17,
  },
})
