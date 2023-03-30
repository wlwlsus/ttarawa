import { View } from 'react-native'
import { bottomSheet } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons'

export default function HistoryMenu() {
  return (
    <View style={bottomSheet.buttons}>
      <IconButton
        text="수정하기"
        icon1={<AntDesign name="edit" size={24} color="black" />}
        dir="left"
        press={() => console.log('수정')}
        style={{
          container: bottomSheet.button,
        }}
      />
      <View style={bottomSheet.lineStyle} />
      <IconButton
        text="삭제하기"
        icon1={<Feather name="trash-2" size={24} color="black" />}
        dir="left"
        press={() => console.log('삭제')}
        style={{
          container: bottomSheet.button,
        }}
      />
      <View style={bottomSheet.lineStyle} />
      <IconButton
        text="공유하기"
        icon1={
          <Ionicons name="ios-paper-plane-outline" size={24} color="black" />
        }
        dir="left"
        press={() => console.log('공유')}
        style={{
          container: bottomSheet.button,
        }}
      />
    </View>
  )
}
