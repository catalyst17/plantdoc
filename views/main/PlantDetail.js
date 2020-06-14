import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler} from 'react-native'
import { WebView } from 'react-native-webview'
import Amplify, {API} from 'aws-amplify';
import awsmobile from '../../aws-exports';
Amplify.configure(awsmobile);

class PlantDetail extends Component {    
  state = { 
    apiResponse: {
      "desired": {
        "light": 0
      },
      "reported": {
        "light": 0
      },
      "delta": {
        "light": 0
      }
    }
  };
  
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

  async getSensorData(){
    const path = "/hardware/sensors"; // you can specify the path
    const apiResponse = await API.post("hardware" , path); //replace the API name
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
  }
  
  render() {
    console.log('props: ', this.props)
    const apiResponse = JSON.parse(JSON.stringify(this.state.apiResponse))
    const desired = apiResponse.desired.light
    const reported = apiResponse.reported.light
    this.getSensorData()
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Recommended Status</Text>
        <Text style={styles.paragraph}>Temperature: {desired}</Text>
        <Text style={styles.paragraph}>Humidity: {desired}</Text>
        <Text style={styles.subtitle}>Reported Status</Text>
        <Text style={styles.paragraph}>Temperature: {reported}</Text>
        <Text style={styles.paragraph}>Humidity: {reported}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: 200,
    height: 200,
    marginTop: 30
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 50,
    paddingLeft: 50
  },
  subtitle: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginTop: 10,
    marginBottom: 10
  },
  paragraph: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'sans-serif',
    marginTop: 10,
    marginBottom: 10
  },
  livestream: {
    width: '80%',
    height: 100
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

export default PlantDetail