import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

class PlantsTab extends React.Component {

  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Text>Hello from Home</Text>
        <Text style={styles.link}>Here will be your plants...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  link: {
    color: 'blue',
    marginVertical: 5
  }
})

export default PlantsTab