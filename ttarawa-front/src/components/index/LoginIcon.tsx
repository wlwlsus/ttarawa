import { View, Image } from 'react-native'
import IconButton from '@components/common/IconButton'
import { login } from '@styles/index'

export default function LoginIcon({ navigation }) {
  const kakao = require('@assets/ttarawa/kakao.png')
  const naver = require('@assets/ttarawa/naver.png')
  const google = require('@assets/ttarawa/google.png')

  const toLogin = (socialType: string) => {
    navigation.navigate('SocialLogin', { data: socialType })
  }

  return (
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
  )
}
