import { View, StyleSheet, Text, FlatList, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { color } from '@styles/GlobalStyles'

export default function MyLikes() {
  interface SnsData {
    historyId: number
    nickname: string
    image: string
    distance: number // (주행 거리 - 미터 단위)),
    time: number // (주행 시간 - 초 단위)),

    startAddress: string // (시작 도로명 주소"서울특별시 강남구 역삼동 테헤란로 212"),
    // startlat: number
    // startlng: number

    endAddress: string // (도착 도로명 주소"서울특별시 강남구 강남대로 438 스타플렉스"),
    // endlat: number
    // endlng: number

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
    // setDataLst()
  }, [])

  // 도로명 주소로 위도, 경도 출력
  const fetchRoute = async (addr: string) => {
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
        // console.log(data.coordinateInfo.coordinate[0])
        console.log(data.coordinateInfo.coordinate[0].newLat)
        console.log(data.coordinateInfo.coordinate[0].newLon)
      })
      .catch(function (error) {
        console.log('Fetch Error :-S', error)
      })
  }

  return (
    <View>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const imagePath = require('@assets/riding.png')

          return (
            <View>
              <Image source={imagePath} />
            </View>
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
  },
})
