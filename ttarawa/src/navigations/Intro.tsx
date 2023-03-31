import { createStackNavigator } from '@react-navigation/stack'
import Guide from '~/screens/intro/Guide'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

const IntroStack = createStackNavigator()

export default function Intro({ route, navigation }) {
  // useEffect(() => {
  //   // Index에서 Intro 렌더링 시
  //   if (route.params === undefined) return

  //   // Tabs에서 Intro 렌더링 시
  //   const { setIsVisible } = route.params
  //   // 마운트 됐을 때 BottomTab 없애기
  //   setIsVisible({ display: 'none' })

  //   // 뒤로가기 감지 => BottomTab 생성
  //   const backAction = () => {
  //     setIsVisible({ height: 70 })
  //     navigation.navigate('MyProfile')
  //     return true
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   )

  //   // 언마운트시 eventListener 제거
  //   return () => backHandler.remove()
  // }, [])

  return (
    <IntroStack.Navigator
      initialRouteName="GuideOne"
      screenOptions={{
        headerShown: false,
      }}
    >
      <IntroStack.Screen name="GuideOne" component={Guide} />
    </IntroStack.Navigator>
  )
}
