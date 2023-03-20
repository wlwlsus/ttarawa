import { createStackNavigator } from '@react-navigation/stack'
import MyProfile from '@screens/mypage/MyProfile'
import MyLikes from '@screens/mypage/MyLikes'
import MyHistory from '@screens/mypage/MyHistory'
import Intro from '@screens/intro/Intro'

const MyPageStack = createStackNavigator()

// MyPage Nested Navigation
export default function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator initialRouteName="MyProfile">
      <MyPageStack.Screen
        options={{ headerShown: false }}
        name="MyProfile"
        component={MyProfile}
      />
      <MyPageStack.Screen name="MyLikes" component={MyLikes} />
      <MyPageStack.Screen name="MyHistory" component={MyHistory} />
      <MyPageStack.Screen name="Intro" component={Intro} />
    </MyPageStack.Navigator>
  )
}
