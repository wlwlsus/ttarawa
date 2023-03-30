import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const myPage = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginVertical: 5,
  },

  imgContainer: {
    alignSelf: 'center',
    width: 190,
    height: 190,
    alignItems: 'center',
    marginTop: 90,
    justifyContent: 'center',
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.secondary,
    borderRadius: 100,
    position: 'absolute',
    elevation: 3,
    zIndex: 3,
  },

  userImg: {
    width: 100,
    height: 100,
  },

  userContainer: {
    flex: 0.5,
    backgroundColor: color.white,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 190,
    marginBottom: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  rank: {
    marginTop: 80,
    fontSize: 17,
  },
  nameContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  riding: {
    fontSize: 25,
  },
  buttons: {
    flex: 0.7,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },

  ridingData: {
    color: color.primary,
    fontWeight: 'bold',
  },

  logo: {
    width: 80,
    height: 20,
  },

  shadow: {
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})

export const mylikes = StyleSheet.create({})
