import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { RecoilRoot } from 'recoil'

import Index from '@navigations/Index'
import Tabs from '@navigations/Tabs'
import Intro from '@navigations/Intro'

import * as Notifications from 'expo-notifications'

// 알람을 누르면 수행할 동작
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// 기존 채널 삭제 및 따라와 채널로 추가
if (Platform.OS === 'android') {
  Notifications.deleteNotificationChannelAsync(
    'expo_notifications_fallback_notification_channel',
  )
  Notifications.setNotificationChannelAsync('default', {
    name: '따라와',
    importance: Notifications.AndroidImportance.HIGH,
  })
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Index"
          // initialRouteName="Tabs"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Intro" component={Intro} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}
