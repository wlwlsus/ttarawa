import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Index from '@screens/index'
import Main from '@screens/main'
import Mypage from '@screens/mypage'
import Sns from '@screens/sns'

import { color } from '@styles/GlobalStyles'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Zocial } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Sns"
        component={Sns}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={50}
              color={focused ? color.primary : color.lightGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={50}
              color={focused ? color.primary : color.lightGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Zocial
              name="persona"
              size={40}
              color={focused ? color.primary : color.lightGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
