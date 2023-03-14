import { View, Text, Image, SafeAreaView } from 'react-native'
import { index } from '@styles/GlobalStyles'

import Button from '@components/common/Button'

export default function Welcome({ navigation }) {
  const imgSrc = require('@assets/logo.png')

  return (
    <SafeAreaView style={index.introContainer}>
      <View style={index.introBox}>
        <Image style={index.introLogo} source={imgSrc} />
        <Text style={index.introText}>가볍게 떠나는 따릉이 여행</Text>
      </View>
      <View style={index.introButtons}>
        <Button
          text="시작하기"
          style="blue"
          press={() => navigation.navigate('Login')}
        />
        <Button
          text="서비스 둘러보기"
          style="white"
          press={() => navigation.navigate('Intro')}
        />
      </View>
    </SafeAreaView>
  )
}
