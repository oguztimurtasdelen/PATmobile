import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Login} from './Login.js';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
    </Tab.Navigator>
  );
}

function PlayerScreen() {
  return (
    <View style={styles.screen}>
      <Login page="player" />
    </View>
  );
}

function CoachScreen() {
  return (
    <View style={styles.screen}>
      <Login page="coach" />
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
