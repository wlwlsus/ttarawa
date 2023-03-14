import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const profile = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginVertical: 5,
  },

  imgContainer: {
    alignSelf: 'center',
    width: 170,
    height: 170,
    alignItems: 'center',
    marginTop: 60,
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
    flex: 0.45,
    backgroundColor: color.white,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 120,
    marginBottom: 5,
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },

  rank: {},
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
    fontSize: 23,
  },
  buttons: {
    flex: 0.8,
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
