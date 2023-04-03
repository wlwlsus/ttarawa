import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { locationListState } from '@store/atoms'

// 현재 위치의 위도, 경도, 위치 이름을 반환하는 함수
export default function getTrack() {
  const [locationList, setLocationList] = useRecoilState(locationListState)
  const [errorMsg, setErrorMsg] = useState(null)
  const [watcher, setWatcher] =
    useState<Promise<Location.LocationSubscription> | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const startLocationTracking = async () => {
    const watcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (location) => {
        const { latitude, longitude } = location.coords
        setLocationList((prevData) => [
          ...prevData,
          { longitude: longitude, latitude: latitude },
        ])
        console.log('getLOCATION')
        console.log(locationList)
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
      console.log('stop it')
    })
  }

  return {
    startLocationTracking,
    stopLocationTracking,
  }
}
