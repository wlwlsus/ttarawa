import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { myPage } from '@styles/myPage'
import { useRecoilValue } from 'recoil'
import { userState } from '@store/atoms'

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import auth from '@services/auth'
import { getToken } from '@utils/apiRequest'

import UserProfile from '@components/mypage/UserProfile'

export default function MyProfile({ navigation }) {
  // Todo : badgeName, profile 연결해야함
  const { nickname, badgeName, totalDistance, badgeImg } =
    useRecoilValue(userState)

  const logout = async () => {
    const accessToken = await getToken()
    auth.logout(accessToken)
    navigation.navigate('Index', { screen: 'Start' })
  }

  const distance = () => {
    const tmp = totalDistance * 0.001
    if (!Math.floor(tmp)) return 0
    return tmp.toFixed(2)
  }

  return (
    <SafeAreaView style={myPage.container}>
      <Pressable hitSlop={10} style={myPage.logout} onPress={logout}>
        <Text style={myPage.logoutText}>로그아웃</Text>
      </Pressable>

      <UserProfile />

      <View style={[myPage.userContainer, myPage.shadow]}>
        <Text style={myPage.rank}>{badgeName}</Text>
        <View style={myPage.nameContainer}>
          <Image style={myPage.img} source={{ uri: badgeImg }} />
          <Text style={myPage.userName}>{nickname} 님</Text>
        </View>
        <Text style={myPage.riding}>
          누적 <Text style={myPage.ridingData}>{distance()}</Text> km
        </Text>
      </View>
      <View style={myPage.buttons}>
        <IconButton
          text="주행기록"
          type="large"
          icon1={
            <MaterialCommunityIcons name="bike" size={30} color={color.black} />
          }
          icon2={
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={color.black}
            />
          }
          press={() => navigation.push('MyHistory')}
        />
        <IconButton
          text="좋아요 목록"
          type="large"
          icon1={
            <MaterialIcons
              name="local-fire-department"
              size={30}
              color={color.red}
            />
          }
          icon2={
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={color.black}
            />
          }
          press={() => navigation.navigate('MyLikes')}
        />
        <IconButton
          text="앱소개"
          type="large"
          icon1={
            <Image
              source={require('@assets/ttarawa/logo.png')}
              style={myPage.logo}
            />
          }
          icon2={
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={color.black}
            />
          }
          press={() => navigation.navigate('Index', { screen: 'Intro' })}
        />
      </View>
    </SafeAreaView>
  )
}
