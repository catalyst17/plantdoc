import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler } from 'react-native'
import Amplify, {API} from 'aws-amplify';
import awsmobile from '../../aws-exports';
Amplify.configure(awsmobile);

class PlantDoctor extends Component {    
  state = {
    diseaseName: "",
    apiResponse: null
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
    
  async triggerCamera(){
    const path = "/hardware/camera"; // you can specify the path
    const apiResponse = await API.post("hardware" , path); //replace the API name
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
  }

  render() {
    console.log('props: ', this.props)
    const {diseaseName} = this.state

    return (
      <View style={styles.container}>
        <Image
          style={styles.plantImage}
          source={{
            uri: 'https://www.provenwinners.com/sites/provenwinners.com/files/imagecache/500x500/ifa_upload/lycopersicon_garden_treasure_mono.jpg'
          }}
        />
        <Text style={styles.subtitle}>Tomato</Text>
        <View style={styles.textGroup}>
        <Text style={styles.subtitle}>Diagnose result: {diseaseName}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0
  },
  subtitle: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginTop: 10,
    marginBottom: 10
  },
  plantImage: {
    width: '100%',
    height: '45%',
  },
  btnGroup: {
    width: '100%',
    alignItems: 'center'
  },
  btn:{
    marginTop: 20,
    width: '80%',
    textAlign: 'center',
  }
})

export default PlantDoctor