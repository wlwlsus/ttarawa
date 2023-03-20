import { createStackNavigator } from '@react-navigation/stack'
import Start from '@screens/intro/Start'
import Login from '@screens/intro/Login'
import Intro from '@screens/intro/Intro'
import Recom from '@screens/intro/Recom'
import SocialLogin from '@screens/intro/SocialLogin'
import Map from '@screens/main/Map'

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
      <IndexStack.Screen name="Map" component={Map} />
    </IndexStack.Navigator>
  )
}
