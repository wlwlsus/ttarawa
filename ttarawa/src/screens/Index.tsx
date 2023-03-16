import { createStackNavigator } from '@react-navigation/stack'
import Start from '@components/index/Start'
import Login from '@components/index/Login'
import Intro from '@components/index/Intro'
import Recom from '@components/index/Recom'
import SocialLogin from '@components/index/SocialLogin'

const IndexStack = createStackNavigator()

// Index Nested Navigation
export default function IndexStackScreen() {
  return (
    <IndexStack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
      }}
    >
      <IndexStack.Screen name="Start" component={Start} />
      <IndexStack.Screen name="Login" component={Login} />
      <IndexStack.Screen name="Intro" component={Intro} />
      <IndexStack.Screen name="Recom" component={Recom} />
      <IndexStack.Screen name="SocialLogin" component={SocialLogin} />
    </IndexStack.Navigator>
  )
}
