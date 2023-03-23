import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { useState, useEffect } from 'react'
import MainStackScreen from '@navigations/Main'
import MyPageStackScreen from '@navigations/Mypage'
import Sns from '@screens/sns/Sns'
import SnsHeader from '@components/header/SnsHeader'

import { color, styles } from '@styles/GlobalStyles'
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Tabs({ navigation }) {
  const [isVisible, setIsVisible] = useState({ height: 70 })

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: isVisible })
  }, [isVisible])

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
          tabBarStyle: isVisible,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Zocial name="persona" size={focused ? 33 : 38} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.navTab}>마이페이지</Text> : null,
        }}
        initialParams={{ setIsVisible }}
      />
    </Tab.Navigator>
  )
}
