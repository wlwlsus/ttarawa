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
