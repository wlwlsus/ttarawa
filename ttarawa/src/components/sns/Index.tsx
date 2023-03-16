import { StyleSheet, View } from 'react-native'
import SNSCard from '@components/common/SNSCard'
import { color } from '@styles/GlobalStyles'

export default function SNS() {
  // axios

  interface SnsData {
    historyId: number
    profile: string // 프로필 이미지 주소
    nickname: string
    badgeName: string // Ranking
    image: string // 주행기록
    favoritesCount: number // 좋아요 수
    isMyFavorite: number // 좋아요 여부  true: 1, false: 0
    time: string // 주행 시간
    distance: string // 주행 거리
    content: string // 내용
    startAddress?: string // 출발지 주소
    endAddress?: string // 도착지 주소
  }

  const datas: SnsData[] = [
    {
      historyId: 1,

      profile: '@assets/profile.png',
      nickname: '열정라이더따옹이',
      badgeName: 'racer',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1,

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 2,

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
      historyId: 3,

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
      historyId: 4,

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
      {datas.map((data) => {
        const isLike: boolean = data.isMyFavorite == 1 ? true : false

        return (
          <SNSCard
            key={data.historyId}
            userImg={require(data.profile)}
            userName={data.nickname}
            // rank={`@assets/${data.badgeName}.png`}
            // rank={require(`@assets/${data.badgeName}.png`)}
            // imagepath={data.image}
            likeNum={data.favoritesCount}
            isLike={isLike}
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
