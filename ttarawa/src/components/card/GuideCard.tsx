import { StyleSheet, Text, Image, Dimensions, Pressable } from 'react-native'
import { color } from '@styles/GlobalStyles'

const screenHeight = Dimensions.get('window').height

interface Props {
  index: number
  content: string
}

export default function GuideCard({ index, content }: Props) {
  const imgTable: any[] = [
    require('@assets/riding.png'),
    require('@assets/riding.png'),
    require('@assets/riding.png'),
    require('@assets/riding.png'),
    require('@assets/profile.png'),
  ]

  return (
    <Pressable style={card.container}>
      <Image resizeMode="contain" source={imgTable[index]} style={card.img} />
      <Text style={card.text}>{content}</Text>
    </Pressable>
  )
}

const card = StyleSheet.create({
  container: {
    height: screenHeight,
    alignItems: 'center',
  },
  img: {
    flex: 0.4,
    marginBottom: 50,
  },
  text: {
    textAlign: 'center',
    color: color.whiteGray,
    fontSize: 18,
    lineHeight: 40,
  },
})
