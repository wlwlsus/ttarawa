import { createStackNavigator } from '@react-navigation/stack'
import Map from '@screens/main/Map'
const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="Map">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={Map}
      />
    </MainStack.Navigator>
  )
}
