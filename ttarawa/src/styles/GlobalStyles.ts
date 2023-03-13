import { StyleSheet } from 'react-native'

export const color = {
  primary: '#2155CD',
  secondary: '#C9E2FF',
  white: '#FFFFFF',
  gray: '#B5B5B5',
  lightGray: '#D9D9D9',
  yellow: '#FEE500',
  red: '#F22929',
  green: '#00C73C',
  black: '#000000',
  shadow: '#000',
}

export const styles = StyleSheet.create({
  navTab: {
    color: color.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
})

export const index = StyleSheet.create({
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

export const recom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  header: {
    alignItems: 'center',
    flex: 1,
    marginTop: 70,
    backgroundColor: 'salmon',
  },
  title: {
    color: color.white,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    color: color.white,
  },
  buttonBox: {
    alignSelf: 'flex-end',
    backgroundColor: 'teal',
  },
  buttonText: {
    color: color.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 4,
    // marginHorizontal: 15,
    backgroundColor: 'black',
  },
  card: {
    width: '40%',
    backgroundColor: color.white,
    // width: '50%',
    // height: '45%',
    alignItems: 'center',
    borderRadius: 13,
    // paddingBottom: 10,
  },
  icon: {
    alignSelf: 'flex-end',
  },
})
