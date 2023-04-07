import { createStackNavigator } from '@react-navigation/stack'
import Start from '@screens/index/Start'
import Login from '@screens/index/Login'
import Intro from '@navigations/Intro'
import Recom from '@screens/index/Recom'
import SocialLogin from '@screens/index/SocialLogin'

import Tabs from '@navigations/Tabs'

const IndexStack = createStackNavigator()

// Index Nested Navigation
export default function Index() {
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
      <IndexStack.Screen name="Tabs" component={Tabs} />
    </IndexStack.Navigator>
  )
}
