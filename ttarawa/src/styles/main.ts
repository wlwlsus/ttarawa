import { StyleSheet, Dimensions } from 'react-native'
import { color } from '@styles/GlobalStyles'
const SCREEN_WIDTH = Dimensions.get('window').width

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
  content: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    bottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 8,
    gap: 10,
  },
  location: {
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    padding: 10,
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    zIndex: 0,
  },
})
