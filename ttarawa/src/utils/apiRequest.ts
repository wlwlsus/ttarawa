import axios from 'axios'
// accessToken은 recoil store에서 가져오기

const apiRequest = axios.create({
  baseURL: 'http://j8a605.p.ssafy.io/api/v1/', // 서버 주소
  withCredentials: true,
})

// request 인터셉터
apiRequest.interceptors.request.use(
  // config : axios  객체를 이용해 요청을 보냈을 때의 모든 설정값
  (config) => {
    // 토큰 발급 받으면 다음 코드 써야함
    // const accessToken = state.token.accessToken
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrkZDshozsm5AiLCJ1c2VySWQiOjQxLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjgwNDk2MDE3fQ.kdD7R1ZINNCMVxoUTab85CZGeIEbpnf5m4RMB3fbXd8'

    // accessToken이 없을 경우 헤더 없이 요청 (우리 프젝에서는 불필요)
    // if (!accessToken) return config

    return {
      ...config,
      headers: { Authorization: `Bearer ${accessToken}` },
    }

    // return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공
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
