import { View, Text, SafeAreaView, Image } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { myPage } from '@styles/myPage'
import { useRecoilValue } from 'recoil'
import { userState } from '~/store/atoms'

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'

export default function MyProfile({ navigation }) {
  // Todo : badgeName, profile 연결해야함
  const { nickname, badgeName, totalDistance, profile } =
    useRecoilValue(userState)

  return (
    <SafeAreaView style={myPage.container}>
      <View style={[myPage.imgContainer, myPage.shadow]}>
        <Image
          style={myPage.userImg}
          source={require('@assets/ttarawa/profile.png')}
        />
      </View>

      <View style={[myPage.userContainer, myPage.shadow]}>
        <Text style={myPage.rank}>주니어라이더까지 7km</Text>
        <View style={myPage.nameContainer}>
          <Image source={require('@assets/rank/junior.png')} />
          <Text style={myPage.userName}>{nickname} 님</Text>
        </View>
        <Text style={myPage.riding}>
          누적 <Text style={myPage.ridingData}>{totalDistance}</Text> km
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
          press={() => navigation.navigate('Intro')}
        />
      </View>
    </SafeAreaView>
  )
}
