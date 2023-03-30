import { View, Text, SafeAreaView, Image } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { profile } from '@styles/myPage'
import { useRecoilValue } from 'recoil'
import { userState } from '~/store/atoms'

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'

export default function MyProfile({ navigation }) {
  const { img, userName, rank, riding } = useRecoilValue(userState)

  return (
    <SafeAreaView style={profile.container}>
      <View style={[profile.imgContainer, profile.shadow]}>
        <Image
          style={profile.userImg}
          source={require('@assets/ttarawa/profile.png')}
        />
      </View>

      <View style={[profile.userContainer, profile.shadow]}>
        <Text style={profile.rank}>주니어라이더까지 7km</Text>
        <View style={profile.nameContainer}>
          <Image source={require('@assets/rank/junior.png')} />
          <Text style={profile.userName}>{userName} 님</Text>
        </View>
        <Text style={profile.riding}>
          누적 <Text style={profile.ridingData}>{riding}</Text> km
        </Text>
      </View>

      <View style={profile.buttons}>
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
              style={profile.logo}
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
