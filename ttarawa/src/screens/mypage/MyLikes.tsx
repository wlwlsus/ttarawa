import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { color } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'
import { MaterialIcons } from '@expo/vector-icons'
import { departState, destinState, pathInfo } from '@store/atoms'
import { geocoding } from '@utils/geocoding'
import { convertToKm, convertToTime } from '@utils/caculator'

export default function MyLikes({ navigation }) {
  const setDepart = useSetRecoilState(departState)
  const setDestin = useSetRecoilState(destinState)

  interface SnsData {
    historyId: number
    nickname: string
    image: string
    distance: number // (주행 거리 - 미터 단위)),
    time: number // (주행 시간 - 초 단위)),

    startAddress: string // (시작 도로명 주소"서울특별시 강남구 역삼동 테헤란로 212"),

    endAddress: string // (도착 도로명 주소"서울특별시 강남구 강남대로 438 스타플렉스"),

    isMyHistory: number // (1: 내가 쓴 게시물, 0 : 내가 쓴 게시물 아님)
  }

  const [dataLst, setDataLst] = useState<SnsData[]>([])

  const datas: SnsData[] = [
    {
      historyId: 1,

      nickname: '열정라이더따옹이',
      image: '@assets/riding.png',

      time: 1800,
      distance: 3500,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 1,
    },
    {
      historyId: 2,

      nickname: '열정라이더따옹이',
      image: '@assets/riding.png',

      time: 1800,
      distance: 3500,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 0,
    },
    {
      historyId: 3,

      nickname: '열정라이더따옹이',
      image: '@assets/riding.png',

      time: 18000,
      distance: 35000,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 0,
    },
    {
      historyId: 4,

      nickname: '열정라이더따옹이',
      image: '@assets/riding.png',

      time: 7800,
      distance: 35400,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 0,
    },
  ]

  useEffect(() => {
    // axios
    setDataLst(datas)
  }, [])

  const goTrip = async (startAddress: string, endAddress: string) => {
    await geocoding(startAddress, setDepart)
    await geocoding(endAddress, setDestin)

    await navigation.navigate('Main', { screen: 'SearchPath' })
  }

  const detail = (historyId: number) => {
    // axios
    // bottomSheet 활용
  }

  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const imagePath = require('@assets/ttarawa/riding.png')
          const distance = convertToKm(item.distance)
          const time = convertToTime(item.time)

          return (
            <Pressable
              style={styles.cardContainer}
              // onPress={() => {detail(item.historyId)}}
            >
              {/* 주행기록 이미지 */}
              <Image source={imagePath} style={styles.img} />

              <View style={styles.contentContainer}>
                {/* 닉네임 */}
                <View style={styles.textDir}>
                  <Text style={styles.userName}>{item.nickname} </Text>
                  <Text style={styles.textSize}>님의 코스</Text>
                </View>

                {/* 주행 기록 */}
                <View style={styles.textDir}>
                  <Text style={styles.textSize}>주행 기록: </Text>
                  <Text style={[styles.blueText, styles.textSize]}>
                    {distance}
                  </Text>
                </View>

                {/* 주행 시간 */}
                <View style={styles.textDir}>
                  <Text style={styles.textSize}>주행 시간: </Text>
                  <Text style={[styles.blueText, styles.textSize]}>{time}</Text>
                </View>

                {/* 여행시작 버튼 생성 */}
                <IconButton
                  type="primary"
                  dir="left"
                  text="여행 시작"
                  press={() => {
                    goTrip(item.startAddress, item.endAddress)
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

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    gap: 10,
  },
  img: {
    width: 180,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  textDir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textSize: {
    fontSize: 15,
  },
  blueText: {
    fontWeight: 'bold',
    color: color.primary,
  },
})
