import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const start = StyleSheet.create({
  introContainer: {
    flex: 1,
  },
  introBox: {
    flex: 3,
    justifyContent: 'center',
  },
  introLogo: {
    alignSelf: 'center',
    width: 300,
    height: 85,
  },
  introText: {
    marginTop: 20,
    textAlign: 'center',
    color: color.gray,
    fontSize: 17,
  },
  introButtons: {
    flex: 1,
  },
})
