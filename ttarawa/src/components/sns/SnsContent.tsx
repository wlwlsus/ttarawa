import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import FeedCard from '@components/common/FeedCard'
import { color } from '@styles/GlobalStyles'
import { sns } from '@styles/sns'
import { convertToKm, convertToTime } from '@utils/caculator'

export default function SnsContent() {
  interface SnsData {
    historyId: number
    profile: string // 프로필 이미지 주소
    nickname: string
    badgeImg: string
    image: string // 주행기록
    favoritesCount: number // 좋아요 수
    isMyFavorite: number | boolean // 좋아요 여부  true: 1, false: 0
    time: number // 주행 시간
    distance: number // 주행 거리
    content: string // 내용
    startAddress?: string // 출발지 주소
    endAddress?: string // 도착지 주소
  }

  const [dataLst, setDataLst] = useState<SnsData[]>([])

  const datas: SnsData[] = [
    {
      historyId: 1,

      profile: '@assets/profile.png',
      nickname: '열정라이더따옹이',
      badgeImg: '@assets/rank/amateur.png',
      image: '@assets/riding.png',

      favoritesCount: 11,
      isMyFavorite: 1,

      time: 1800,
      distance: 3500,

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 2,

      profile: '@assets/profile.png',
      nickname: '달려라예지',
      badgeImg: '@assets/rank/beginner.png',
      image: '@assets/riding.png',

      favoritesCount: 12,
      isMyFavorite: 0, // true: 1, false: 0

      time: 1800,
      distance: 3500,

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 3,

      profile: '@assets/profile.png',
      nickname: '따르릉예지',
      badgeImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRroBwNcmJFu3Q7gjYq18s9vaaY8-QTbOW5_Q&usqp=CAU',
      image: '@assets/riding.png',

      favoritesCount: 13,
      isMyFavorite: 1, // true: 1, false: 0

      time: 18000,
      distance: 35000,

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 4,

      profile: '@assets/profile.png',
      nickname: '예지경주마',
      badgeImg:
        'https://contents.sixshop.com/uploadedFiles/84218/default/image_1547035192141.jpg',
      image: '@assets/riding.png',

      favoritesCount: 14,
      isMyFavorite: 1, // true: 1, false: 0

      time: 7800,
      distance: 35400,

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
  ]

  useEffect(() => {
    // axios
    const newData: SnsData[] = datas.map((data) => {
      return {
        ...data,
        isMyFavorite: data.isMyFavorite === 1 ? true : false,
      }
    })
    setDataLst(newData)
  }, [])

  const pressLike = (key: number) => {
    // const check = dataLst.find((data) => data.historyId === key)

    const updateData: SnsData[] = dataLst.map((data) => {
      if (data.historyId === key) {
        return {
          ...data,
          isMyFavorite: !data.isMyFavorite,
          favoritesCount: data.isMyFavorite
            ? data.favoritesCount - 1
            : data.favoritesCount + 1,
        }
      }
      return data
    })

    setDataLst(updateData)
  }

  // console.log(dataLst)
  return (
    <View style={sns.container}>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const distance = convertToKm(item.distance)
          const time = convertToTime(item.time)

          return (
            <FeedCard
              historyId={item.historyId}
              // userImg={item.profile}
              userImg={require('@assets/profile.png')}
              userName={item.nickname}
              rank={require('@assets/rank/beginner.png')}
              // rank={require(rank)}
              imagePath={require('@assets/riding.png')}
              likes={item.favoritesCount}
              isLike={item.isMyFavorite}
              distence={distance}
              time={time}
              content={item.content}
              pressLike={pressLike}
            />
          )
        }}
        keyExtractor={(item) => item.historyId.toString()}
        // 끝에까지 닿았다면?
        onEndReached={() => console.log('End reached')}
        onEndReachedThreshold={0.1} // 밑으로 내리는 거 몇 초 했는지?
        // 하나씩 넘기기
        pagingEnabled={true}
        // 스크롤 감추기
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
