import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { color, styles } from '@styles/GlobalStyles'
import { map } from '@styles/main'

export default function Navi() {
  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <Text>네이게이션 화면</Text>
    </SafeAreaView>
  )
}
