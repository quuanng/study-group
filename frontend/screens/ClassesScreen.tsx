import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ClassesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Classes Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
