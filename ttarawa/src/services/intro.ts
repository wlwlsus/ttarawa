import apiRequest from '@utils/apiRequest'

// GET Request
const fetchRecom = async (
  lat: number,
  lng: number,
  size: number,
): Promise<object> => {
  return await apiRequest
    .get(`/spot?lat=${lat}&lng=${lng}&size=${size}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err))
}

const intro = { fetchRecom }

export default intro
