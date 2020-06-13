import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements';

import { Auth } from 'aws-amplify'

import PlantPage from './PlantPage'

class PlantsTab extends React.Component {
  state = {
    plantSelected: false
  }

  changeView = () => {
    const { plantSelected } = this.state
    this.setState({plantSelected: !plantSelected})
  }

  componentDidMount() {
    this.setState({ plantSelected: false })
  }

  render() {
    const { plantSelected } = this.state
    console.log('props: ', this.props)
    return (
      <>
        {plantSelected && <PlantPage changeView={this.changeView}/>}

        {!plantSelected && 
          <View style={styles.container}>
            <Text style={styles.subtitle}>My plants</Text>

            <View style={styles.tilesContainer}>
              <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                imageProps={styles.image}
                containerStyle={styles.tile}
                onPress={this.changeView}
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
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    width: '90%',
    flexDirection:'row'
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