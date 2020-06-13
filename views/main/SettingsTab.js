import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

class SettingsTab extends React.Component {

  signOut = async () => {
    try {
      await Auth.signOut()
      console.log('signed out')
      this.props.updateView('auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  }

  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Text onPress={this.signOut} style={styles.link}>Sign Out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  link: {
    color: 'blue',
    marginVertical: 5
  }
})

export default SettingsTab