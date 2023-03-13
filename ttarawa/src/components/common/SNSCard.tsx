import { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { color } from '@styles/GlobalStyles'
// import getImageSize from '@utils/getSize'
import IconButton from './IconButton'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Label from './Label'


export default function Card(props: {
  imagepath?: (params: any) => any   // require()  >>  image url 함수
  likes?: string                     // 좋아요 수
  content?: string                   // 내용
  isLike?: boolean                   // 좋아요 누른 여부
  distence?: string                  // 주행거리  ex) 3.5 km
  hour?: string                      // 주행시간  ex) 30분
  userName?: string
  profileImage?: (params: any) => any
  rank?: (params: any) => any
}) {

  // 내용 띄어쓰기를 위한
  const contentText = props.content?.replace(/(!!|\?|\.)/g, '$&\n')

  const distanceText = `주행 거리 : ${props.distence}`
  const hourText = `주행 시간 : ${props.hour}`
  
  // 좋아요 여부 저장 변수 (props로 넘길???)
  const [like, setLike] = useState(props.isLike === 'true' ? true : false)

  return (
    <View>
      {/* ID, Profile */}
      <View style={styles.rowSort}>
        {/* <Image source={props.profileImage} style={{width: 30}} /> */}
        <Text>{props.userName}</Text>
        <Image source={props.rank} />
      </View>
      
      <View style={styles.container}>
        {/* 경로 이미지 */}
        <Image source={props.imagepath} style={styles.imageCard} />

        {/*  like */}
        <View style={styles.rowSort}>
          <View style={styles.rowSort}>
            <IconButton
              icon1={
                <MaterialIcons
                  name="local-fire-department"
                  size={24}
                  color= {like ? "crimson" : "black"}   // 좋아요 누르면, 색 변환
                />
              }
              press={() => {setLike(!like)}}    // 누르면, true <-> false 함수
            />
            <Text style={styles.likeText}>{props.likes}명</Text>
            <Text style={styles.contentText}>
              이 이 코스를 달리고 싶어합니다.
            </Text>
          </View>
          
          {/* 공유 && 수정 아이콘 */}
          <View style={{ paddingHorizontal: 10 }}>
            {props.userID ? (
              // SNS 공유 아이콘
              <IconButton 
                icon1={
                  <Ionicons name="paper-plane-outline" size={24} color="black" />
                }
                // press
              />
            ) : (
              // 수정 아이콘
              <IconButton 
                icon1={
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="black"
                  />
                }
                // press
              />
            )}
          </View>
        </View>

        {/* Label */}
        <View style={styles.labelSort}>
          <Label text={distanceText} />
          <Label text={hourText} />
        </View>
        
        {/* 내용 */}
        <Text style={styles.contentText}>{contentText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderRadius: 20,
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
  },

  labelSort: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
})
