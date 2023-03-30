import { createStackNavigator } from '@react-navigation/stack'

import Map from '@screens/main/Map'
import SearchPath from '@screens/main/SearchPath'
import Nav from '@screens/main/Nav'
import Road from '@screens/main/Road'
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
      <MainStack.Screen name="Nav" component={Nav} />
      <MainStack.Screen name="Road" component={Road} />
      <MainStack.Screen name="NaviPath" component={NaviPath} />
    </MainStack.Navigator>
  )
}
