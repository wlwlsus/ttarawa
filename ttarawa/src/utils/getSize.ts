// 이미지 사이즈를 리턴하는 함수

import { Image } from 'react-native'

export default async function getImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height })
      },
      (error) => {
        reject(error)
      },
    )
  })
}
