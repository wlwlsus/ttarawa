import { StyleSheet, View, Text, Image } from 'react-native'
import { styles, color } from '@styles/GlobalStyles'
import { Octicons } from '@expo/vector-icons'

interface Props {
  index: number
  content: string
}

export default function IntroCard({ index, content }: Props) {
  const imgTable: any[] = [
    require('@assets/riding.png'),
    require('@assets/riding.png'),
    require('@assets/riding.png'),
    require('@assets/riding.png'),
  ]

  return (
    <View>
      <View style={card.dots}>
        {index === 0 ? (
          <Octicons name="dot-fill" size={24} color={color.secondary} />
        ) : (
          <Octicons name="dot" size={24} color={color.secondary} />
        )}
        {index === 1 ? (
          <Octicons name="dot-fill" size={24} color={color.secondary} />
        ) : (
          <Octicons name="dot" size={24} color={color.secondary} />
        )}
        {index === 2 ? (
          <Octicons name="dot-fill" size={24} color={color.secondary} />
        ) : (
          <Octicons name="dot" size={24} color={color.secondary} />
        )}
        {index === 3 ? (
          <Octicons name="dot-fill" size={24} color={color.secondary} />
        ) : (
          <Octicons name="dot" size={24} color={color.secondary} />
        )}
        {index === 4 ? (
          <Octicons name="dot-fill" size={24} color={color.secondary} />
        ) : (
          <Octicons name="dot" size={24} color={color.secondary} />
        )}
      </View>
      <View style={[card.container, styles.androidSafeArea]}>
        <Image source={imgTable[index]} style={card.img} />
        <Text style={card.text}>{content}</Text>
      </View>
    </View>
  )
}

const card = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  dots: {
    marginLeft: 40,
    marginTop: 60,
    marginBottom: 20,
  },
  img: {
    width: '80%',
    height: 350,
  },
  text: {
    marginVertical: 100,
    flex: 1,
    textAlign: 'center',
    color: color.whiteGray,
    fontSize: 18,
    lineHeight: 40,
  },
})
