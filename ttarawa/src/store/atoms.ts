import { atom } from 'recoil'

// 유저 정보
export const userState = atom({
  key: 'userState', // 고유한 값
  default: {
    nickname: undefined,
    badgeName: undefined,
    totalDistance: undefined,
    profile: undefined,
  },
})

// 출발
export const departState = atom<object>({
  key: 'departState',
  default: {
    name: undefined,
    lat: undefined,
    lng: undefined,
  },
})

// 도착
export const destinState = atom({
  key: 'destinState',
  default: {
    name: undefined,
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
  default: 0,
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

// SNS 모달
export const snsModal = atom({
  key: 'snsModalState',
  default: false,
})

export const locationListState = atom({
  key: 'locationListState',
  default: [],
})
