import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native'

import { Auth } from 'aws-amplify'

import { Input, ActionButton } from '../../components'

class SettingsTab extends React.Component {
  state = {
    family: '',
    familyName: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  componentDidMount() {
    this.checkFamily()
  }

  checkFamily = async () => {
    try {
      //const user = await AmplifyAuth.currentAuthenticatedUser()
      this.setState({ family: 'no' })
    } catch (err) {
      console.log('you should not see it')
    }
  }

  signOut = async () => {
    try {
      await Auth.signOut()
      console.log('signed out')
      this.props.updateView('auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  }

  createFamily = async () => {
    const { familyName } = this.state
    // try {
    //   await Auth.signIn(username, password)
    //   console.log('successfully signed in')
    //   this.props.updateView('main')
    // } catch (err) {
    //   console.log('error signing in...', err)
    // }
  }

  render() {
    const { family } = this.state
    console.log(family)
    return (
      <>
        { family === 'no' && 
            <View style={styles.container} >
              <Text style={styles.subtitle}>You haven't created a family yet, want to?</Text>
              <View style={styles.button}>
                <ActionButton
                  title='Yes!'
                  onPress={() => this.setState({ family: 'in progress'})}
                />
              </View>

              <View style={styles.bottom}>
                <ActionButton
                  title='Sign Out'
                  onPress={this.signOut} />
              </View>
            </View> }
        
        { family === 'in progress' && 
            <KeyboardAvoidingView style={styles.container} behavior={Platform.Os == "ios" ? "padding" : "height"}>
              <Input
                onChangeText={this.onChangeText}
                type='familyName'
                placeholder='Family name'
              />
              <View style={styles.button}>
                <ActionButton
                  title='Create'
                  onPress={this.createFamily}
                />
              </View>

              <View style={styles.bottom}>
                <ActionButton
                  title='F*ck go back'
                  onPress={() => this.setState({ family: 'no'})} />
              </View>
            </KeyboardAvoidingView> }

        { family === 'yes' && 
            <KeyboardAvoidingView style={styles.container} behavior={Platform.Os == "ios" ? "padding" : "height"}>
              
            </KeyboardAvoidingView> }
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width * 0.9,
    marginBottom: 17
  },
  button: {
    width: Dimensions.get('window').width * 0.9
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
    marginBottom: 10
  }
})

export default SettingsTab