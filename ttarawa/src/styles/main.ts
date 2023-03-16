import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const map = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  inputs: {
    flex: 1,
    marginRight: 5,
    gap: 5,
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 8,
    gap: 10,
  },
})
