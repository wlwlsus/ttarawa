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

  // Webview style
  mapContainer: {
    flex: 1,
    zIndex: 0,
  },
})

export const path = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pathCard: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 10,
  },
})

export const navi = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  timer: {
    width: 140,
    padding: 10,
    backgroundColor: color.white,
    position: 'absolute',
    zIndex: 999,
    left: 10,
    top: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  time: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  bottomBar: {
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 15,
  },
  info: {
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  infoContent: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  categories: {
    zIndex: 999,
    position: 'absolute',
    right: 10,
    top: 10,
    gap: 10,
  },
})
