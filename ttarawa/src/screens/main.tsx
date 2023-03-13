import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { color } from '~/styles/GlobalStyles'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import IconButton from '~/components/common/IconButton'

import { recom } from '~/styles/GlobalStyles'

export default function Main() {
  function Card(props: {
    name: string
    icon: Element
    distance: number
    cnt: number
  }) {
    return (
      <View style={recom.card}>
        <>
          <View style={recom.icon}>{props.icon}</View>
          {/* <Text style={styles.name}>{props.name}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.distance}>주행거리: 약 {props.distance}km</Text>
            <Text style={styles.distance}>
              최근 <Text style={styles.cnt}>{props.cnt}</Text>명이 방문했습니다
            </Text>
          </View> */}
          <IconButton
            style={'skyBtn'}
            dir={'left'}
            text={'여행 시작'}
            nonShadow={false}
            icon1={
              <MaterialCommunityIcons
                name="bike"
                size={20}
                color={color.primary}
              />
            }
          ></IconButton>
        </>
      </View>
    )
  }

  return (
    <View style={recom.container}>
      <View style={recom.header}>
        <Text style={recom.title}>여긴 어떤데이 ?</Text>
        <Text style={recom.text}>
          따옹이님 현재 위치 기반{'\n'}가장 인기있는 목적지입니다
        </Text>
      </View>

      {/* <Pressable style={recom.buttonBox}>
        <Text style={recom.buttonText}>목적지 직접 설정 {'>'}</Text>
      </Pressable> */}

      <ScrollView
        style={recom.scrollView}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
        <Card
          name={'혜진커피'}
          icon={<AntDesign name="doubleright" size={15} color={color.black} />}
          distance={10}
          cnt={30}
        ></Card>
      </ScrollView>
    </View>
  )
}

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: color.primary,
//     flex: 1,
//   },
//   header: {
//     flex: 1,
//     alignItems: 'center',
//     // marginVertical: 20,
//     marginTop: 110,
//   },
//   white: {
//     color: color.white,
//     fontSize: 17,
//     textAlign: 'center',
//   },
//   headText: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     marginBottom: 23,
//   },
//   goBtn: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingRight: 10,
//     marginVertical: 30,
//   },
//   // 스크롤 뷰
//   scrollView: {
//     flex: 4,
//     // marginHorizontal: 15,
//   },

//   // 카드 스타일
//   card: {
//     width: '50%',
//     backgroundColor: color.white,
//     // width: '50%',
//     // height: '45%',
//     alignItems: 'center',
//     borderRadius: 13,
//     paddingBottom: 10,
//   },
//   icon: {
//     alignSelf: 'flex-end',
//     marginTop: 14,
//     paddingRight: 12,
//   },
//   name: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     paddingVertical: 3,
//   },
//   cardBody: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   cnt: {
//     fontWeight: '700',
//   },
//   distance: {
//     paddingTop: 7,
//     fontSize: 17,
//   },
// })
