import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import PlantsTab from './PlantsTab'
import SettingsTab from './SettingsTab'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createMaterialBottomTabNavigator();

class Home extends React.Component {
     
  render() {
    console.log('props: ', this.props)
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="My plants" component={PlantsTab} />
          <Tab.Screen name="Family">
            {() => <SettingsTab updateView={this.props.updateView} />}  
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default Home