import React, { useState, useEffect } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

import * as Location from 'expo-location'
import { atom, useRecoilState } from 'recoil'
import { locationListState } from '~/store/atoms'
import axios from 'axios'
// export const locationListState = atom<number[][]>({
//   key: 'locationListState',
//   default: [],
// })

export default function NNav(navigation: any) {
  const [locationList, setLocationList] = useRecoilState(locationListState)
  const [errorMsg, setErrorMsg] = useState(null)
  // const [watcher, setWatcher] =
  //   useState<Promise<Location.LocationSubscription> | null>(null)
  const [watcher, setWatcher] =
    useState<Promise<Location.LocationSubscription> | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  const startLocationTracking = async () => {
    // const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   console.log('Permission denied');
    //   return;
    // }
    const watcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (location) => {
        const { latitude, longitude } = location.coords
        setLocationList((prevData) => [...prevData, longitude, latitude])
        console.log('getLOCATION', latitude, longitude)
      },
    )
    setIsTracking(true)
    setWatcher(watcher)
    return watcher
  }

  const stopLocationTracking = () => {
    if (!watcher) return

    watcher.then((locationSubscription: Location.LocationSubscription) => {
      locationSubscription.remove()
      setIsTracking(false)
      setWatcher(null)
      // setLocationList([])
      console.log('stop it')
    })
  }

  const tetst = () => {
    console.log('네비')
    console.log(navigation)
    console.log(navigation.navigation.navigate)

    navigation.navigation.navigate('Road')
  }

  const aa = () => {
    axios
      .get('http://3.39.209.108:8080/api/v1/spot/ping')
      .then((response) => {
        console.log(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(locationList)}</Text>
      <Button
        title={
          isTracking ? 'Stop Location Tracking' : 'Start Location Tracking'
        }
        onPress={isTracking ? stopLocationTracking : startLocationTracking}
        disabled={watcher !== null && !isTracking}
      />

      <Button title={'로드 페이지 이동'} onPress={tetst} />
    </View>
  )
}
