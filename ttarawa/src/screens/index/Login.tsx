import { View, Text, SafeAreaView, Image } from 'react-native'
import { login } from '@styles/index'
import IconButton from '@components/common/IconButton'

export default function Login({ navigation }) {
  const imgSrc = require('@assets/ttarawa/profile.png')
  const kakao = require('@assets/ttarawa/kakao.png')
  const naver = require('@assets/ttarawa/naver.png')
  const google = require('@assets/ttarawa/google.png')

  // login 기능 넣기
  const toLogin = (socialType: string) => {
    navigation.navigate('SocialLogin', { data: socialType })
  }

  return (
    <SafeAreaView style={login.loginContainer}>
      <View style={login.headBox}>
        <Image style={login.headLogo} source={imgSrc} />
        <Text style={login.headText}>따릉이와 함께하는 떠나는 따릉이 여행</Text>
        <Text style={login.headText}>지금 시작하세요</Text>
      </View>
      <View style={login.loginBox}>
        <IconButton
          icon1={<Image style={login.loginLogo} source={kakao} />}
          nonShadow={true}
          press={() => {
            toLogin('kakao')
          }}
        />
        <IconButton
          icon1={<Image style={login.loginLogo} source={naver} />}
          nonShadow={true}
          press={() => {
            toLogin('naver')
          }}
        />
        <IconButton
          icon1={<Image style={login.loginLogo} source={google} />}
          nonShadow={true}
          press={() => {
            toLogin('google')
          }}
        />
      </View>
    </SafeAreaView>
  )
}
