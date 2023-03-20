import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default function SocialLogin({ navigation }) {
  const kakaoClientId = 'd7d7a42861b64d89868bc0f51679f971'
  const kakaoURL = 'http://localhost:3000/oauth/redirect'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoURL}`

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: KAKAO_AUTH_URL,
          //client_id에는 본인 앱 등록후 발급받은 REST API KEY
          //redirect_url도 본인 uri
        }}
        javaScriptEnabled={true}

        // onMessage ... :: webview에서 온 데이터를 event handler로 감지하여 parseAuthCood로 전달
      />
    </View>
  )
}
