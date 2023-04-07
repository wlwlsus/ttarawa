import { View, FlatList, Keyboard } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import FeedCard from '@components/common/FeedCard'

import { sns } from '@styles/sns'
import BottomSheet from '@components/common/BottomSheet'
import HistoryMenu from '@components/mypage/HistoryMenu'

import user from '@services/user'
import snsaxios from '@services/sns'
import { convertToKm, convertToTime } from '@utils/caculator'

import { useRecoilState } from 'recoil'
import { historyParams } from '@store/atoms'

import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

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
  const [isEditMode, setIsEditMode] = useState(false)
  const [contentText, setContentText] = useState('')

  useEffect(() => {
    // axios
    user.fetchRide(0).then((res) => {
      // console.log(res)
      if (!res) return
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

  // 수정하기 클릭
  const pressUpdate = (key: number) => {
    const check = dataLst.find((data) => data.historyId === key)
    setModalVisible(false)
    setIsEditMode(true) // 수정모드 on
    setContentText(check.content) // contentText 저장
  }

  // 내용 수정하기
  const editContent = (key: number) => {
    const check = dataLst.find((data) => data.historyId === key)

    const personalNum = check?.personal ? 1 : 0

    updatePost(key, personalNum, contentText)
      .then(() => {
        Keyboard.dismiss()
        setIsEditMode(false)

        const updateData: FeedData[] = dataLst.map((data) => {
          if (data.historyId === key) {
            return {
              ...data,
              content: contentText,
            }
          }
          return data
        })
        setDataLst(updateData)
      })
      .catch((err) => console.log(err))
  }

  // 수정하기 취소
  const closeEdit = () => {
    setIsEditMode(false)
  }

  // 삭제하기
  const pressDelete = (key: number) => {
    deletePost(key)
      .then(() => {
        setDataLst(dataLst.filter((item) => item.historyId !== key))
        setModalVisible(false)
      })
      .catch((err) => console.log(err))
  }

  // 캡쳐한 화면 공유
  const myRef = useRef(null)
  const pressShare = async () => {
    setModalVisible(false)
    try {
      const result = await captureRef(myRef, {
        format: 'png',
        quality: 0.9,
      })
      await Sharing.shareAsync(result)
    } catch (error) {
      console.error('Error while taking screenshot and sharing: ', error)
    }
  }

  // 하단 네브바 생성
  const pressMenu = (key: number) => {
    setSelectedHistoryId(key)
    setModalVisible(true)
  }

  return (
    <View style={sns.container} ref={myRef}>
      {dataLst && (
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
                isEditMode={isEditMode}
                contentText={contentText}
                setContentText={setContentText}
                closeEdit={closeEdit}
                editContent={() => editContent(item.historyId)}
              />
            )
          }}
          keyExtractor={(item) => item.historyId.toString()}
          // 스크롤 감추기
          showsVerticalScrollIndicator={false}
        />
      )}
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={
          <HistoryMenu
            pressUpdate={() => pressUpdate(selectedHistoryId)}
            pressDelete={() => pressDelete(selectedHistoryId)}
            pressShare={pressShare}
          />
        }
      />
    </View>
  )
}
