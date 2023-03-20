import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const start = StyleSheet.create({
  introContainer: {
    flex: 1,
    backgroundColor: color.white,
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
    paddingHorizontal: 20,
    flex: 1,
    gap: 5,
  },
})

export const login = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: color.primary,
  },
  headBox: {
    paddingVertical: 50,
    marginTop: 140,
    marginBottom: 55,
  },
  headText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  headLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 200,
    width: 250,
    marginBottom: 40,
  },
  loginBox: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  loginLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 70,
    width: 70,
  },
})

export const recom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    flex: 0.2,
    marginVertical: 30,
  },
  title: {
    color: color.white,
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: color.white,
  },
  buttonText: {
    color: color.white,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 5,
  },
  scrollView: {
    flex: 0.7,
  },
  scrollcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  // card: {
  //   width: 162,
  //   backgroundColor: color.white,
  //   alignItems: 'center',
  //   borderRadius: 13,
  //   margin: 11,
  //   padding: 10,
  //   shadowColor: color.shadow,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 5,
  // },
  // icon: {
  //   alignSelf: 'flex-end',
  // },

  // name: {
  //   fontSize: 19,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // cardBody: {
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingTop: 3,
  // },
  // cnt: {
  //   fontWeight: '700',
  // },
  // distance: {
  //   fontSize: 14,
  //   paddingVertical: 2,
  // },
})
