import apiRequest from '@utils/apiRequest'

// GET Request
const fetchRecom = async (
  category: number,
  page: number,
  size: number,
  lat: number,
  lng: number,
): Promise<object> => {
  return await apiRequest
    .get(
      `/spot?category=${category}&page=${page}&size=${size}&lat=${lat}&lng=${lng}`,
    )
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

const intro = { fetchRecom }

export default intro
