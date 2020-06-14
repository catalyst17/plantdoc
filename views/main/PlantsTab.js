import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements';

import { API, Auth } from 'aws-amplify'

import PlantPage from './PlantPage'

class PlantsTab extends React.Component {
  state = {
    plantSelected: false,
    plantId: '',
    apiResponse: null
  }

  changeView = () => {
    const { plantSelected } = this.state
    if (plantSelected) this.setState({plantId: ''})
    this.setState({plantSelected: !plantSelected})
  }

  componentDidMount() {
    this.setState({ plantSelected: false, plantId: '' })
  }

  // Create a new Plant (only tests for now)
  async savePlant() {
    let newNote = {
      body: {
        "NoteTitle": "My first note!",
        "NoteContent": "This is so cool!",
        "NoteId": this.state.noteId
      }
    }
    const path = "/Notes";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("NotesCRUD", path, newNote)
      console.log("response from saving note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }

  // noteId is the primary key of the particular record you want to fetch
  async getNote() {
    const path = "/Notes/object/" + this.state.noteId;
    try {
      const apiResponse = await API.get("NotesCRUD", path);
      console.log("response from getting note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { plantSelected, plantId } = this.state
    console.log('props: ', this.props)
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