// 주행시간
// second(초단위) 데이터를 시간, 분으로 변환(string)
export const convertToTime = (seconds: number): string => {
  let minutes: number
  let hours: number
  let time: string

  // 1시간 넘어가면,
  if (seconds >= 3600) {
    hours = Math.floor(seconds / 3600)
    minutes = Math.floor((seconds % 3600) / 60)
    return minutes ? `${hours}시간 ${minutes}분` : `${hours}시간`

    // 1분 넘어가면,
  } else if (seconds >= 60) {
    minutes = Math.floor(seconds / 60)
    seconds %= 60
    return seconds ? `${minutes}분 ${seconds}초` : `${minutes}분`

    // 1분도 되지 않는다면,
  } else {
    return `${seconds}초`
  }
}

// 주행기록
// 미터 단위를 1000 이상이면, Km단위(소수점 2자리까지)로 변경
export const convertToKm = (meters: number) => {
  let distance: string
  if (meters >= 1000) {
    distance = `${(meters / 1000).toFixed(2)} km`
  } else {
    distance = `${meters} m`
  }
  return distance
}
