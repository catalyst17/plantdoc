import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Alert, Button, BackHandler } from 'react-native'
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify'

class PlantPage extends Component {    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick = () => {
        this.props.changeView();
        return true;
    }

  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Image
          style={styles.plantImage}
          source={{
            uri: 'https://www.provenwinners.com/sites/provenwinners.com/files/imagecache/500x500/ifa_upload/lycopersicon_garden_treasure_mono.jpg'
          }}
        />
        <Text style={styles.subtitle}>Tomato</Text>
        <View style={styles.btnGroup}>
          <View style={styles.btn}>
            <Button
              onPress={() => Alert.alert('Plant detail pressed')}
              title="Plant Detail"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => Alert.alert('Watering pressed')}
              title="Watering"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => Alert.alert('Watering pressed')}
              title="History"
              color="#3294e5"
            />
          </View>
          <View style={styles.btn}>
            <Button 
              onPress={() => Alert.alert('Watering pressed')}
              title="Album"
              color="#3294e5"
            />
          </View>
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
    fontSize: 20,
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

export default PlantPage