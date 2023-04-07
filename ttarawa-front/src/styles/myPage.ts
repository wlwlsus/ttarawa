import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const myPage = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginVertical: 5,
  },

  logout: {
    position: 'absolute',
    backgroundColor: color.secondary,
    right: 30,
    top: 50,
    padding: 7,
    borderRadius: 10,

    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  logoutText: {
    color: color.primary,
    fontWeight: 'bold',
  },
  img: {
    width: 40,
    height: 30,
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
    width: '100%',
    height: '100%',
    borderRadius: 100,
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

  addPhoto: {
    position: 'absolute',
    zIndex: 999,
    bottom: 10,
    right: 15,
  },

  rank: {
    marginTop: 80,
    fontSize: 20,
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

export const mylikes = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    paddingRight: 35,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    gap: 10,
  },
  img: {
    width: 180,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  contentContainer: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  textDir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textSize: {
    fontSize: 15,
  },
  blueText: {
    fontWeight: 'bold',
    color: color.primary,
  },
})

export const detailModal = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: color.modalBg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    height: '75%',
    width: '90%',
    backgroundColor: color.white,
    borderRadius: 10,
  },
})
