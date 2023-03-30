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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  loginLogo: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
  },
})

export const recom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingHorizontal: 10,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    color: color.white,
    fontSize: 27,
    fontWeight: '500',
    paddingLeft: 10,
    marginBottom: 15,
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
  scrollcontent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
  },
})

export const guide = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingHorizontal: 40,
    position: 'relative',
  },
  index: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  scroll: {
    paddingTop: 240,
  },
  socialLogin: {
    backgroundColor: color.white,
    position: 'absolute',
    bottom: 100,
  },
  back: {
    backgroundColor: color.white,
    position: 'absolute',
    bottom: 100,
    right: 40,
  },
})
