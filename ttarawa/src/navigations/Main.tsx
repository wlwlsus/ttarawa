import { createStackNavigator } from '@react-navigation/stack'

import Map from '@screens/main/Map'
import Nav from '@screens/main/Nav'
import Road from '@screens/main/Road'

const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Nav"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Map" component={Map} />
      <MainStack.Screen name="Nav" component={Nav} />
      <MainStack.Screen name="Road" component={Road} />
    </MainStack.Navigator>
  )
}
