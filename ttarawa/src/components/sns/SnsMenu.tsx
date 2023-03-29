import { View } from 'react-native'
import { bottomSheet } from '@styles/GlobalStyles'
import IconButton from '@components/common/IconButton'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import sns from '@services/sns'
import { departState } from '@store/atoms'
import { useRecoilValue } from 'recoil'

export default function SnsMenu() {
  const { fetchPost, fetchPostRecom } = sns
  const current = useRecoilValue(departState)

  // 최신순, 좋아요 게시물
  const getPost = (sort) => {
    fetchPost(sort, 10)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  // 추천 게시물
  const getPostRecom = () => {
    const { lat, lng } = current
    fetchPostRecom(10, lat, lng)
  }

  return (
    <View style={bottomSheet.buttons}>
      <IconButton
        text="최신순"
        icon1={
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="black"
          />
        }
        dir="left"
        press={() => getPost('createdDate,desc')}
        style={{
          container: bottomSheet.button,
        }}
      />
      <View style={bottomSheet.lineStyle} />
      <IconButton
        text="좋아요순"
        icon1={<Ionicons name="heart-sharp" size={24} color="black" />}
        dir="left"
        press={() => getPost('favoritesCount,desc')}
        style={{
          container: bottomSheet.button,
        }}
      />
      <View style={bottomSheet.lineStyle} />
      <IconButton
        text="추천받기"
        icon1={
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="black"
          />
        }
        dir="left"
        press={getPostRecom}
        style={{
          container: bottomSheet.button,
        }}
      />
    </View>
  )
}
