import apiRequest from '@utils/apiRequest'

// GET Request
const fetchProfile = async (): Promise<object> => {
  return await apiRequest
    .get('user')
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err))
}

// 주행기록 조회
const fetchRide = async (page: number): Promise<object> => {
  return await apiRequest
    .get(`history/post?page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

// 좋아요 목록 조회
const fetchLikes = async (page: number): Promise<object> => {
  return await apiRequest
    .get(`history/favorite?page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

// 게시물 1개 조회
const fetchDetail = async (historyId: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/detail/${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

// PUT Request
const updateNickname = async (nickname: string): Promise<object> => {
  return await apiRequest
    .put(`user/nickname`, { nickname })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const updateProfile = async (image: FormData): Promise<object> => {
  return await apiRequest
    .put(`user/profile`, { image })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// DELETE Request
const deleteProfile = async (): Promise<object> => {
  return await apiRequest
    .delete(`user/profile`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const user = {
  fetchProfile,
  fetchRide,
  fetchLikes,
  fetchDetail,
  updateNickname,
  updateProfile,
  deleteProfile,
}

export default user
