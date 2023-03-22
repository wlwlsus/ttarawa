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

const fetchDetail = async (historyId: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/detail/${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
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

const sns = { fetchPost, fetchDetail, deletePost }
export default sns
