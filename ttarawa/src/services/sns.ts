import apiRequest from '@utils/apiRequest'

// GET Request
const fetchPost = async (sort: string, page: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/all?sort=${sort}&page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchPostRecom = async (
  size: number,
  lat: number,
  lng: number,
): Promise<object> => {
  return await apiRequest
    .get(`history/post/recommend?size=${size}&lat=${lat}&lng=${lng}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const fetchDetail = async (historyId: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/detail/${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

// POST Request
const savePost = async (image: FormData, content: object): Promise<object> => {
  return await apiRequest
    .post(`history/post`, { image, historyReqDto: content })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const saveLike = async (historyId: number): Promise<object> => {
  return await apiRequest
    .post(`history/favorite?history_id=${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// PUT Request
const updatePost = async (
  historyId: number,
  personal: number, // 공개여부
  content: string,
): Promise<object> => {
  return await apiRequest
    .put(`history/post?history_id=${historyId}`, { personal, content })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// DELETE Request
const deletePost = async (historyId: number): Promise<object> => {
  return await apiRequest
    .delete(`history/posty?history_id=${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const deleteLike = async (historyId: number): Promise<object> => {
  return await apiRequest
    .delete(`history/favorite?history_id=${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

const sns = {
  fetchPost,
  fetchPostRecom,
  fetchDetail,
  savePost,
  saveLike,
  updatePost,
  deletePost,
  deleteLike,
}
export default sns
