import { Modal, Pressable, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { color } from '@styles/GlobalStyles'
import ViewShot, { captureRef } from 'react-native-view-shot'
import Road from '@screens/main/Road'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'
import { locationListState } from '~/store/atoms'
import { useRecoilValue, useRecoilState } from 'recoil'

const EndModal = ({ time, modalVisible, cancleModal, navigate }) => {
  // recoil에 저장된 위치리스트 가져오기
  const locationData = useRecoilValue(locationListState)
  console.log(locationData)

  // 도 단위의 각도를 라디안 단위로 변환하는 함수
  function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }

  // 두 지점 사이의 거리를 계산하는 함수 (단위: meter)
  function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371000 // 지구 반지름 (단위: meter)
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const lat1Rad = toRadians(lat1)
    const lat2Rad = toRadians(lat2)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return Math.round(d) // double -> long으로 변환
  }

  // 이전 위치와 현재 위치 사이의 거리를 계산하는 함수
  function calculateDistance(
    prevCoords: { latitude: number; longitude: number },
    currentCoords: { latitude: number; longitude: number },
  ): number {
    const lat1 = prevCoords.latitude
    const lon1 = prevCoords.longitude
    const lat2 = currentCoords.latitude
    const lon2 = currentCoords.longitude
    const d = distance(lat1, lon1, lat2, lon2)
    return d
  }

  function calculateTotalDistance(
    locationData: { latitude: number; longitude: number }[],
  ): number {
    let totalDistance: number = 0
    let prevCoords = locationData[0]
    for (let i = 1; i < locationData.length; i++) {
      const currentCoords = locationData[i]
      const d = calculateDistance(prevCoords, currentCoords)

      if (d <= 1) {
        d = 0
      }
      totalDistance += d
      prevCoords = currentCoords
    }
    return totalDistance
  }
  // 캡쳐

  const uploadHistoryData = async () => {
    const imageUri = await captureRef(viewShotRef, {
      format: 'jpg',
      quality: 0.8,
    })

    // 파일명 중복 안되게 uuid 로 저장
    const uuid = uuidv4()
    const filename = `${uuid}.jpg`
    const imageData = {
      uri: imageUri,
      type: 'image/jpeg',
      name: filename,
    }
    const formData = new FormData()

    formData.append('personal', 1)
    formData.append('time', time)
    formData.append('distance', calculateTotalDistance(locationData))
    formData.append('content', '')
    formData.append('startLat', 1231221)
    formData.append('startLng', 11214)
    formData.append('endLat', 123)
    formData.append('endLng', 222)
    formData.append('image', imageData)

    const token = await AsyncStorage.getItem('token')

    try {
      const response = await axios.post(
        'http://j8a605.p.ssafy.io/api/v1/history/post',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('Response:', response.data)
      navigate()
    } catch (error) {
      console.error('Error:', error)
      console.log(formData)
    }
  }

  const viewShotRef = useRef(null)

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.modalContainer}>
        <View
          style={{
            height: '70%',
            width: '90%',
            backgroundColor: color.white,
            borderRadius: 10,
          }}
        >
          <ViewShot
            ref={viewShotRef}
            options={{ format: 'jpg', quality: 0.9 }}
            style={{ width: 500, height: 500 }}
          >
            <Road />
          </ViewShot>
          <Text style={styles.modalButton} onPress={() => uploadHistoryData()}>
            저장
          </Text>

          <Text style={styles.modalButton} onPress={() => cancleModal()}>
            취소
          </Text>

          <Text style={styles.modalButton} onPress={() => cancleModal()}></Text>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: color.modalBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
  },
}

export default EndModal
