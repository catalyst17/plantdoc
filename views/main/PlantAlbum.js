import React from 'react'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { Tile } from 'react-native-elements';

import { API, Auth } from 'aws-amplify'

import PlantPage from './PlantPage'

class PlantAlbum extends React.Component {
  state = {
    plantId: ''
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.updateView("plantPage");
    return true;
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
      console.log("response from getting the list of plants: " + plantsArray);
      this.setState({plantsArray});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { plantSelected, plantId } = this.state
    return (
      <>
        {plantSelected && <PlantPage plantId={plantId} changeView={this.changeView}/>}

        {!plantSelected && 
          <View style={styles.container}>
            <Text style={styles.subtitle}>My plants</Text>

            <View style={styles.tilesContainer}>
              <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                containerStyle={styles.tile}
                contentContainerStyle={styles.tileTitleContainer}
                onPress={() => {
                  this.setState({plantId: "tmt1"});
                  this.changeView();
                }}
              />
              <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                containerStyle={styles.tile}
                contentContainerStyle={styles.tileTitleContainer}
                onPress={() => {
                  this.setState({plantId: "tmt2"});
                  this.changeView();
                }}
              />
              <Tile
                imageSrc={require('../../assets/img/leaf.jpg')}
                title="Tomato"
                containerStyle={styles.tile}
                contentContainerStyle={styles.tileTitleContainer}
                onPress={() => {
                  this.setState({plantId: "tmt2"});
                  this.changeView();
                }}
              />
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
    width: '30%',
    aspectRatio: 1,
    marginTop: '3%'
  },
  tileTitleContainer: {
    alignItems: 'center',
    paddingTop: '0%',
    paddingBottom: '0%'
  } 
})

export default PlantAlbum