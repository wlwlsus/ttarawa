import { StyleSheet, View } from 'react-native'
import SNSCard from '@components/common/SNSCard'
import { color } from '@styles/GlobalStyles'

export default function SNS() {
  // axios
  // "historyId": Long,
  // "nickname": String,
  // "profile": String,(프로필 이미지 주소)
  // "badgeName": String,
  // "favoritesCount": int,
  // "isMyFavorite": 1,(내가 좋아요를 눌렀는지,0-안누름,1-누름)
  // "time": String,
  // "distance": String,
  // "image": String",
  // "content": String,
  // "startAddress":String(출발지 주소),
  // "endAddress": String(도착지 주소)

  const Data = [
    {
      profile: '@assets/profile.png',
      nickname: '열정라이더따옹이',
      badgeName: 'racer',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      profile: '@assets/profile.png',
      nickname: '달려라예지',
      badgeName: 'beginner',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      profile: '@assets/profile.png',
      nickname: '따르릉예지',
      badgeName: 'pro',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      profile: '@assets/profile.png',
      nickname: '예지경주마',
      badgeName: 'racer',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
  ]

  return (
    <View style={styles.snsContainer}>
      {Data.map((data) => {
        const isLike = data.isMyFavorite == 1 ? true : false
        const userImg = data.profile

        return (
          <SNSCard
            userImg={data.profile}
            userName={data.nickname}
            // rank={`@assets/rank/${data.badgeName}.png`}
            // imagepath={data.image}
            likeNum={data.favoritesCount}
            islike={isLike}
            distence={data.distance}
            time={data.time}
            content={data.content}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  snsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
