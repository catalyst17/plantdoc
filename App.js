import * as React from 'react';
import { StyleSheet } from 'react-native';
import Amplify, { Auth as AmplifyAuth } from 'aws-amplify'
import config from './aws-exports'

import Auth from './views/auth/Auth'
import Initializing from './views/Initializing'
import Main from './views/main/Home'

Amplify.configure(config)

class App extends React.Component {
  state = {
    currentView: 'initializing'
  }

  componentDidMount() {
    this.checkAuth()
  }

  updateView = (currentView) => {
    this.setState({ currentView })
  }

  checkAuth = async () => {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser()
      console.log(user, ' is signed in')
      this.setState({ currentView: 'main' })
    } catch (err) {
      console.log('user is not signed in')
      this.setState({ currentView: 'auth' })
    }
  }

  render() {
    const { currentView } = this.state
    console.log('currentView: ', currentView)
    return (
      <>
        { currentView === 'initializing' && <Initializing />}
        { currentView === 'auth' && <Auth updateView={this.updateView} />}
        { currentView === 'main' && <Main updateView={this.updateView} />}
      </>
    )
  }
}

export default App;

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