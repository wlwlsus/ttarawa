import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ReactNode } from 'react'
import { color } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'

interface Props {
  press?: (params: any) => any
  btn?: Element
  btnText?: string
  children: ReactNode
  icon: ReactNode
}

export default function MapCard({
  press,
  btn,
  btnText,
  children,
  icon,
}: Props) {
  return (
    <View style={[styles.container, styles.shadow]}>
      {/* 카드 내용물 */}
      <>{children}</>
      <Pressable onPress={press} style={styles.iconBtn}>
        <View style={[styles.iconContainer, styles.shadow]}>{icon}</View>
        <Text style={styles.btnText}>{btnText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  iconBtn: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 50,
  },
  btnText: {
    color: color.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  shadow: {
    shadowColor: color.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
