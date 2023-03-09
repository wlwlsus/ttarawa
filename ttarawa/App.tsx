import { View, Text, StyleSheet } from 'react-native'
import IconButton from './src/components/common/IconButton'
// import { store } from './src/store/index'
// import { Provider } from 'react-redux'

import { AntDesign } from '@expo/vector-icons'

export default function App() {
  const Ev1 = () => {
    console.log('1')
  }
  const Ev2 = () => {
    console.log('2')
  }
  const Ev3 = () => {
    console.log('3')
  }

  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.main}>따롱이 ㅋ</Text>
      <Text>공백</Text>

      <IconButton
        press={Ev1}
        icon1={<AntDesign name="star" size={24} color="black" />}
        style={'skyBtn'}
      ></IconButton>

      <IconButton
        press={Ev1}
        text={'아야어여오요우유'}
        icon1={<AntDesign name="star" size={24} color="black" />}
        style={'blueBtn'}
      ></IconButton>

      <IconButton
        press={Ev1}
        text={'아야어여오요우유'}
        dir={'left'}
        icon1={<AntDesign name="star" size={24} color="black" />}
        style={'blueSquare'}
      ></IconButton>

      <IconButton
        press={Ev1}
        text={'아야어여오요우유'}
        dir={'left'}
        icon1={<AntDesign name="star" size={24} color="black" />}
        icon2={<AntDesign name="star" size={24} color="black" />}
        style={'whiteBtn'}
      ></IconButton>
    </View>
    // </Provider>r
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
})
