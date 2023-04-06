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
import snsaxios from '@services/sns'
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
  isMyHistory: number // (1: 내가 쓴 게시물, 0 : 내가 쓴 게시물 아님)
}

export default function MyLikes({ navigation }) {
  const setDepart = useSetRecoilState(departState)
  const setDestin = useSetRecoilState(destinState)
  const { fetchLikes, fetchDetail } = user
  const { saveLike, deleteLike } = snsaxios

  const [dataLst, setDataLst] = useState<SnsData[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [detailData, setDetailData] = useState({})

  let page: number = 0

  const axiosLike = () => {
    fetchLikes(page)
      .then((res) => {
        setDataLst(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // axios
    axiosLike()
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

  const pressLike = (historyId: number) => {
    const check = detailData.isMyFavorite == 1 ? true : false

    // 좋아요를 하려면, saveLike,
    // 좋아요를 제거하려면, deleteLike, 함수를 axios로 연결
    const axios: (params: any) => any = !check
      ? saveLike(historyId)
      : deleteLike(historyId)

    // 위의 axios 함수 불러옴.
    axios
      .then((res) => {
        let updateData: object = detailData

        updateData.isMyFavorite =  updateData.isMyFavorite == 1 ? 0 : 1
        updateData.favoritesCount = check
          ? updateData.favoritesCount - 1
          : updateData.favoritesCount + 1,

        setDetailData(updateData)
        axiosLike()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      {isModalVisible ? (
        <DetailModal
          visible={isModalVisible}
          data={detailData}
          pressLike={pressLike}
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
