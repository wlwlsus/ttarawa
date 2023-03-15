import { StyleSheet } from 'react-native'

export const color = {
  primary: '#2155CD',
  secondary: '#C9E2FF',
  white: '#FFFFFF',
  gray: '#B5B5B5',
  lightGray: '#D9D9D9',
  yellow: '#FEE500',
  red: '#F22929',
  green: '#00C73C',
  black: '#000000',
  shadow: '#000',
}

export const styles = StyleSheet.create({
  navTab: {
    color: color.primary,
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  androidSafeArea: {
    marginTop: 30,
  },
})
