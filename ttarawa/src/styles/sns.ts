import { StyleSheet, Dimensions } from 'react-native'
import { color } from '@styles/GlobalStyles'
const SCREEN_HEIGHT = Dimensions.get('window').height

export const header = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 120,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 35,
  },
})

export const sns = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
})
