import { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
// import FastImage from 'react-native-fast-image'
import FastImage from 'expo-fast-image'
import { color } from '@styles/GlobalStyles'
// import getImageSize from '@utils/getSize'
import Label from '@components/common/Label'
import IconButton from '@components/common/IconButton'
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons'

interface Props {
  historyId: number
  // User Info
  userName: string
  userImg: (params: any) => any
  // rank: string
  rank: (params: any) => any

  // 경로 이미지
  imagepath: (params: any) => any // require()  >>  image url 함수

  // 공개 여부
  isLock: boolean
  pressLock?: (params: any) => any // 공개, 비공개 전환 함수

  // 좋아요
  likes: number // 좋아요 수
  isLike: number | boolean // 좋아요 누른 여부
  pressLike: (params: any) => any // 좋아요 전환 함수

  // 공유 함수
  pressShare?: (params: any) => any

  // 수정메뉴 함수
  pressMenu?: (params: any) => any

  distence: string // 주행거리  ex) 3.5 km
  time: string // 주행시간  ex) 30분

  // 내용
  content: string
}

export default function FeedCard({
  historyId,

  userName,
  userImg,
  rank,

  imagepath,

  isLock,
  // presslock,

  likes,
  isLike,
  pressLike,

  // pressShare,
  // pressMenu,

  distence,
  time,

  content,
}: Props) {
  // 내용 띄어쓰기를 위한
  const contentText = content?.replace(/(!!|\?|\.)/g, '$&\n')

  const distanceText = `주행 거리 : ${distence}`
  const timeText = `주행 시간 : ${time}`

  // setLikes(isLike)
  // setLikeNum(likes)

  // // 좋아요 여부 저장 변수 (props로 넘길???)
  // const [like, setLike] = useState(isLike)

  // // 좋아요 수 변수
  // const [likeNum, setLikeNum] = useState(likes)

  // const checklike = () => {
  //   setLike(!like)
  //   like ? setLikeNum(likeNum - 1) : setLikeNum(likeNum + 1)
  // }

  // 공개, 비공개 여부 변수
  const [lock, setLock] = useState(isLock)

  const checklock = () => {
    setLock(!lock)
  }

  return (
    <View style={styles.cardContainer}>
      {/* ID, Profile */}
      {userName ? (
        <View style={styles.userInfo}>
          <View style={styles.imgContainer}>
            <Image source={userImg} style={styles.userImg} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Image source={rank} />
        </View>
      ) : null}

      {/* 경로 이미지 */}
      <View>
        <Image source={imagepath} style={styles.cardImg} />
        {userName ? null : (
          <View style={styles.lock}>
            <IconButton
              icon1={
                lock ? (
                  <Fontisto name="locked" size={24} color="black" />
                ) : (
                  <Fontisto name="unlocked" size={24} color="black" />
                )
              }
              press={checklock}
            />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        {/*  like */}
        <View style={styles.likeContainer}>
          <View style={styles.like}>
            <IconButton
              icon1={
                <Ionicons
                  name="heart-sharp"
                  size={35}
                  color={isLike ? 'crimson' : 'black'} // 좋아요 누르면, 색 변환
                />
              }
              press={() => {
                pressLike(historyId)
              }} // 누르면, true <-> false 함수
            />
            <Text style={styles.likeNum}>{likes}명</Text>
            <Text style={styles.contentText}>
              이 이 코스를 달리고 싶어합니다.
            </Text>
          </View>

          {/* userName 유무에 따라 공유 or 수정 아이콘 */}

          <View>
            {userName ? (
              <IconButton
                icon1={
                  <Ionicons
                    name="paper-plane-outline"
                    size={24}
                    color="black"
                  />
                }
                // press
              />
            ) : (
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
        <View style={styles.label}>
          <Label text={distanceText} />
          <Label text={timeText} />
        </View>

        {/* 내용 */}
        <Text ellipsizeMode="tail" numberOfLines={5} style={styles.cardText}>
          {contentText}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
    // marginVertical: 10,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  imgContainer: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.secondary,
  },

  userImg: {
    margin: 5,
    width: 40,
    height: 40,
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardImg: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  lock: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  cardContent: {
    backgroundColor: color.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    flex: 0.55,

    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  likeNum: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },

  contentText: {
    fontSize: 15,
  },

  label: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
  },

  cardText: {
    marginVertical: 10,
    fontSize: 15,
    flex: 1,
  },
})
