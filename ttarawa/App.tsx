import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native' // 전체 네비게이션을 감싸는 컨테이너 불러오기
import { createStackNavigator } from '@react-navigation/stack' // 스택 네비게이션 라이브러리 불러오기
// import { store } from '@store/index'
// import { Provider } from 'react-redux'

import Index from '@screens/Index'
import Main from '@screens/Main'
import Mypage from '@screens/Mypage'
import Sns from '@screens/Sns'

const Stack = createStackNavigator()

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index" // 초기(메인)페이지 설정
        screenOptions={{ headerShown: false }} // 헤더 숨기기
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="Sns" component={Sns} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>r
  )
}
