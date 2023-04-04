import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  Animated,
} from 'react-native'
import { useRef, useEffect } from 'react'
import { color } from '@styles/GlobalStyles'

const screenHeight = Dimensions.get('window').height

interface Props {
  index: number
  content: string
}

export default function GuideCard({ index, content }: Props) {
  const imgTable: any[] = [
    require('@assets/guide/recom.jpg'),
    require('@assets/ttarawa/riding.png'),
    require('@assets/guide/rest.jpg'),
    require('@assets/ttarawa/riding.png'),
    require('@assets/ttarawa/profile.png'),
    require('@assets/ttarawa/profile.png'),
  ]

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, index])

  return (
    <Animated.View style={[card.container, { opacity: fadeAnim }]}>
      <Image resizeMode="contain" source={imgTable[index]} style={card.img} />

      <Text style={card.text}>{content}</Text>
    </Animated.View>
  )
}

const card = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 50,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flex: 0.4,
    width: '80%',
    marginBottom: 50,
    borderRadius: 5,
  },

  text: {
    textAlign: 'center',
    color: color.whiteGray,
    fontSize: 17,
    lineHeight: 40,
  },
})
