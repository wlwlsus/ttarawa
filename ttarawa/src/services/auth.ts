import apiRequest from '@utils/apiRequest'
import AsyncStorage from '@react-native-async-storage/async-storage'

// refreshToken은 쿠키에 담겨서 보내짐

// POST Request
const getToken = async (accessToken: string): Promise<object> => {
  return await apiRequest
    .post(`user/token`, { accessToken, refreshToken })
    .then((res) => {
      // store에 refresh token & access token 저장
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const logout = async (accessToken: string): Promise<object> => {
  return await apiRequest
    .post(`user/logout`, {
      accessToken,
    })
    .then(async (res) => {
      await AsyncStorage.removeItem('token')
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err))
}

const auth = { getToken, logout }
export default auth
