import * as Notifications from 'expo-notifications'

// 반납 알림
const returnNoti = (min: number) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: `따릉이 반납 시간까지 ${min}분 남았습니다.`,
      body: '근처 대여소를 확인해주세요.',
    },
    trigger: {
      seconds: 1,
      channelId: 'default',
    },
  })
}

// 날씨 알림
const API_KEY = 'b2501574efe30c6c8417a5e98c508ce9'
const WEATHER = {
  Clear: '맑음',
  Clouds: '흐림',
  Rain: '비',
  Atmosphere: '강풍',
  Snow: '눈',
  Drizzle: '비 조금',
  Thunderstorm: '천둥번개',
}

// Type
interface WeatherData {
  daily: {
    weather: {
      main: keyof typeof WEATHER
    }[]
  }[]
}

// 날씨 정보
const getWeather = async (
  lat: number,
  lng: number,
): Promise<keyof typeof WEATHER> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=alerts&appid=${API_KEY}&units=metric`,
  )
  const json: WeatherData = await response.json()
  return json.daily[0].weather[0].main
}

const weatherNoti = async () => {
  // store에서 경도 위도 가져오기
  const condition: keyof typeof WEATHER = await getWeather(
    37.501334548430816,
    127.03964423197847,
  )

  // 날씨에 따른 메세지
  let title: string = `오늘 날씨는 [${WEATHER[condition]}] 입니다.`
  let msg: string = '따라와 여행 전에 날씨를 확인해주세요.'

  if (condition === 'Clear') {
    title = '오늘은 따릉이 여행하기 좋은 날씨네요.'
    msg = '따라와와 함께 즐거운 여행 되세요.'
  }

  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: msg,
    },
    trigger: {
      seconds: 1, // 몇 초 후 알람이 울릴 건지
      channelId: 'default',
    },
  })
}

// TODO
// 앱종료했을 때 알람 전부 OFF
// deep link 연결 (근처 대여소 검색 & 표시로)

const noti = {
  returnNoti,
  weatherNoti,
}

export default noti
