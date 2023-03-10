import { StyleSheet, View, Text, Image } from 'react-native'
import { color } from '@styles/GlobalStyles'

export default function Card(props: {
  imagepath?: string
  likes?: string
  content?: string
}) {
  const imagePath = require('./riding.png')

  return (
    <View style={styles.container}>
      <Image source={imagePath} />
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <Text style={styles.likeText}>{props.likes}명</Text>
        <Text style={styles.contentText}>이 이 코스를 좋아합니다</Text>
      </View>
      <Text style={styles.contentText}>{props.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderRadius: 20,
    flexDirection: 'column',
    alignContent: 'center',
  },
  imageCard: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  likeText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 20,
  },
})
