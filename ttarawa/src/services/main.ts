import apiRequest from '@utils/apiRequest'

// GET Request
const fetchDestin = async (
  category: number,
  page: number,
  size: number,
  lat: number,
  lng: number,
): Promise<object> => {
  return await apiRequest
    .get(
      `/spot/near?category=${category}&page=${page}&size=${size}&lat=${lat}&lng=${lng}`,
    )
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err))
}

const fetchCategory = async (): Promise<number> => {
  return await apiRequest
    .get(`info/category`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const main = { fetchDestin, fetchCategory }

export default main
