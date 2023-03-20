import apiRequest from '@utils/apiRequest'

// GET Request
const fetchDetail = async (historyId: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/detail/${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const sns = { fetchDetail }
export default sns
