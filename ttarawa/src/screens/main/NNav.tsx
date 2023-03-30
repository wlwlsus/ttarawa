import React, { useState, useEffect } from 'react'
import { Text, View, Switch, TouchableOpacity } from 'react-native'

import * as Location from 'expo-location'
import { useRecoilState } from 'recoil'
import { locationListState } from '~/store/atoms'

export default function NNav() {
  const [locationList, setLocationList] = useRecoilState(locationListState)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isWatching, setIsWatching] = useState(false)

  const watchId = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // 10초마다 업데이트
        distanceInterval: 0,
      },
      (location) => {
        const { latitude, longitude } = location.coords
        setLocationList((prevData) => [...prevData, latitude, longitude])
        console.log('getLOCATION')
      },
    )
  }

  const stopLocationTracking = () => {
    setIsWatching(false)
    Location.stopLocationUpdatesAsync(watchId)
    setLocationList([])
    console.log('stop it')
  }

  useEffect(() => {
    if (!isWatching) return
    watchId()

    return () => {
      stopLocationTracking()
    }
  }, [isWatching])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {errorMsg && <Text>{errorMsg}</Text>}
      <Text onPress={() => setIsWatching(true)}>"Start Location Tracking"</Text>
      <Text onPress={stopLocationTracking}>"Stop Location Tracking" </Text>
    </View>
  )
}
