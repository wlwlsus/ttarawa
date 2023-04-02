import { View } from 'react-native'
import { bottomSheet } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons'

interface Props {
  historyId?: number
  pressUpdate: (params: any) => any
  pressDelete: (params: any) => any
  pressShare: (params: any) => any
}

export default function HistoryMenu({
  historyId,
  pressUpdate,
  pressDelete,
  pressShare,
}: Props) {
  return (
    <View style={bottomSheet.buttons}>
      <IconButton
        text="수정하기"
        icon1={<AntDesign name="edit" size={24} color="black" />}
        dir="left"
        press={() => pressUpdate(historyId)}
        style={{
          container: bottomSheet.button,
        }}
      />
      <View style={bottomSheet.lineStyle} />
      <IconButton
        text="삭제하기"
        icon1={<Feather name="trash-2" size={24} color="black" />}
        dir="left"
        press={() => pressDelete(historyId)}
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
        press={() => pressShare(historyId)}
        style={{
          container: bottomSheet.button,
        }}
      />
    </View>
  )
}
