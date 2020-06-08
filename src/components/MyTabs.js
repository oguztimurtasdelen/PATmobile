import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Login} from './Login.js';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Player" component={HomeScreen} />
      <Tab.Screen name="Coach" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Login />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MyTabs};
