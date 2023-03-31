import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiRequest = axios.create({
  baseURL: 'http://j8a605.p.ssafy.io/api/v1/', // 서버 주소
  withCredentials: true,
})

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token')
  return token
}

// request 인터셉터
apiRequest.interceptors.request.use(
  // config : axios  객체를 이용해 요청을 보냈을 때의 모든 설정값
  async (config: any) => {
    const accessToken = await getToken()
    // accessToken이 없을 경우 헤더 없이 요청 (우리 프젝에서는 불필요)
    // if (!accessToken) return config

    return {
      ...config,
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    return response
  },
  // accesstoken 재발급 로직
  (error) => {
    console.log(error)
    // const { originalConfig, response } = error
    // if (response.errCode === 403) {
    //   // accessToken 재발급 요청
    //   const [url, method] = api('refreshToken')
    //   const config = { url, method }
    //   axios(config)
    //     // accessToken 재발급 성공
    //     .then((res) => {
    //       const newAccessToken = res.data.accessToken
    //       store.dispatch(setUserInfo(res.data))
    //       originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
    //       // 기존 요청을 새로운 accessToken으로 재요청
    //       return apiRequest(originalConfig)
    //     })
    //     // accessToken 재발급 실패
    //     .catch(() => {
    //       alert('다시 로그인 해주세요')
    //       return redirect('/auth/login')
    //     })
    // }
    return Promise.reject(error)
  },
)

export default apiRequest
