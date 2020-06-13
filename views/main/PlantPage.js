import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

class PlantPage extends Component {

  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Tomato</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 75
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginBottom: 10
  }
})

export default PlantPage