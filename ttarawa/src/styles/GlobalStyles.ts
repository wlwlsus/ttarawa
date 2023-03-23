import { StyleSheet } from 'react-native'

export const color = {
  primary: '#2155CD',
  secondary: '#C9E2FF',
  white: '#FFFFFF',
  gray: '#B5B5B5',
  lightGray: '#D9D9D9',
  whiteGray: '#EFEFEF',
  yellow: '#FEE500',
  red: '#F22929',
  green: '#00C73C',
  black: '#000000',
  shadow: '#000',
  modalBg: 'rgba(0, 0, 0, 0.4)',
}

export const styles = StyleSheet.create({
  navTab: {
    color: color.primary,
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  androidSafeArea: {
    marginTop: 30,
  },
})

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
    gap: 24,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'flex-start',
  },
  lineStyle: {
    width: '120%',
    borderWidth: 0.2,
    borderColor: color.gray,
    marginLeft: -30,
  },
})
