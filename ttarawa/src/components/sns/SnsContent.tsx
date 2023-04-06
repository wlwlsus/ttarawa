import { View, FlatList } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import FeedCard from '@components/common/FeedCard'
import { color } from '@styles/GlobalStyles'
import { sns } from '@styles/sns'
import { convertToKm, convertToTime } from '@utils/caculator'
import snsaxios from '@services/sns'
import { snsParamsState, snsModal } from '@store/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

interface SnsData {
  userId?: number
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
  isMyHistory?: number
}

export default function SnsContent() {
  const { fetchPost, fetchPostRecom, saveLike, deleteLike } = snsaxios
  const [dataLst, setDataLst] = useState<SnsData[]>([])

  const setModalVisible = useSetRecoilState(snsModal)
  const [snsParams, setSnsParams] = useRecoilState(snsParamsState)

  const [page, setPage] = useState<number>(0)
  // let page: number = 0

  // 조회 axios 함수
  const getData = (params: string, page: number) => {
    fetchPost(params, page)
      .then((res) => {
        const newData: SnsData[] = res?.map((data) => {
          return {
            ...data,
            isMyFavorite: data.isMyFavorite === 1 ? true : false,
          }
        })
        setDataLst(newData)
        setModalVisible(false)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (typeof params === 'string') {
      getData(params, page)
    } else {
      const { lat, lng } = params

      fetchPostRecom(10, lat, lng)
        .then((res) => {
          const newData: SnsData[] = res.map((data) => {
            return {
              ...data,
              isMyFavorite: data.isMyFavorite === 1 ? true : false,
            }
          })
          setDataLst(newData)
          setModalVisible(false)
        })
        .catch((err) => console.log(err))
    }
  }, [params])

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

  // 캡쳐한 화면 공유
  const myRef = useRef(null)
  const sharePost = async () => {
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

  return (
    <View style={sns.container} ref={myRef}>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const distance = convertToKm(item.distance)
          const time = convertToTime(item.time)
          return (
            <FeedCard
              userImg={item.profile}
              userName={item.nickname}
              rank={item.badgeImg}
              imagePath={item.image}
              likes={item.favoritesCount}
              isLike={item.isMyFavorite}
              distence={distance}
              time={time}
              content={item.content}
              pressLike={() => pressLike(item.historyId)}
              pressShare={sharePost}
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
