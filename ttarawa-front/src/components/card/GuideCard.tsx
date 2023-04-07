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
    require('@assets/guide/recom.png'),
    require('@assets/guide/path.png'),
    require('@assets/guide/rest.png'),
    require('@assets/guide/sns.png'),
    require('@assets/guide/badges.png'),
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
      <View style={card.imgContainer}>
        <Image resizeMode="stretch" source={imgTable[index]} style={card.img} />
      </View>
      <Text style={card.text}>{content}</Text>
    </Animated.View>
  )
}

const card = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 300,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  img: {
    borderRadius: 10,
    transform: [{ scale: 0.3 }],
  },

  text: {
    flex: 1,
    textAlign: 'center',
    color: color.whiteGray,
    fontSize: 17,
    lineHeight: 40,
  },
})
