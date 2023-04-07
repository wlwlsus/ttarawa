import { createStackNavigator } from '@react-navigation/stack'
import Guide from '@screens/intro/Guide'
import { useEffect } from 'react'

const IntroStack = createStackNavigator()

export default function Intro() {
  return (
    <IntroStack.Navigator
      initialRouteName="GuideOne"
      screenOptions={{
        headerShown: false,
      }}
    >
      <IntroStack.Screen name="GuideOne" component={Guide} />
    </IntroStack.Navigator>
  )
}
