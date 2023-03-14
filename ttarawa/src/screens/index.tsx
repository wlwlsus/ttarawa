import { createStackNavigator } from '@react-navigation/stack'
import Start from '@components/index/Start'
import Login from '@components/index/Login'
import Intro from '@components/index/Intro'

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
    </IndexStack.Navigator>
  )
}
