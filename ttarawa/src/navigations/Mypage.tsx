import { createStackNavigator } from '@react-navigation/stack'
import MyProfile from '@screens/mypage/MyProfile'
import MyLikes from '@screens/mypage/MyLikes'
import MyHistory from '@screens/mypage/MyHistory'
import Intro from '@navigations/Intro'

const MyPageStack = createStackNavigator()

// MyPage Nested Navigation
export default function MyPageStackScreen({ route }) {
  const { setIsVisible } = route.params

  return (
    <MyPageStack.Navigator initialRouteName="MyProfile">
      <MyPageStack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen name="MyLikes" component={MyLikes} />
      <MyPageStack.Screen name="MyHistory" component={MyHistory} />
      <MyPageStack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
        initialParams={{ setIsVisible }}
      />
    </MyPageStack.Navigator>
  )
}
