import apiRequest from '@utils/apiRequest'

// GET Request
const fetchProfile = async (): Promise<object> => {
  return await apiRequest
    .get(`user`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchRide = async (page: number): Promise<object> => {
  return await apiRequest
    .get(`history/post?page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchLikes = async (page: number): Promise<object> => {
  return await apiRequest
    .get(`history/favorite?page=${page}`)
    .then(() => {
      return Promise
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
  updateNickname,
  deleteProfile,
}

export default user
