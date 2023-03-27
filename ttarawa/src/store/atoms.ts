import { atom } from 'recoil'

export const userState = atom({
  key: 'userState', // 고유한 값
  default: {
    img: '',
    userName: '따옹이',
    rank: 'junior',
    riding: '32',
  },
})

export const departState = atom<object | undefined>({
  key: 'departState',
  default: {
    title: undefined,
    lat: undefined,
    lng: undefined,
  },
})

export const destinState = atom({
  key: 'destinState',
  default: {
    title: undefined,
    lat: undefined,
    lng: undefined,
  },
})

export const markerListState = atom({
  key: 'pinListStaste',
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
