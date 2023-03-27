import React, { useState, useEffect } from 'react'
import { Text, View, Switch } from 'react-native'
import { styles } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import { SafeAreaView } from 'react-native'
import * as Location from 'expo-location'

type LocationObject = Location.LocationObject

export default function Map() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [locationData, setLocationData] = useState<
    { latitude: number; longitude: number }[]
  >([])
  const [watchId, setWatchId] = useState<number | null>(null)

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState)
    if (!isEnabled) {
      await Location.requestForegroundPermissionsAsync()
      const newWatchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords
          setLocationData((prevData) => [...prevData, { latitude, longitude }])
        },
      )
      setWatchId(newWatchId)
    } else {
      if (watchId) {
        Location.clearWatch(watchId)
        setWatchId(null)
      }
    }
  }

  useEffect(() => {
    console.log(locationData)
  }, [locationData])

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      {/* 주행 시작 & 종료 버튼으로 대체 */}
      <View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>
          {isEnabled
            ? '위치 정보 저장을 켰습니다.'
            : '위치 정보 저장을 껐습니다.'}
        </Text>
      </View>
    </SafeAreaView>
  )
}
