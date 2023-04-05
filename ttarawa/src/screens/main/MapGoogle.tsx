import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Image } from 'react-native'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { departState, destinState, markerListState } from '@store/atoms'

// 마커 커스터마이징 아이콘들
import bikeIcon from '@assets/Icon/bike.png'
import bikeIcon2 from '@assets/Icon/bike2.png'
import bikeIcon3 from '@assets/Icon/bike3.png'
import cafeIcon from '@assets/Icon/cafe.png'
import restaurantIcon from '@assets/Icon/restaurant.png'
import adventureIcon from '@assets/Icon/star.png'
import toiletIcon from '@assets/Icon/toilets.png'
import mapStyle from '@utils/customMapStyle.json' // 마커 지우는 옵션 json파일 가져오기

export default function MapGoogle({ setMarker, region }) {
  const [depart, setDepart] = useRecoilState(departState)
  const [markerList, setMarkerList] = useRecoilState(markerListState)
  const setDestin = useSetRecoilState(destinState)

  const handleMarkerPress = (index: number, marker: object) => {
    setMarker(index)
    const { lat, lng, name } = marker
    setDestin({ lat, lng, name })
  }

  return (
    <MapView
      style={map.container}
      showsUserLocation
      followsUserLocation
      region={region}
      provider={PROVIDER_GOOGLE} // iphone 설정
      // customMapStyle={mapStyle} // 이렇게 customMapStyle 속성에 JSON 파일을 추가합니다.
    >
      {markerList?.map((marker, index) => (
        <Marker
          key={marker.spotId}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng,
          }}
          // pinColor={color.primary}
          title={marker.name}
          description={
            marker.sub_category ? marker.sub_category : marker.subCategory
          }
          onPress={() => handleMarkerPress(index, marker)}
          icon={bikeIcon}
          style={{ width: 20, height: 20 }}
        />
      ))}
    </MapView>
  )
}
