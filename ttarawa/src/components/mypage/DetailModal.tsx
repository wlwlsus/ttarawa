import { useEffect, useState, useRef } from 'react'
import { View, Modal, Pressable } from 'react-native'
import FeedCard from '@components/common/FeedCard'
import { convertToKm, convertToTime } from '@utils/caculator'
import { color } from '@styles/GlobalStyles'
import { detailModal } from '@styles/myPage'
// import snsaxios from '@services/sns'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

interface ModalProps {
  visible: boolean
  onClose: () => void
  data: {
    userId?: number
    historyId: number
    profile: string // 프로필 이미지 주소
    nickname: string
    badgeImg: string
    image: string // 주행기록
    favoritesCount: number // 좋아요 수
    isMyFavorite: number // 좋아요 여부  true: 1, false: 0
    time: number // 주행 시간
    distance: number // 주행 거리
    content: string // 내용
    startAddress?: string // 출발지 주소
    endAddress?: string // 도착지 주소
    isMyHistory?: number
  } // FeedCard에 전달할 데이터
}

export default function DetailModal({ visible, onClose, data }: ModalProps) {
  const [modalVisible, setModalVisible] = useState(visible)
  // const { saveLike, deleteLike } = snsaxios

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])

  const distance = convertToKm(data.distance)
  const time = convertToTime(data.time)

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
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={detailModal.cardContainer}
        onPress={() => {
          setModalVisible(false)
          onClose()
        }}
      >
        <View ref={myRef} style={detailModal.card}>
          <FeedCard
            userImg={data.profile}
            userName={data.nickname}
            rank={data.badgeImg}
            imagePath={data.image}
            likes={data.favoritesCount}
            isLike={data.isMyFavorite == 1 ? true : false}
            pressLike={() => pressLike(data.historyId, data.isMyFavorite)}
            distence={distance}
            time={time}
            content={data.content}
            pressShare={sharePost}
          />
        </View>
      </Pressable>
    </Modal>
  )
}
