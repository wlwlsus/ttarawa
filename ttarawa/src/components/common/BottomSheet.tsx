import { useEffect, useRef } from 'react'
import {
  View,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  PanResponder,
  StyleSheet,
} from 'react-native'
import IconButton from '@components/common/IconButton'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { color } from '@styles/GlobalStyles'

export default function BottomSheet(props) {
  const { modalVisible, setModalVisible } = props
  const screenHeight = Dimensions.get('screen').height // 스크린 높이
  const panY = useRef(new Animated.Value(screenHeight)).current

  // 화면의 사이즈를 기반으로 BottomSheet의 y축 위치 결정
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1], // 위로 드래그시 움직이지 않도록
    outputRange: [0, 0, 1],
  })

  // BottomSheet 재위치
  const reset = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  })

  // BottomSheet 닫음
  const close = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  })

  const panResponders = useRef(
    PanResponder.create({
      // 화면 터치 감지
      onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => false,
      // 터치 or 드래그가 진행중일 때
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy)
      },
      // 터치가 끝날 때 실행
      onPanResponderRelease: (event, gestureState) => {
        // 터치 후 0이상 이동 & 속도가 1.5초과일 때 모달 닫음
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal()
        } else {
          reset.start() // 아니면 제자리로
        }
      },
    }),
  ).current

  useEffect(() => {
    if (props.modalVisible) {
      reset.start()
    }
  }, [props.modalVisible])

  const closeModal = () => {
    close.start(() => {
      setModalVisible(false)
    })
  }

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <Pressable style={bottomSheet.overlay} onPress={closeModal}>
        <View style={bottomSheet.background} />
        <Animated.View
          style={{
            ...bottomSheet.container,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={bottomSheet.buttons}>
            <IconButton
              text="최신순"
              icon1={
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color="black"
                />
              }
              dir="left"
              press={() => console.log('최신')}
              style={{
                container: bottomSheet.button,
              }}
            />
            <View style={bottomSheet.lineStyle} />
            <IconButton
              text="좋아요순"
              icon1={<Ionicons name="heart-sharp" size={24} color="black" />}
              dir="left"
              press={() => console.log('좋아요')}
              style={{
                container: bottomSheet.button,
              }}
            />
            <View style={bottomSheet.lineStyle} />
            <IconButton
              text="추천받기"
              icon1={
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={24}
                  color="black"
                />
              }
              dir="left"
              press={() => console.log('추천')}
              style={{
                container: bottomSheet.button,
              }}
            />
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  )
}

export const bottomSheet = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.modalBg,
  },
  container: {
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    width: '90%',
    height: '85%',
    backgroundColor: color.whiteGray,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 40,
  },
  lineStyle: {
    width: '80%',
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: color.gray,
    marginLeft: -30,
  },
})
