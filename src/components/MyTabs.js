import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from './Login.js';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Player" component={PlayerStackScreen} />
      <Tab.Screen name="Coach" component={CoachStackScreen} />
    </Tab.Navigator>
  );
}

function PlayerLogin({navigation}) {
  return (
    <View style={styles.screen}>
      <Login page="player" navigation={navigation} />
    </View>
  );
}

function CoachLogin({navigation}) {
  return (
    <View style={styles.screen}>
      <Login page="coach" navigation={navigation} />
    </View>
  );
}

function PlayerScreen({route}) {
  const {playerId} = route.params;
  return (
    <View style={styles.screen}>
      <Text>{JSON.stringify(playerId)}</Text>
    </View>
  );
}

function CoachScreen({route}) {
  const {coachId} = route.params;
  return (
    <View style={styles.screen}>
      <Text>{JSON.stringify(coachId)}</Text>
    </View>
  );
}

const PlayerStack = createStackNavigator();

function PlayerStackScreen() {
  return (
    <PlayerStack.Navigator>
      <PlayerStack.Screen name="PlayerLogin" component={PlayerLogin} />
      <PlayerStack.Screen name="Player" component={PlayerScreen} />
    </PlayerStack.Navigator>
  );
}

const CoachStack = createStackNavigator();

function CoachStackScreen() {
  return (
    <CoachStack.Navigator>
      <CoachStack.Screen name="CoachLogin" component={CoachLogin} />
      <CoachStack.Screen name="Coach" component={CoachScreen} />
    </CoachStack.Navigator>
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
