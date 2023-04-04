import { Modal, Pressable, Text, View, Image } from 'react-native'
import { useRef } from 'react'
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
        <View style={[styles.contentContainer, styles.shadow]}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('@assets/ttarawa/logo.png')}
          />
          <Text style={styles.title}>여행을 마치시겠습니까?</Text>
          <Text style={styles.subTitle}>
            현재까지 주행한 경로가 저장됩니다.
          </Text>
          <ViewShot
            ref={viewShotRef}
            options={{ format: 'jpg', quality: 0.9 }}
            style={styles.viewShot}
          >
            <Road />
          </ViewShot>
        </View>

        <View style={[styles.buttonContainer, styles.shadow]}>
          <Text style={styles.cancel} onPress={() => cancleModal()}>
            취소
          </Text>
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
  logo: {
    alignSelf: 'flex-end',
    margin: 10,
    width: 100,
    height: 50,
  },
  contentContainer: {
    height: '60%',
    width: '90%',
    backgroundColor: color.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonContainer: {
    height: '8%',
    width: '90%',
    backgroundColor: color.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 17,
    textAlign: 'center',
  },
  viewShot: {
    width: '100%',
    height: '80%',
  },
  cancel: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: color.secondary,
    color: color.gray,
    borderBottomLeftRadius: 10,
    lineHeight: 60,
  },
  confirm: {
    flex: 1,
    backgroundColor: color.primary,
    fontSize: 30,
    textAlign: 'center',
    color: color.white,
    borderBottomRightRadius: 10,
    lineHeight: 60,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
}

export default EndModal
