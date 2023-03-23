import apiRequest from '@utils/apiRequest'

// aixos interceptor request에 refreshtoken 담아서 보내야함!!!

// POST Request
const getToken = async (
  accessToken: string,
  refreshToken: string,
): Promise<object> => {
  return await apiRequest
    .post(`user/token`, { accessToken, refreshToken })
    .then((res) => {
      // store에 refresh token & access token 저장
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const logout = async (
  accessToken: string,
  refreshToken: string,
): Promise<object> => {
  return await apiRequest
    .post(`user/logout`, {
      accessToken,
      refreshToken,
    })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const auth = { getToken, logout }
export default auth
