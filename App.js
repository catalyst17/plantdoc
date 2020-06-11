import * as React from 'react';
import { Platform, StyleSheet, Text, SafeAreaView } from 'react-native';
import Amplify, { Auth as AmplifyAuth } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(config)

class App extends React.Component {
  async componentDidMount() {
    const user = await AmplifyAuth.currentAuthenticatedUser()
    console.log('user:', user)
  }

  signOut = () => {
    AmplifyAuth.signOut()
      .then(() => this.props.onStateChange('signedOut'))
      .catch(err => console.log('err: ', err))
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <Text onPress={this.signOut}>Sign Out</Text>
      </SafeAreaView>
    )
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28
  }
})  