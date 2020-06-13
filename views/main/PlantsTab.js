import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements';

import { Auth } from 'aws-amplify'
import { Tile } from 'react-native-elements';

class PlantsTab extends React.Component {

  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>My plants</Text>

        <Tile
          imageSrc={require('../../logo.png')}
          title="Tomato"
          contentContainerStyle={{ height: 30, alignItems:'center' }}
        />
        
        
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

export default PlantsTab