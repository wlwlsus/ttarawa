import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native'
import { useEffect, useState } from 'react'
import { color } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'
import { MaterialIcons } from '@expo/vector-icons'

export default function MyLikes() {
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

      time: 1800,
      distance: 3500,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 0,
    },
    {
      historyId: 4,

      nickname: '열정라이더따옹이',
      image: '@assets/riding.png',

      time: 1800,
      distance: 3500,

      startAddress: '서울특별시 강남구 역삼동 테헤란로 212',
      endAddress: '서울특별시 강남구 강남대로 438 스타플렉스',

      isMyHistory: 0,
    },
  ]

  useEffect(() => {
    // axios
    setDataLst(datas)
  }, [])

  // 도로명 주소로 위도, 경도 출력
  const fetchRoute = async (addr: string, setAddr: any) => {
    const headers = {
      'Content-Type': 'application/json',
      appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
      // appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
    }
    // const fullAddr = '서울특별시 강남구 강남대로 438 스타플렉스'
    const fullAddr = addr

    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result&coordType=WGS84GEO&fullAddr=${fullAddr}`,
      {
        method: 'GET',
        headers: headers,
      },
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const lat = data.coordinateInfo.coordinate[0].newLat
        const lng = data.coordinateInfo.coordinate[0].newLon
        setAddr({ lat, lng })
        return { lat, lng }
        // console.log(data.coordinateInfo.coordinate[0].newLat)
        // console.log(data.coordinateInfo.coordinate[0].newLon)
      })
      .catch(function (error) {
        console.log('Fetch Error :-S', error)
      })
  }
  const [depart, setDepart] = useState({})
  const [destin, setDestin] = useState({})

  const goTrip = async (startAddress: string, endAddress: string) => {
    await Promise.all([
      fetchRoute(startAddress, setDepart),
      fetchRoute(endAddress, setDestin),
    ]).then((value) => {
      console.log(value)
      console.log(depart)
    })
  }

  const detail = (historyId: number) => {
    // axios
    // bottomSheet 활용
  }

  return (
    <View>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const imagePath = require('@assets/riding.png')

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
                    {item.distance}
                  </Text>
                </View>

                {/* 주행 시간 */}
                <View style={styles.textDir}>
                  <Text style={styles.textSize}>주행 시간: </Text>
                  <Text style={[styles.blueText, styles.textSize]}>
                    {item.time}
                  </Text>
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
    gap: 5,
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
