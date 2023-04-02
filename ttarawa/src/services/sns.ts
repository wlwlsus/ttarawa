import apiRequest from '@utils/apiRequest'

// GET Request
// 게시물 조회
const fetchPost = async (sort: string, page: number): Promise<object> => {
  return await apiRequest
    .get(`history/post/all?sort=${sort}&page=${page}`)
    .then((res) => {
      return Promise.resolve(res.data.result)
    })
    .catch((err) => Promise.reject(err.data))
}

// 게시물 추천순 조회
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

// POST Request
// 게시물 저장
const savePost = async (image: FormData, content: object): Promise<object> => {
  return await apiRequest
    .post(`history/post`, { image, historyReqDto: content })
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// 좋아요 등록
const saveLike = async (historyId: number): Promise<object> => {
  return await apiRequest
    .post(`history/favorite?history_id=${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// PUT Request
// 게시물 수정
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
// 게시물 삭제
const deletePost = async (historyId: number): Promise<object> => {
  return await apiRequest
    .delete(`history/post?history_id=${historyId}`)
    .then((res) => {
      return Promise.resolve(res.data.message)
    })
    .catch((err) => Promise.reject(err.data))
}

// 좋아요 제거
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
  savePost,
  saveLike,
  updatePost,
  deletePost,
  deleteLike,
}
export default sns
