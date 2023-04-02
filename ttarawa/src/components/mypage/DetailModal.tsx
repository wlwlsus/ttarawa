import { useEffect, useState } from 'react'
import { View, Modal, Pressable } from 'react-native'
import FeedCard from '@components/common/FeedCard'
import { convertToKm, convertToTime } from '@utils/caculator'
import { color } from '@styles/GlobalStyles'


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

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])

  const distance = convertToKm(data.distance)
  const time = convertToTime(data.time)
  // const isLike = data.isMyFavorite === 1 ? true : false

  return (
    <Modal 
      animationType="slide" 
      visible={modalVisible}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: color.modalBg,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setModalVisible(false)
          onClose()
        }}
      >
        <View style={{
          height: '70%',
          width: '90%',
          backgroundColor: color.white,
          borderRadius: 10,
        }}>
          <FeedCard
            historyId={data.historyId}
            userImg={data.profile}
            userName={data.nickname}
            rank={data.badgeImg}
            imagePath={data.image}
            likes={data.favoritesCount}
            isLike={true}
            distence={distance}
            time={time}
            content={data.content}
          />
        </View>
      </Pressable>
    </Modal>
  )
}
