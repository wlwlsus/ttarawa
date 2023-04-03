import { View, Text, SafeAreaView, Image } from 'react-native'
import { login } from '@styles/index'
import LoginIcon from '@components/index/LoginIcon'
import { getToken } from '@utils/apiRequest'
import { useEffect, useState } from 'react'
import Button from '@components/common/Button'
import { color } from '@styles/GlobalStyles'

export default function Login({ navigation }) {
  const imgSrc = require('@assets/ttarawa/profile.png')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getToken()
      console.log(token)
      setToken(token)
    }
    getAccessToken()
  }, [])

  return (
    <SafeAreaView style={login.loginContainer}>
      <View style={login.headBox}>
        <Image style={login.headLogo} source={imgSrc} />
        <Text style={login.headText}>
          따릉이와 함께하는 떠나는 따릉이 여행 {'\n'} 지금 시작하세요
        </Text>
      </View>

      {/* 토큰이 있으면 시작하기, 없으면 로그인 버튼 */}
      {token ? (
        <Button
          type="large"
          text="여행하기"
          press={() => navigation.navigate('Recom')}
          style={{
            container: { backgroundColor: color.secondary },
            txt: { color: color.primary },
          }}
        />
      ) : (
        <LoginIcon navigation={navigation} />
      )}
    </SafeAreaView>
  )
}
