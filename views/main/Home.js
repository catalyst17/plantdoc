import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PlantsTab from './PlantsTab'
import SettingsTab from './SettingsTab'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createMaterialBottomTabNavigator();

class Home extends React.Component {
     
  render() {
    console.log('props: ', this.props)
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='My plants' backBehavior='initialRoute' barStyle={styles.barStyle} shifting>
          <Tab.Screen  
            name="My plants"
            component={PlantsTab}
            options={{
              tabBarLabel: 'My plants',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Family"
            options={{
              tabBarLabel: 'Family',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          >
            {() => <SettingsTab updateView={this.props.updateView} />}  
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#ffb100'
  }
})

export default Home