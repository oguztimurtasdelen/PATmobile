import React from 'react';
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {BarChart} from 'react-native-chart-kit';
import {Login} from './Login.js';
import {PlayerOptions} from './PlayerOptions.js';
import {CoachOptions} from './CoachOptions.js';

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

function PlayerScreen({route, navigation}) {
  const {playerId} = route.params;
  const {playerName} = route.params;
  return (
    <View style={styles.screen}>
      <PlayerOptions id={playerId} navigation={navigation} name={playerName} />
    </View>
  );
}

function CoachScreen({route, navigation}) {
  const {coachId} = route.params;
  const {coachName} = route.params;
  const {players} = route.params;
  return (
    <View style={styles.screen}>
      <CoachOptions
        id={coachId}
        navigation={navigation}
        name={coachName}
        players={players}
      />
    </View>
  );
}

function PlayerStatisticsScreen({route, navigation}) {
  const {trainingData} = route.params;
  const {percentangePlayer} = route.params;
  const {percentangeTeam} = route.params;
  const {playerName} = route.params;
  var labelName1 = playerName;
  var labelName2 = 'TEAM';
  var firstData = 0;
  var seceondData = 0;
  //if it is only playerIndivudial data, our props will be trainingData
  if (trainingData) {
    labelName1 = 'SUCCESSFUL TOUCHES';
    labelName2 = 'TOTAL ATTEMPTS';
    firstData = trainingData[0];
    seceondData = trainingData[1];
  }
  //if it is playerVSteam data our props will be percentangePlayer and percentangeTeam
  else if (percentangePlayer && percentangeTeam) {
    labelName1 = labelName1.toUpperCase();
    firstData = percentangePlayer;
    seceondData = percentangeTeam;
  }

  return (
    <View style={styles.screen}>
      <BarChart
        data={{
          labels: [labelName1, labelName2],
          datasets: [
            {
              data: [firstData, seceondData],
            },
          ],
        }}
        showValuesOnTopOfBars={true}
        fromZero={true}
        width={Dimensions.get('window').width - 16}
        height={Dimensions.get('window').height - 160}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(3, 32, 252, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
}
function CoachStatisticsScreen({route, navigation}) {
  const {trainingData} = route.params;
  const {playerID} = route.params;
  const {percentangePlayer} = route.params;
  const {percentangeTeam} = route.params;
  var labelName1 = 'PLAYER';
  var labelName2 = 'TEAM';
  var firstData = 0;
  var seceondData = 0;
  //if it is only playerIndivudial data, our props will be trainingData
  if (trainingData) {
    labelName1 = 'SUCCESSFUL TOUCHES';
    labelName2 = 'TOTAL ATTEMPTS';
    firstData = trainingData[0].toString();
    seceondData = trainingData[1].toString();
  }
  //if it is playerVSteam data our props will be percentangePlayer and percentangeTeam
  else if (percentangePlayer && percentangeTeam) {
    firstData = percentangePlayer;
    seceondData = percentangeTeam;
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{playerID}</Text>
      <BarChart
        data={{
          labels: [labelName1, labelName2],
          datasets: [
            {
              data: [firstData, seceondData],
            },
          ],
        }}
        showValuesOnTopOfBars={true}
        fromZero={true}
        width={Dimensions.get('window').width - 16}
        height={Dimensions.get('window').height - 200}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(3, 32, 252, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
}

const PlayerStack = createStackNavigator();

function PlayerStackScreen() {
  return (
    <PlayerStack.Navigator>
      <PlayerStack.Screen name="PlayerLogin" component={PlayerLogin} />
      <PlayerStack.Screen name="Player" component={PlayerScreen} />
      <PlayerStack.Screen
        name="PlayerStatistics"
        component={PlayerStatisticsScreen}
      />
    </PlayerStack.Navigator>
  );
}

const CoachStack = createStackNavigator();

function CoachStackScreen() {
  return (
    <CoachStack.Navigator>
      <CoachStack.Screen name="CoachLogin" component={CoachLogin} />
      <CoachStack.Screen name="Coach" component={CoachScreen} />
      <CoachStack.Screen
        name="CoachStatistics"
        component={CoachStatisticsScreen}
      />
    </CoachStack.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2e3d8',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fa6116',
    fontWeight: 'bold',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    margin: 8,
    textDecorationStyle: 'solid',
  },
});

export {MyTabs};
