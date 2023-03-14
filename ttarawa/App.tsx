import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Text } from 'react-native'

import IndexStackScreen from '@screens/index'
import MainStackScreen from '@screens/main'
import MyPageStackScreen from '@screens/mypage'
import Sns from '@screens/sns'

import { color, styles } from '@styles/GlobalStyles'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Zocial } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.lightGray,
        tabBarStyle: { height: 90 },
      }}
    >
      <Tab.Screen
        name="Sns"
        component={Sns}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={focused ? 32 : 37}
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
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={focused ? 32 : 37}
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
            <Zocial name="persona" size={focused ? 26 : 30} color={color} />
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
