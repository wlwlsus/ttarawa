import { View, SafeAreaView, Image, Dimensions, FlatList } from 'react-native'
import GuideCard from '~/components/card/GuideCard'
import { color } from '@styles/GlobalStyles'
import { Octicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { guide } from '@styles/index'
import LoginIcon from '@components/index/LoginIcon'
import { getToken } from '@utils/apiRequest'
import Button from '@components/common/Button'

const cardContent: { id: number; content: string }[] = [
  { id: 0, content: '나에게 꼭 맞는 여행 경로를 추천 받아요' },
  {
    id: 1,
    content: '추천 경로와 예상 시간을 확인해보세요',
  },
  {
    id: 2,
    content: '힘들면 잠시 멈춰 근처 쉴 곳을 확인하세요',
  },
  {
    id: 3,
    content:
      '다른 사람들과 경로를 공유하고 \n 다른 사람들의 경로를 직접 달려보세요',
  },
  {
    id: 4,
    content: '주행 거리에 따라 나만의 뱃지를 수집해보세요',
  },
  {
    id: 5,
    content: '따옹이와 함께하는 따릉이 여행 \n 지금 시작하세요',
  },
]

const PAGE_HEIGHT = Dimensions.get('window').height // 페이지 높이

export default function Guide({ navigation }) {
  const [index, setIndex] = useState(0)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // 스크롤에 따라 index 이동
  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y
    const pageIndex = Math.round(offsetY / PAGE_HEIGHT)
    setIndex(pageIndex)
  }

  const dotIndex = (idx: number) => {
    return idx === index ? 'dot-fill' : 'dot'
  }

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getToken()
      setToken(token)
    }
    getAccessToken()

    // 2초 후 로딩 끝
    setTimeout(() => setLoading(false), 2000)
  }, [])

  if (loading) {
    // 로딩 중이면 gif 이미지 표시
    return (
      <Image source={require('@assets/guide/splash.gif')} style={{ flex: 1 }} />
    )
  }

  return (
    <SafeAreaView style={guide.container}>
      <View style={guide.index}>
        <Octicons name={dotIndex(0)} size={24} color={color.secondary} />
        <Octicons name={dotIndex(1)} size={24} color={color.secondary} />
        <Octicons name={dotIndex(2)} size={24} color={color.secondary} />
        <Octicons name={dotIndex(3)} size={24} color={color.secondary} />
        <Octicons name={dotIndex(4)} size={24} color={color.secondary} />
      </View>

      <FlatList
        onScroll={handleScroll}
        data={cardContent}
        renderItem={({ item }) => {
          return (
            <GuideCard key={item.id} index={item.id} content={item.content} />
          )
        }}
        // showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        // contentContainerStyle={guide.scroll}
      />
      {index === 5 ? (
        <View style={guide.socialLogin}>
          {token ? (
            <Button
              type="large"
              text="시작하기"
              press={() => navigation.navigate('Recom')}
              style={{
                container: { backgroundColor: color.secondary },
                txt: { color: color.primary },
              }}
            />
          ) : (
            <LoginIcon navigation={navigation} />
          )}
        </View>
      ) : null}
    </SafeAreaView>
  )
}
