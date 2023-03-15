import { createStackNavigator } from '@react-navigation/stack'
import Map from '@components/main/Map'
const MainStack = createStackNavigator()

// Main Nested Navigation
export default function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Map" component={Map} />
    </MainStack.Navigator>
  )
}
