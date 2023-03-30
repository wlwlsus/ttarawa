// 도로명 주소로 위도, 경도 출력
export const geocoding = async (name: string, setAddr: any) => {
  const headers = {
    'Content-Type': 'application/json',
    appKey: 'R0lrpUGdtX3BeC8w14Ep5aKnOI9vGzwF91MiDzaA',
    // appKey: 'Bzm8PTx5KS6SDM756LcMP1UkoduymX3h5Qkkpg1c',
  }

  const response = await fetch(
    `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result&coordType=WGS84GEO&fullAddr=${name}`,
    {
      method: 'GET',
      headers: headers,
    },
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // string으로 들어오기 때문에, number로 형변환
      const lat = Number(data.coordinateInfo.coordinate[0].newLat)
      const lng = Number(data.coordinateInfo.coordinate[0].newLon)
      setAddr({ name, lat, lng })
      // console.log(name, lat, lng)
    })
    .catch(function (error) {
      console.log('Fetch Error :-S', error)
    })
}
