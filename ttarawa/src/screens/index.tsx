import { StyleSheet, View, Text } from 'react-native'
import { color } from '@styles/GlobalStyles'
import { useState } from 'react'
import Card from '@components/common/SNSCard'

export default function Index() {
  return (
    <View style={styles.container}>
      <Card
        imagepath="./riding.png"
        likes="15"
        content="이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!"
        isLike="true"
        distence="3.5km"
        hour="30분"
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
