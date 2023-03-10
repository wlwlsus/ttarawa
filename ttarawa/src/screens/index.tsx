import { StyleSheet, View, Text } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { useState } from 'react'
import Card from '@components/common/Card'

export default function Index() {
  return (
    <View style={styles.container}>
      <Card
        imagepath="@assets/riding_path.PNG"
        likes="15"
        content="이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!!  이 코스 꼭 추천드립니다!"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
