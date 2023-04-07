import * as Location from 'expo-location'

// 위도, 경도로 도로명 주소 출력
export const geocoding = async (lat: number, lng: number, setAddr: any) => {
  const headers = {
    'Content-Type': 'application/json',
    appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
    // appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
  }

  const response = await fetch(
    // EPSG3857  - Google Mercator
    // WGS84GEO  - 경위도
    `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result&coordType=WGS84GEO&addressType=A10&lon=${lng}&lat=${lat}`,
    {
      method: 'GET',
      headers: headers,
    },
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // 행정동, 법정동, 도로명 세가지로 생김
      const addrs: string[] = data.addressInfo.fullAddress.split(',')
      const name = addrs[addrs.length - 1] // 도로명 가져옴

      setAddr({ name, lat, lng })
    })
    .catch(function (error) {
      console.log('Fetch Error :-S', error)
    })
}
