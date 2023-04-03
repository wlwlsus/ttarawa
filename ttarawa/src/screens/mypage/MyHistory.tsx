import { View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import FeedCard from '@components/common/FeedCard'

import { sns } from '@styles/sns'
import BottomSheet from '@components/common/BottomSheet'
import HistoryMenu from '@components/mypage/HistoryMenu'

import user from '@services/user'
import snsaxios from '@services/sns'
import { convertToKm, convertToTime } from '@utils/caculator'

import { useRecoilState } from 'recoil'
import { historyParams } from '@store/atoms'

interface FeedData {
  historyId: number
  image: string // 주행기록
  personal: number | boolean // 공개여부
  favoritesCount: number // 좋아요 수
  isMyFavorite: number | boolean // 좋아요 여부  true: 1, false: 0
  time: number // 주행 시간
  distance: number // 주행 거리
  content: string // 내용
}

export default function MyHistory() {
  const [dataLst, setDataLst] = useState<FeedData[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedHistoryId, setSelectedHistoryId] = useState(null)
  const { saveLike, deleteLike, updatePost, deletePost } = snsaxios

  useEffect(() => {
    // axios
    user.fetchRide(0).then((res) => {
      // console.log(res)
      const newData: FeedData[] = res.map((data) => {
        return {
          ...data,
          isMyFavorite: data.isMyFavorite === 1 ? true : false,
          personal: data.personal === 1 ? true : false,
        }
      })
      setDataLst(newData)
    })
    setModalVisible(false)
  }, [])

  const pressLike = (key: number) => {
    const check = dataLst.find((data) => data.historyId === key)

    // 좋아요를 하려면, saveLike,
    // 좋아요를 제거하려면, deleteLike, 함수를 axios로 연결
    const axios: (params: any) => any = !check?.isMyFavorite
      ? saveLike(key)
      : deleteLike(key)

    // 위의 axios 함수 불러옴.
    axios
      .then(() => {
        const updateData: FeedData[] = dataLst.map((data) => {
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
    const check = dataLst.find((data) => data.historyId === key)

    const personalNum = check?.personal ? 0 : 1

    updatePost(key, personalNum, check.content)
      .then((res) => {
        const updateData: FeedData[] = dataLst.map((data) => {
          if (data.historyId === key) {
            return {
              ...data,
              personal: !data.personal,
            }
          }
          return data
        })
        setDataLst(updateData)
      })
      .catch((err) => console.log(err))
  }

  const pressUpdate = (key: number) => {
    // console.log(key)
    console.log('수정')
    setModalVisible(false)
  }

  const pressDelete = (key: number) => {
    deletePost(key)
      .then(() => {
        setDataLst(dataLst.filter((item) => item.historyId !== key))
        setModalVisible(false)
      })
      .catch((err) => console.log(err))
  }

  const pressShare = (key: number) => {
    // console.log(key)
    console.log('공유')
    setModalVisible(false)
  }

  // 하단 네브바 생성
  const pressMenu = (key: number) => {
    setSelectedHistoryId(key)
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
              imagePath={item.image}
              isLock={item.personal}
              pressLock={() => pressLock(item.historyId)}
              likes={item.favoritesCount}
              isLike={item.isMyFavorite}
              pressLike={() => pressLike(item.historyId)}
              distence={distance}
              time={time}
              content={item.content}
              pressMenu={() => pressMenu(item.historyId)}
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
        children={
          <HistoryMenu
            pressUpdate={() => pressUpdate(selectedHistoryId)}
            pressDelete={() => pressDelete(selectedHistoryId)}
            pressShare={() => pressShare(selectedHistoryId)}
          />
        }
      />
    </View>
  )
}
