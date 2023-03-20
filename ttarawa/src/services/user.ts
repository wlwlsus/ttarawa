import apiRequest from '@utils/apiRequest'

// GET Request
const fetchProfile = async (userId: number): Promise<object> => {
  return await apiRequest
    .get(`user/${userId}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchRide = async (userId: number, page: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/${userId}&page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchLikes = async (userId: number, page: number): Promise<object> => {
  return await apiRequest
    .get(`history/favorite/${userId}&page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const user = { fetchProfile, fetchRide, fetchLikes }

export default user
