import { Modal, Pressable, Text, Image, View } from 'react-native'
import { useState, useEffect } from 'react'
import { color } from '@styles/GlobalStyles'
import { FontAwesome } from '@expo/vector-icons'

export default function TimerModal({
  modalVisible,
  setModalVisible,
  setRentalTime,
}) {
  const [time, setTime] = useState(0)
  const [selected, setSelected] = useState()

  const handleConfirm = () => {
    setModalVisible(false)
    setRentalTime(time)
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <View style={[styles.contentContainer, styles.shadow]}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('@assets/ttarawa/logo.png')}
          />
          <Text style={styles.title}>대여 시간을 설정해주세요.</Text>

          <View style={styles.timeContainer}>
            <Pressable
              style={styles.timeButton}
              onPress={() => {
                setTime(3600), setSelected(0)
              }}
            >
              <FontAwesome
                name="check"
                size={30}
                color={selected === 0 ? color.primary : color.gray}
              />
              <Text style={styles.time}>1시간</Text>
            </Pressable>

            <Pressable
              style={styles.timeButton}
              onPress={() => {
                setTime(7200), setSelected(1)
              }}
            >
              <FontAwesome
                name="check"
                size={30}
                color={selected === 1 ? color.primary : color.gray}
              />
              <Text style={styles.time}>2시간</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.buttonContainer, styles.shadow]}>
          <Text style={styles.cancel} onPress={() => setModalVisible(false)}>
            취소
          </Text>
          <Text style={styles.confirm} onPress={handleConfirm}>
            확인
          </Text>
        </View>
      </View>
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
    height: '30%',
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
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  timeContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 25,
  },
  time: {
    fontSize: 35,
    color: color.gray,
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

export default TimerModal
