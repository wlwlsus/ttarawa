import { createStackNavigator } from '@react-navigation/stack'

import Map from '@screens/main/Map'
import SearchPath from '@screens/main/SearchPath'
import NaviPath from '~/screens/main/NaviPath'

const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Map"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Map" component={Map} />
      <MainStack.Screen name="SearchPath" component={SearchPath} />
      <MainStack.Screen name="NaviPath" component={NaviPath} />
    </MainStack.Navigator>
  )
}
