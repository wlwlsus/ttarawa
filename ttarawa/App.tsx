import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Text } from 'react-native'

import IndexStackScreen from '@navigations/Intro'
import MainStackScreen from '@navigations/Main'
import MyPageStackScreen from '@navigations/Mypage'
import Sns from '@screens/sns/Sns'
import SnsHeader from '@components/header/SnsHeader'

import { color, styles } from '@styles/GlobalStyles'

import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'

import * as Notifications from 'expo-notifications'

// 알람을 누르면 수행할 동작
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
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
const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.lightGray,
        tabBarStyle: { height: 70 },
      }}
    >
      <Tab.Screen
        name="Sns"
        component={Sns}
        options={{
          headerTitle: (props) => <SnsHeader {...props} />,

          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={focused ? 40 : 45}
              color={color}
            />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.navTab}>SNS</Text> : null,
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={focused ? 37 : 45}
              color={color}
            />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.navTab}>여행하기</Text> : null,
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyPageStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Zocial name="persona" size={focused ? 33 : 38} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.navTab}>마이페이지</Text> : null,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Index"
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Index" component={IndexStackScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
