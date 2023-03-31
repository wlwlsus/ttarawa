import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import FeedCard from '@components/common/FeedCard'

import { sns } from '@styles/sns'
import BottomSheet from '@components/common/BottomSheet'
import HistoryMenu from '@components/mypage/HistoryMenu'

import user from '@services/user'
import snsaxios from '@services/sns'
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

  useEffect(() => {
    // axios
    user.fetchRide(0).then((res) => {
      // console.log(res)
      const newData: SnsData[] = res.map((data) => {
        return {
          ...data,
          isMyFavorite: data.isMyFavorite === 1 ? true : false,
          personal: data.personal === 1 ? true : false,
        }
      })
      setDataLst(newData)
    })
  }, [])

  const pressLike = (key: number) => {
    // const check = dataLst.find((data) => data.historyId === key)
    snsaxios
      .saveLike(key)
      .then(() => {
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
      })
      .catch((err) => {
        console.log(err)
      })
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
              imagePath={item.image}
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
        pagingEnabled={true}
      />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={<HistoryMenu />}
      />
    </View>
  )
}
