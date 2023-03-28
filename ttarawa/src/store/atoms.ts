import { atom } from 'recoil'

// 유저 정보
export const userState = atom({
  key: 'userState', // 고유한 값
  default: {
    img: '',
    userName: '따옹이',
    rank: 'junior',
    riding: '32',
  },
})

// 출발
export const departState = atom<object>({
  key: 'departState',
  default: {
    title: undefined,
    lat: undefined,
    lng: undefined,
  },
})

// 도착
export const destinState = atom({
  key: 'destinState',
  default: {
    title: undefined,
    lat: undefined,
    lng: undefined,
  },
})

export const markerListState = atom({
  key: 'markerListStaste',
  default: [],
})

export const markerState = atom({
  key: 'markerState',
  default: {
    address: undefined,
    distance: undefined,
    lat: undefined,
    lng: undefined,
    name: undefined,
    spotId: undefined,
  },
})

// 길안내 좌표
export const pathInfo = atom({
  key: 'pathInfo',
  default: {
    type: '',
    geometry: {},
    properties: {},
  },
})
