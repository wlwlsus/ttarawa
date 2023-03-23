import { createStackNavigator } from '@react-navigation/stack'
import Map from '@screens/main/Map'
import Nav from '@screens/main/Nav'
const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="Map">
      <MainStack.Screen
        options={{ headerShown: false }}
        // name="Map"
        // component={Map}
        name="Nav"
        component={Nav}
      />
    </MainStack.Navigator>
  )
}
