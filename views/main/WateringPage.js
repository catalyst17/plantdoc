import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler} from 'react-native'
import { WebView } from 'react-native-webview'
import Amplify, {API} from 'aws-amplify';
import awsmobile from '../../aws-exports';
Amplify.configure(awsmobile);

class WateringPage extends Component {    
  state = { apiResponse: null };
  
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

  async triggerWaterMotor(){
    const path = "/hardware/watering"; // you can specify the path
    const apiResponse = await API.post("hardware" , path); //replace the API name
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
  }
  
  render() {
    console.log('props: ', this.props)
    
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <WebView source = {{uri: 'http://192.168.43.192:8080/?action=stream'}} />
        </View>
        <Text style={styles.subtitle}>Tomato</Text>
        <View style={styles.btn}>
            <Button 
              onPress={this.triggerWaterMotor.bind(this)}
              title="Watering"
              color="#3294e5"
            />
            <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    // alignSelf: 'stretch',
    width: 200,
    height: 200,
    marginTop: 30
  },
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

export default WateringPage