import { StyleSheet, View, Text, Image } from 'react-native'
import { color } from '@styles/GlobalStyles'
import getImageSize from '@utils/getSize'
import IconButton from './IconButton'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Label from './Label'

export default function Card(props: {
  imagepath?: string
  likes?: string
  content?: string
  isLike?: boolean
  distence?: string
  hour?: string
}) {
  const imagePath = require('@assets/riding.png')

  const inSns = true

  const contentText = props.content?.replace(/(!!|\?|\.)/g, '$&\n')

  const distanceText = `주행 거리 : ${props.distence}`
  const hourText = `주행 시간 : ${props.hour}`

  return (
    <View style={styles.container}>
      {/* {imagePath && <Image source={imagePath} style={styles.imageCard} />} */}
      <Image source={imagePath} style={styles.imageCard} />

      {/*  like */}
      <View style={styles.rowSort}>
        <View style={styles.rowSort}>
          <IconButton
            icon1={
              <MaterialIcons
                name="local-fire-department"
                size={24}
                color="crimson"
              />
            }
            // press=
          />
          <Text style={styles.likeText}>{props.likes}명</Text>
          <Text style={styles.contentText}>
            이 이 코스를 달리고 싶어합니다.
          </Text>
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {isSns ? (
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
          )}
        </View>
      </View>

      {/* Label */}
      <View style={styles.labelSort}>
        <Label text={distanceText} />
        <Label text={hourText} />
      </View>

      <Text style={styles.contentText}>{contentText}</Text>
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
  rowSort: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  imageCard: {
    borderRadius: 10,
    width: '100%',
    // aspectRatio: 'auto',
  },
  likeText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  contentText: {
    fontSize: 20,
    paddingVertical: 15,
    // justifyContent: 'center',
    // justify,
  },
  labelSort: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
})
