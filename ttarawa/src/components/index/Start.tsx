import { View, Text, Image, SafeAreaView } from 'react-native'
import { start } from '~/styles/Index'

import Button from '@components/common/Button'

export default function Welcome({ navigation }) {
  const imgSrc = require('@assets/ttarawa/logo.png')

  return (
    <SafeAreaView style={start.introContainer}>
      <View style={start.introBox}>
        <Image style={start.introLogo} source={imgSrc} />
        <Text style={start.introText}>가볍게 떠나는 따릉이 여행</Text>
      </View>
      <View style={start.introButtons}>
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
