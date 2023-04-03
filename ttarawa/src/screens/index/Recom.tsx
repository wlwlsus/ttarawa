import { View, Text, Pressable, ScrollView } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import SafeAreaView from 'react-native-safe-area-view'
import { recom } from '@styles/index'
import IconButton from '@components/common/IconButton'
import RecomCard from '@components/index/RecomCard'
import { departState } from '@store/atoms'
import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'
import { userState } from '@store/atoms'
import user from '@services/user'
import intro from '@services/intro'
import getLocation from '@utils/getLocation'

interface result {
  name: string
  distances: number
  visit: number
  category: number
  subCategory?: string
  tourId?: number
  adress?: string
  lat?: number
  lng?: number
}

export default function Recom({ navigation }) {
  // 밖으로 뺄 axios 함수
  const [depart, setDepart] = useRecoilState(departState)
  const [recoms, setRecoms] = useState<result[]>([])
  const [userInfo, setUserInfo] = useRecoilState(userState)

  const getRecom = async () => {
    // 현재 위치
    const { lat, lng, name } = await getLocation()
    setDepart({ ...depart, lat, lng, name })

    // 추천 목적지 가져오기
    intro
      .fetchRecom(lat, lng, 10)
      .then((res) => {
        setRecoms(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // 유저정보
    user
      .fetchProfile()
      .then((res) => {
        setUserInfo(res)
      })
      .catch((err) => console.log(err))

    getRecom()
  }, [])

  const goMap = () => {
    navigation.navigate('Tabs', { screen: 'Main' })
  }

  return (
    <SafeAreaView style={recom.container}>
      <View style={recom.header}>
        <Text style={recom.title}>여긴 어때요?</Text>
        <Text style={recom.text}>
          <Text style={recom.user}>{userInfo.nickname}</Text> 님 현재 위치 기반
          {'\n'} 가장 인기있는 목적지입니다
        </Text>
      </View>

      <IconButton
        type="transparent"
        text="목적지 직접 설정"
        icon2={<AntDesign name="doubleright" size={17} color={color.white} />}
        press={goMap}
        dir="left"
        style={{
          container: {
            alignSelf: 'flex-end',
            gap: 3,
            position: 'absolute',
            top: 260,
            right: 25,
          },
          txt: { color: color.white, fontWeight: 'normal' },
        }}
      />

      <ScrollView
        style={recom.scrollView}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={recom.scrollcontent}
      >
        {recoms.map((recom) => {
          return (
            <RecomCard
              key={recom.tourId}
              name={recom.name}
              distance={recom.distances}
              visit={recom.visit}
              category={recom.category}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}
