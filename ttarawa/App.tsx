import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Text, View, Image } from 'react-native'

import IndexStackScreen from '@screens/index'
import MainStackScreen from '@screens/main'
import MyPageStackScreen from '@screens/mypage'
import Sns from '@screens/sns'
// import SnsHeader from '@components/sns/SnsHeader'
import IconButton from '@components/common/IconButton'

import { color, styles } from '@styles/GlobalStyles'
import { header } from '@styles/sns'

import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabs() {
  const SnsHeader = () => {
    return (
      <View style={header.container}>
        <Image
          style={header.logo}
          source={require('@assets/ttarawa/logo.png')}
        />
        <IconButton
          icon1={
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={color.gray}
            />
          }
          press={() => console.log('menu')}
        />
      </View>
    )
  }

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
