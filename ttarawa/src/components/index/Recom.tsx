import { View, Text, Pressable, ScrollView } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import SafeAreaView from 'react-native-safe-area-view'
import { recom } from '@styles/index'
import RecomCard from '@components/common/RecomCard'
// axios 밖으로 빼야함
import axios from 'axios'
import * as Location from 'expo-location'
import { useState, useEffect } from 'react'

export default function Recom({ navigation }) {
  interface result {
    name?: string
    distance?: number
    visit?: number
    categoryId?: number
    subCategory?: string
    spotId?: number
    adress?: string
    lat?: number
    lng?: number
  }

  // 밖으로 뺄 axios 함수
  const [recoms, setRecoms] = useState<result[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const getRecom = async () => {
    try {
      // 권한 얻기
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        console.log(errorMsg)
        return
      }

      // 현재 위치 정보 얻기
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData['coords']['latitude'] // 위도
      const longitude = locationData['coords']['longitude'] // 경도

      // 장소 추천 받기

      const result = await axios.get(
        `http://j8a605.p.ssafy.io:8080/api/v1/spot/1?category=1&lat=${latitude}&lng=${longitude}`,
      )
      setRecoms(result.data.result)
    } catch (error) {
      console.log('위치를 찾을 수가 없습니다.', '앱을 껏다 켜볼까요?')
    }
  }
  // useEffect
  useEffect(() => {
    getRecom()
  }, [])

  const goMap = () => {
    console.log('목적지 집적 설정하러가쟝')
    navigation.navigate('Map')
  }

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
      <Pressable style={recom.buttonBox} onPress={goMap}>
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
          {recoms.map((recom) => {
            return (
              <RecomCard
                // spotId={recom.spotId}
                key={recom.spotId}
                name={recom.name}
                distance={recom.distance}
                visit={recom.visit}
                categoryId={recom.categoryId}
              />
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
