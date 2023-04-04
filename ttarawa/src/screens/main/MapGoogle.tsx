import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { departState, destinState, markerListState } from '@store/atoms'

export default function MapGoogle({ setMarker }) {
  const [depart, setDepart] = useRecoilState(departState)
  const [markerList, setMarkerList] = useRecoilState(markerListState)
  const setDestin = useSetRecoilState(destinState)

  return (
    <MapView
      style={map.container}
      initialRegion={{
        latitude: depart.lat,
        longitude: depart.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      provider={PROVIDER_GOOGLE} // iphone 설정
    >
      {markerList?.map((marker, index) => (
        <Marker
          key={marker.spotId}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng,
          }}
          pinColor={color.primary}
          title={marker.name}
          description={
            marker.sub_category ? marker.sub_category : marker.subCategory
          }
          onPress={() => setMarker(index)}
        />
      ))}
    </MapView>
  )
}
