import React, { Fragment, Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'
import { Picker } from '@react-native-community/picker'

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    name: '',
    gender: 'female',
    authCode: '',
    stage: 0
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  signUp = async () => {
    const {
      username, password, email, name, gender
    } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, name, gender }})
      console.log('successful sign up..')
      this.setState({ stage: 1 })
    } catch (err) {
      console.log('error signing up...', err)
    }
  }

  confirmSignUp = async () => {
    const { username, authCode } = this.state
    try {
      await Auth.confirmSignUp(username, authCode)
      this.props.toggleAuthType('showSignIn')
    } catch (err) {
      console.log('error signing up...', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.stage === Number(0) && (
            <Fragment>
              <Input
                placeholder='Username'
                type='username'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Password'
                type='password'
                onChangeText={this.onChangeText}
                secureTextEntry
              />
              <Input
                placeholder='Name'
                type='name'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Email'
                type='email'
                onChangeText={this.onChangeText}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={(this.state && this.state.gender)}
                  style={styles.picker}
                  mode='dropdown'

                  onValueChange={(itemValue) => 
                    this.setState({gender: itemValue})
                    // if (itemValue !== this.state.gender) {}
                  }>

                  <Picker.Item label=" Female" value="female" />
                  <Picker.Item label=" Male" value="male" />
                </Picker>
              </View>

              <ActionButton
                title='Sign Up'
                onPress={this.signUp}
              />
            </Fragment>
          )
        }

        {
          this.state.stage === Number(1) && (
            <Fragment>
              <Input
                placeholder='Confirmation Code'
                type='authCode'
                onChangeText={this.onChangeText}
              />
              <ActionButton
                title='Confirm Sign Up'
                onPress={this.confirmSignUp}
              />
            </Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fcf3db',
    marginBottom: 10,
    overflow: 'hidden'
  },
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45
  },
  picker: {
    backgroundColor: '#fcf3db',
    height: 45,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'sans-serif',
    color: '#e2a45b'
  }
})

export default SignUp