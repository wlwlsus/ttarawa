import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'

import { useState } from 'react'

import Input from '@components/common/Input'
import Button from '@components/common/Button'

export default function Index() {
  const [name, setName] = useState('')

  return (
    <View style={styles.container}>
      <Button text="Click" style="blue" press={() => console.log(name)} />
      <Input
        placeholder="따옹이"
        label="출발 |"
        value={name}
        setValue={setName}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
})
