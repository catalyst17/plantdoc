import React from 'react'
import { View, Text, StyleSheet, ImageURISource } from 'react-native'
import { Tile } from 'react-native-elements';

import { API, Auth, Storage } from 'aws-amplify'

import PlantPage from './PlantPage'

class PlantsTab extends React.Component {
  state = {
    plantSelected: false,
    plantId: '',
    plantName: '',
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

  getPlantsPic = async (plantId) => {
    let name = plantId + '/latest.jpg';
    const access = { level: "public" };
    let fileUrl = await Storage.get(name, access);
    return fileUrl;
  }

  render() {
    const { plantSelected, plantId, plantsArray, plantName } = this.state
    let tiles = <></>
    if (plantsArray) {
      tiles = plantsArray.map((plant) => {
        // (async () => {
        //   let imgUrl = await this.getPlantsPic(plant.plantId)
        //   console.log(imgUrl)
        // })()
        let imgUrl = 'https://plants142403-plantdoc.s3.amazonaws.com/public/' + plant.plantId + '/latest.jpg'
        return (
          <Tile
            key={plant.plantId}
            // imageSrc={require('../../assets/img/leaf.jpg')}
            imageSrc={{uri: imgUrl}}
            title={plant.title}
            containerStyle={styles.tile}
            contentContainerStyle={styles.tileTitleContainer}
            titleStyle={styles.titleText}
            onPress={() => {
              this.setState({plantId: plant.plantId, plantName: plant.title});
              this.changeView();
            }}
          >
            {plant.family !== 'NO_FAMILY' && 
              <Text style={styles.captionText}>
                from {plant.family}
              </Text>
            }
          </Tile>
        )
      })
    }
    
    return (
      <>
        {plantSelected && <PlantPage plantId={plantId} plantName={plantName} changeView={this.changeView}/>}

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
    fontSize: 27,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif-condensed',
    marginBottom: '2%'
  },
  tilesContainer: {
    justifyContent: 'space-between',
    padding: '1%',
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
  },
  titleText: {
    fontSize: 23,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginBottom: '0%'
  },
  captionText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif'
  } 
})

export default PlantsTab