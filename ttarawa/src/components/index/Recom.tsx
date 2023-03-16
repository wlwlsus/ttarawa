import { View, Text, Pressable, ScrollView } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import SafeAreaView from 'react-native-safe-area-view'
import { recom } from '@styles/index'
import Card from '@components/common/IndexCard'
// axios 밖으로 빼야함
// import axios from 'axios'
import * as Location from 'expo-location'
import { useState, useEffect } from 'react'

export default function Recom({ navigation }) {
  // 밖으로 뺄 axios 함수
  const [recoms, setRecoms] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const getRecom = async () => {
    try {
      // 권한 얻기
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      // 현재 위치 정보 얻기
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData['coords']['latitude'] // 위도
      const longitude = locationData['coords']['longitude'] // 경도

      // 장소 추천 받기
      const result: [
        {
          name?: string
          distance?: number
          visit?: number
          category?: string
          subCategory?: string
          spotId?: number
          adress?: string
          lat?: number
          lng?: number
        },
      ] = [
        {
          name: '혜진커피',
          distance: 20,
          visit: 10,
          category: '카페',
          spotId: 1,
        },
        {
          name: '혜진국밥',
          distance: 50,
          visit: 30,
          category: '음식점',
          spotId: 21,
        },
        {
          name: '혜진빵집',
          distance: 10,
          visit: 3,
          category: '카페',
          spotId: 11,
        },
        {
          name: '혜진로또',
          distance: 40,
          visit: 99,
          category: '관광지',
          spotId: 65,
        },
        {
          name: '혜진진자라',
          distance: 24,
          visit: 12,
          category: '음식점',
          spotId: 2,
        },
        {
          name: '혜진또배기',
          distance: 21,
          visit: 161,
          category: '음식점',
          spotId: 7,
        },
        {
          name: '혜진라면',
          distance: 12,
          visit: 32,
          category: '음식점',
          spotId: 8,
        },
        {
          name: '혜진드기',
          distance: 9,
          visit: 30,
          category: '화장실',
          spotId: 9,
        },
      ]

      // await axios.get
      //   `api주소`
      // )

      setRecoms(result)
      console.log(latitude, longitude)
    } catch (error) {
      console.log('위치를 찾을 수가 없습니다.', '앱을 껏다 켜볼까요?')
    }
  }
  // useEffect
  useEffect(() => {
    getRecom()
  }, [])

  // 목적지 직접 설정하러 가는 함수 만들어야함
  const GoMap = () => {
    console.log('목적지 집적 설정하러가쟝')
  }

  // const Recoms = [
  //   {
  //     name: '혜진커피',
  //     distance: 20,
  //     visit: 10,
  //     category: '카페',
  //     spotId: '1',
  //   },
  //   {
  //     name: '혜진국밥',
  //     distance: 50,
  //     visit: 30,
  //     category: '음식점',
  //     spotId: '21',
  //   },
  //   {
  //     name: '혜진빵집',
  //     distance: 10,
  //     visit: 3,
  //     category: '카페',
  //     spotId: '11',
  //   },
  //   {
  //     name: '혜진로또',
  //     distance: 40,
  //     visit: 99,
  //     category: '관광지',
  //     spotId: '65',
  //   },
  //   {
  //     name: '혜진진자라',
  //     distance: 24,
  //     visit: 12,
  //     category: '음식점',
  //     spotId: '2',
  //   },
  //   {
  //     name: '혜진또배기',
  //     distance: 21,
  //     visit: 161,
  //     category: '음식점',
  //     spotId: '7',
  //   },
  //   {
  //     name: '혜진라면',
  //     distance: 12,
  //     visit: 32,
  //     category: '음식점',
  //     spotId: '8',
  //   },
  //   {
  //     name: '혜진드기',
  //     distance: 9,
  //     visit: 30,
  //     category: '화장실',
  //     spotId: '9',
  //   },
  // ]

  return (
    <SafeAreaView style={recom.container} forceInset={{ bottom: 'never' }}>
      <View style={recom.header}>
        <Text style={recom.title}>여긴 어때요?</Text>
        <Text style={recom.text}>
          {/* userName 들고오기 */}
          user.name 님 현재 위치 기반{'\n'}가장 인기있는 목적지입니다
        </Text>
      </View>

      {/* 지도 페이지로 넘어가도록 기능 추가해야함  */}
      <Pressable style={recom.buttonBox} onPress={GoMap}>
        <Text style={recom.buttonText}>목적지 직접 설정</Text>
        <AntDesign name="doubleright" size={15} color={color.white} />
      </Pressable>

      <ScrollView
        style={recom.scrollView}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'never'}
      >
        <View style={recom.scrollcontent}>
          {/* <Card name={'혜진커피'} distance={10} visit={30} category={'카페'} /> */}

          {recoms.map((reco) => {
            return (
              <Card
                // spotId={reco.spotId}
                name={reco.name}
                distance={reco.distance}
                visit={reco.visit}
                category={reco.category}
              />
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
