import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { color } from '@styles/GlobalStyles'
import { mylikes } from '@styles/myPage'
import IconButton from '@components/common/IconButton'
import { MaterialIcons } from '@expo/vector-icons'
import { departState, destinState } from '@store/atoms'
import { geocoding } from '@utils/geocoding'
import { convertToKm, convertToTime } from '@utils/caculator'
import user from '@services/user'
import DetailModal from '@components/mypage/DetailModal'

interface SnsData {
  historyId: number
  nickname: string
  image: string
  distance: number // (주행 거리 - 미터 단위)),
  time: number // (주행 시간 - 초 단위)),
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  // startAddress: string // (시작 도로명 주소"서울특별시 강남구 역삼동 테헤란로 212"),
  // endAddress: string // (도착 도로명 주소"서울특별시 강남구 강남대로 438 스타플렉스"),
  isMyHistory: number // (1: 내가 쓴 게시물, 0 : 내가 쓴 게시물 아님)
}

export default function MyLikes({ navigation }) {
  const setDepart = useSetRecoilState(departState)
  const setDestin = useSetRecoilState(destinState)
  const { fetchLikes, fetchDetail } = user

  const [dataLst, setDataLst] = useState<SnsData[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [detailData, setDetailData] = useState({})

  let page: number = 0

  useEffect(() => {
    // axios
    fetchLikes(page)
      .then((res) => {
        setDataLst(res)
      })
      .catch((err) => console.log(err))
  }, [])

  const goTrip = async (
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ) => {
    await geocoding(startLat, startLng, setDepart)
    await geocoding(endLat, endLng, setDestin)

    await navigation.navigate('Main', { screen: 'SearchPath' })
  }

  const detail = (historyId: number) => {
    // axios
    // bottomSheet 활용
    fetchDetail(historyId)
      .then((res) => {
        setIsModalVisible(true)
        setDetailData(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      {isModalVisible ? (
        <DetailModal
          visible={isModalVisible}
          data={detailData}
          onClose={() => setIsModalVisible(false)}
        />
      ) : null}
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const distance = convertToKm(item.distance)
          const time = convertToTime(item.time)

          return (
            <Pressable
              style={mylikes.cardContainer}
              onPress={() => {
                detail(item.historyId)
              }}
            >
              {/* 주행기록 이미지 */}
              <Image source={{ uri: item.image }} style={mylikes.img} />

              <View style={mylikes.contentContainer}>
                {/* 닉네임 */}
                <View style={mylikes.textDir}>
                  <Text style={mylikes.userName}>{item.nickname} </Text>
                  <Text style={mylikes.textSize}>님의 코스</Text>
                </View>

                {/* 주행 기록 */}
                <View style={mylikes.textDir}>
                  <Text style={mylikes.textSize}>주행 기록: </Text>
                  <Text style={[mylikes.blueText, mylikes.textSize]}>
                    {distance}
                  </Text>
                </View>

                {/* 주행 시간 */}
                <View style={mylikes.textDir}>
                  <Text style={mylikes.textSize}>주행 시간: </Text>
                  <Text style={[mylikes.blueText, mylikes.textSize]}>
                    {time}
                  </Text>
                </View>

                {/* 여행시작 버튼 생성 */}
                <IconButton
                  type="primary"
                  dir="left"
                  text="여행 시작"
                  press={() => {
                    goTrip(
                      item.startLat,
                      item.startLng,
                      item.endLat,
                      item.endLng,
                    )
                  }}
                  icon1={
                    <MaterialIcons
                      name="directions-bike"
                      size={22}
                      color={color.white}
                    />
                  }
                ></IconButton>
              </View>
            </Pressable>
          )
        }}
        keyExtractor={(item) => item.historyId.toString()}
        // 스크롤 감추기
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
