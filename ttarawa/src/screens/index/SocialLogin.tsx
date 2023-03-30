import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SocialLogin({ navigation, route }) {
  const { data } = route.params
  console.log(data)
  // const URL = `http://localhost:8080/oauth2/authorization/{kakao}?redirect_uri=http://localhost:3000/oauth/redirect`
  const serverIP = 'j8a605.p.ssafy.io'
  const socialType = data
  const redirectUrl = 'exp://192.168.0.101:19000/oauth/redirect'

  const requestUrl = `http://${serverIP}/oauth2/authorization/${socialType}?redirect_uri=${redirectUrl}`

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: requestUrl,
        }}
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={(event) => {
          const token = event.url.split('?token=')[1]
          if (token) {
            AsyncStorage.setItem('token', token)
            navigation.navigate('Recom')
            return false
          }
          return true
        }}
      />
    </View>
  )
}
