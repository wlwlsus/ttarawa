import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const map = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    position: 'absolute',
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
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
  location: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    bottom: 0,
    margin: 15,
  },
  mapContainer: { flex: 1, zIndex: 0 },
})
