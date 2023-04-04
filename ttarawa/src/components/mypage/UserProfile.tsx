import { Image, Pressable, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { myPage } from '@styles/myPage'
import { color } from '@styles/GlobalStyles'
import { useRecoilState } from 'recoil'
import { userState } from '@store/atoms'
import * as ImagePicker from 'expo-image-picker'
import user from '@services/user'

export default function UserProfile() {
  const [userInfo, setUserInfo] = useRecoilState(userState)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

  const uploadImg = async () => {
    // 갤러리 권한 요청
    if (!status?.granted) {
      const permit = await requestPermission()
      if (!permit.granted) {
        return null
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지 업로드만 허용
      allowsEditing: false,
      quality: 0.1, // 화질 (1이 최상)
      aspect: [1, 1],
    })

    // 업로드 취소할 경우
    if (result.canceled) {
      return null
    }

    // 이미지 업로드
    const img = result.assets[0]
    const formData = new FormData()

    formData.append('image', {
      uri: img.uri,
      name: `${img.fileName}.jpg`,
      type: 'image/jpeg',
    })

    user
      .updateProfile(formData)
      .then(() => {
        user.fetchProfile().then((res) => {
          setUserInfo(res)
        })
      })
      .catch(() =>
        Alert.alert(
          '이미지가 너무 커요!',
          '파일 크기는 5MB이하로 올려주세요.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        ),
      )
  }

  return (
    <Pressable onPress={uploadImg} style={[myPage.imgContainer, myPage.shadow]}>
      <Image
        resizeMode="cover"
        style={myPage.userImg}
        source={{ uri: userInfo.profile }}
      />
      <MaterialIcons
        name="add-a-photo"
        size={30}
        color={color.lightGray}
        style={myPage.addPhoto}
      />
    </Pressable>
  )
}
