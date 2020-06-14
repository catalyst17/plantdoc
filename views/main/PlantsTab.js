import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements';

import { API, Auth } from 'aws-amplify'

import PlantPage from './PlantPage'

class PlantsTab extends React.Component {
  state = {
    plantSelected: false,
    plantId: '',
    plantsArray: []
  }

  changeView = () => {
    const { plantSelected } = this.state
    if (plantSelected) {
      this.setState({plantId: ''})
      this.getPlants()
    }
    this.setState({plantSelected: !plantSelected})
  }

  componentDidMount() {
    this.setState({ plantSelected: false, plantId: '' })
    this.getPlants()
  }

  async getPlants() {
    const user = await Auth.currentAuthenticatedUser()
    const path = "/plants";
    let userInfo = {
      body: {
        "username": user.getUsername()
      }
    }
    try {
      const plantsArray = await API.post("plants", path, userInfo);
      console.log("response from getting the list of plants: ", plantsArray);
      this.setState({plantsArray});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { plantSelected, plantId, plantsArray } = this.state
    let tiles = <></>
    if (plantsArray) {
      tiles = plantsArray.map((plant) => (
        <Tile
          key={plant.plantId}
          imageSrc={require('../../assets/img/leaf.jpg')}
          title={plant.title}
          containerStyle={styles.tile}
          contentContainerStyle={styles.tileTitleContainer}
          onPress={() => {
            this.setState({plantId});
            this.changeView();
          }}
        />
      ))
    }
    
    return (
      <>
        {plantSelected && <PlantPage plantId={plantId} changeView={this.changeView}/>}

        {!plantSelected && 

          <View style={styles.container}>

            <Text style={styles.subtitle}>My plants</Text>

            <View style={styles.tilesContainer}>
              {tiles}
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
    marginTop: '10%'
  },
  subtitle: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginBottom: '2%'
  },
  tilesContainer: {
    justifyContent: 'space-between',
    padding: 5,
    width: '100%',
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  tile: {
    width: '49%',
    aspectRatio: 1,
    marginTop: '3%'
  },
  tileTitleContainer: {
    alignItems: 'center',
    paddingTop: '0%',
    paddingBottom: '0%'
  } 
})

export default PlantsTab