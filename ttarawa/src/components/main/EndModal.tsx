import { Modal, Pressable, Text, View, Image } from 'react-native'
import { useRef } from 'react'
import { color } from '@styles/GlobalStyles'
import ViewShot, { captureRef } from 'react-native-view-shot'
import Road from '@screens/main/Road'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

const EndModal = ({ ttime, modalVisible, cancleModal, navigate }) => {
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
    formData.append('time', ttime)
    formData.append('distance', 1)
    // formData.append('distance', getTotalDistance())
    formData.append('content', '')
    formData.append('startAddress', 'bb')
    formData.append('endAddress', 'cc')
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
      console.log(formData)
      navigate()
    } catch (error) {
      console.error('Error:', error)
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
          <Text style={styles.confirm} onPress={() => uploadHistoryData()}>
            확인
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
