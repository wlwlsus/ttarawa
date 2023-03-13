import { createStackNavigator } from '@react-navigation/stack'
import MyProfile from '~/components/mypage/MyProfile'
const MyPageStack = createStackNavigator()

// MyPage Nested Navigation
export default function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      // Mypage 하위 컴포넌트
      <MyPageStack.Screen name="MyProfile" component={MyProfile} />
    </MyPageStack.Navigator>
  )
}
