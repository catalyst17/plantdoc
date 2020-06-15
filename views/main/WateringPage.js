import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler, ToastAndroid} from 'react-native'
import { WebView } from 'react-native-webview'
import Amplify, {API} from 'aws-amplify';
import awsmobile from '../../aws-exports';
import { ActionButton } from '../../components'

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

  showToast(msg){
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  async triggerWaterMotor(){
    const path = "/hardware/watering"; // you can specify the path
    const apiResponse = await API.post("hardware" , path); //replace the API name
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
    this.showToast(apiResponse);
  }
  
  render() {
    console.log('props: ', this.props)
    
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <WebView source = {{uri: 'http://192.168.43.64:8080/?action=stream'}} />
        </View>
        <Text style={styles.subtitle}>Tomato</Text>
        <View style={styles.btn}>
            <ActionButton
              onPress={this.triggerWaterMotor.bind(this)}
              title="Watering"
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    // alignSelf: 'stretch',
    width: '100%',
    height: 300,
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