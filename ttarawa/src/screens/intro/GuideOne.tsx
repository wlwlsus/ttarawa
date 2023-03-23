import { ScrollView, View, Text, SafeAreaView } from 'react-native'
import IntroCard from '@components/card/IntroCard'
import { color } from '@styles/GlobalStyles'

export default function GuideOne() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.primary,
      }}
    >
      <ScrollView>
        <IntroCard
          index={0}
          content={'목적지를 입력해 여행 경로를 추천 받아요'}
        />
        <IntroCard
          index={1}
          content={
            '힘들면 잠시 멈춰 근처 쉴 곳을 확인하세요 \n 반납 장소, 카페, 음식점, 관광지 ...'
          }
        />
        <IntroCard
          index={2}
          content={
            '다른 사람들과 경로를 공유하고 \n 다른 사람들의 경로를 직접 달려보세요'
          }
        />
        <IntroCard
          index={3}
          content={
            '주행 거리에 따라 뱃지를 수집해보세요 \n 뱃지에 대한 멘트 써주셈'
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}
