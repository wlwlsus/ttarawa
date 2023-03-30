import { createStackNavigator } from '@react-navigation/stack'

import Map from '@screens/main/Map'
import SearchPath from '@screens/main/SearchPath'
import NNav from '@screens/main/NNav'
import Road from '@screens/main/Road'

const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="NNav"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Map" component={Map} />
      <MainStack.Screen name="SearchPath" component={SearchPath} />
      <MainStack.Screen name="NNav" component={NNav} />
      <MainStack.Screen name="Road" component={Road} />
    </MainStack.Navigator>
  )
}
