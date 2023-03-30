import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import FeedCard from '@components/common/FeedCard'

import { sns } from '@styles/sns'
import BottomSheet from '@components/common/BottomSheet'
import HistoryMenu from '@components/mypage/HistoryMenu'

import { convertToKm, convertToTime } from '@utils/caculator'

interface SnsData {
  historyId: number
  image: string // 주행기록
  personal: number | boolean // 공개여부
  favoritesCount: number // 좋아요 수
  isMyFavorite: number | boolean // 좋아요 여부  true: 1, false: 0
  time: number // 주행 시간
  distance: number // 주행 거리
  content: string // 내용
}

export default function SnsCard() {
  const [dataLst, setDataLst] = useState<SnsData[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  const datas: SnsData[] = [
    {
      historyId: 1,
      image: '@assets/riding.png',
      personal: 1,
      favoritesCount: 11,
      isMyFavorite: 1,

      time: 1800,
      distance: 3500,

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 2,
      image: '@assets/riding.png',
      personal: 0,
      favoritesCount: 12,
      isMyFavorite: 0, // true: 1, false: 0

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
        personal: data.personal === 1 ? true : false,
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

  // 공개 비공개
  const pressLock = (key: number) => {
    const updateData: SnsData[] = dataLst.map((data) => {
      if (data.historyId === key) {
        return {
          ...data,
          personal: !data.personal,
        }
      }
      return data
    })
    setDataLst(updateData)
  }

  // 하단 네브바 생성
  const pressMenu = () => {
    setModalVisible(true)
  }

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
              imagePath={require('@assets/riding.png')}
              isLock={item.personal}
              pressLock={pressLock}
              likes={item.favoritesCount}
              isLike={item.isMyFavorite}
              pressLike={pressLike}
              distence={distance}
              time={time}
              content={item.content}
              pressMenu={pressMenu}
            />
          )
        }}
        keyExtractor={(item) => item.historyId.toString()}
        // 스크롤 감추기
        showsVerticalScrollIndicator={false}
      />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={<HistoryMenu />}
      />
    </View>
  )
}
