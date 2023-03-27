// import { View, Text, SafeAreaView } from 'react-native'

// export default function MyHistory() {
//   return (
//     <SafeAreaView>
//       <Text>MyHistory</Text>
//     </SafeAreaView>
//   )
// }

import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import FeedCard from '@components/common/FeedCard'
import { color } from '@styles/GlobalStyles'
import { sns } from '@styles/sns'

export default function SnsCard() {
  interface SnsData {
    historyId: number
    image: string // 주행기록
    personal: number // 공개여부
    favoritesCount: number | boolean // 좋아요 수
    isMyFavorite: number | boolean // 좋아요 여부  true: 1, false: 0
    time: string // 주행 시간
    distance: string // 주행 거리
    content: string // 내용
  }

  const [dataLst, setDataLst] = useState<SnsData[]>([])

  const datas: SnsData[] = [
    {
      historyId: 1,
      image: '@assets/riding.png',
      personal: 1,
      favoritesCount: 11,
      isMyFavorite: 1,

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 2,
      image: '@assets/riding.png',
      personal: 0,
      favoritesCount: 12,
      isMyFavorite: 0, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

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
        personal: data.personal === 1 ? true : false,
      }
    })
    setDataLst(newData)
  }, [])

  const checkLike = (key: number) => {
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
          return (
            <FeedCard
              historyId={item.historyId}
              imagepath={require('@assets/riding.png')}
              isLock={item.personal}
              likes={item.favoritesCount}
              isLike={item.isMyFavorite}
              distence={item.distance}
              time={item.time}
              content={item.content}
              pressLike={checkLike}
            />
          )
        }}
        keyExtractor={(item) => item.historyId.toString()}
        // 끝에까지 닿았다면?
        onEndReached={() => console.log('End reached')}
        onEndReachedThreshold={0.1} // 밑으로 내리는 거 몇 초 했는지?
      />
    </View>
  )
}
