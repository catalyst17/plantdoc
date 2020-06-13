import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements';

import { Auth } from 'aws-amplify'

import { PlantPage } from './PlantPage'

class PlantsTab extends React.Component {
  state = {
    plantSelected: false
  }

  componentDidMount() {
    this.setState({ plantSelected: false })
  }

  render() {
    const { plantSelected } = this.state
    console.log('props: ', this.props)
    return (
      <>
        {plantSelected && <PlantPage />}

        {!plantSelected && 
          <View style={styles.container}>
            <Text style={styles.subtitle}>My plants</Text>

            <View style={styles.tilesContainer}>
              <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                imageProps={styles.image}
                contentContainerStyle={styles.tile}
                onPress={() => this.setState({plantSelected: true})}
              />
              {/* <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                contentContainerStyle={styles.tile}
              /> */}
            </View>
            
            
          </View>}
      </>
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
  },
  tilesContainer: {
    flexDirection:'row',
    alignItems: "center"
  },
  tile: {
    width: '50%'
  },
  image: {
    width: 50,
    height: 50
  }  
})

export default PlantsTab