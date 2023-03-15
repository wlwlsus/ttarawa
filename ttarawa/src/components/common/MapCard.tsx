import { StyleSheet, Text, View, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'
import IconButton from './IconButton'

export default function Card(props: {
  press?: (params: any) => any
  btn?: Element
  btnText?: string
  children?: Element
  style?: string
  icon?: Element
}) {
  return (
    <View style={styles.container}>
      {/* 카드 내용물 */}
      <>{props.children}</>
      {/* 카드 아이콘 버튼 */}
      <Pressable style={styles.iconBtn}>
        <IconButton style={props.style} bg={'blue'} icon1={props.icon} />
        <Text style={styles.btnText}>{props.btnText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderRadius: 15,
  },
  iconBtn: {
    marginHorizontal: 25,
    marginVertical: 10,
    paddingVertical: 20,
  },

  btnText: {
    color: color.primary,
    fontSize: 13,
    fontWeight: '600',
  },
})
