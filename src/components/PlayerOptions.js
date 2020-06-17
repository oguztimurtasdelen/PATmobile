import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
class PlayerOptions extends React.Component {
  constructor(props) {
    super(props);
    //#region method binding
    this.onPressIndivudialSpeed = this.onPressIndivudialSpeed.bind(this);
    // eslint-disable-next-line prettier/prettier
    this.getIndivudialSpeedTrainings = this.getIndivudialSpeedTrainings.bind(this);
    this.getTrainingData = this.getTrainingData.bind(this);
    // eslint-disable-next-line prettier/prettier
    this.getPercentangeSpeedAllTeam =  this.getPercentangeSpeedAllTeam.bind(this);
    this.onPressTeamSpeed = this.onPressTeamSpeed.bind(this);
    this.getPercentangeSpeedPlayer = this.getPercentangeSpeedPlayer.bind(this);
    this.onPressIndivudialAccuracy = this.onPressIndivudialAccuracy.bind(this);
    this.getIndivudialAccuracyTrainings = this.getIndivudialAccuracyTrainings.bind(
      this,
    );
    this.onPressTeamAccuracy = this.onPressTeamAccuracy.bind(this);
    this.getPercentangeAccuracyTeam = this.getPercentangeAccuracyTeam.bind(
      this,
    );
    this.getPercentangeAccuracyPlayer = this.getPercentangeAccuracyPlayer.bind(
      this,
    );
    this.getTeamMatesTrainings = this.getTeamMatesTrainings.bind(this);
    //#endregion
  }
  //Sending indivudial speed training data of player to statictics screen
  async onPressIndivudialSpeed() {
    let trainingIds = await this.getIndivudialSpeedTrainings();
    let speedTrainingData = await this.getTrainingData(trainingIds);
    this.props.navigation.navigate('PlayerStatistics', {
      trainingData: speedTrainingData,
    });
  }
  async onPressIndivudialAccuracy() {
    let trainingIds = await this.getIndivudialAccuracyTrainings();
    let accuracyTrainingData = await this.getTrainingData(trainingIds);
    this.props.navigation.navigate('PlayerStatistics', {
      trainingData: accuracyTrainingData,
    });
  }

  async getIndivudialAccuracyTrainings() {
    var IDarray = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const data = await response.json();
    data.forEach(element => {
      //check if it is current player and  if trainingID starts with A
      if (
        this.props.id == element.playerID &&
        element.trainingID.startsWith('A')
      ) {
        IDarray.push(element.trainingID);
      }
    });
    return IDarray;
  }
  //Getting list of indivudial speed training IDs for our player
  async getIndivudialSpeedTrainings() {
    var IDarray = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const data = await response.json();
    data.forEach(element => {
      //check if it is current player and  if trainingID starts with S
      if (
        this.props.id == element.playerID &&
        element.trainingID.startsWith('S')
      ) {
        IDarray.push(element.trainingID);
      }
    });
    return IDarray;
  }
  //Getting data of speed trainings for current player
  async getTrainingData(trainingIds) {
    var speedTrainingTouches = 0;
    var numberOfSuccesTouches = 0;
    //Check if array is not empty
    if (trainingIds.length) {
      const response = await fetch('http://192.168.1.183:3000/api/trainings');
      const data = await response.json();
      data.forEach(element => {
        trainingIds.forEach(item => {
          if (item == element.trainingID) {
            speedTrainingTouches++;
            if (element.isSucces == '1') {
              numberOfSuccesTouches++;
            }
          }
        });
      });
    }
    return [numberOfSuccesTouches, speedTrainingTouches];
  }
  async getPercentangeSpeedPlayer(playerSpeedData) {
    //Check if array is not empty
    if (playerSpeedData.length) {
      var playerSuccesTouches = playerSpeedData[0];
      var playerTotalSpeedTouches = playerSpeedData[1];
      //avoiding dividin 0 exception
      if (playerTotalSpeedTouches > 0) {
        var percentange =
          (playerSuccesTouches / parseFloat(playerTotalSpeedTouches)) * 100;
        return percentange;
      }
      //if there is no speedtouches for current player return 0
      else {
        return 0;
      }
    }
    //if array is empty
    else {
      return 0;
    }
  }
  async onPressTeamSpeed() {
    let percentangeOfSpeedAllTeam = await this.getPercentangeSpeedAllTeam();
    let playerSpeedTrainings = await this.getIndivudialSpeedTrainings();
    let playerSpeedData = await this.getTrainingData(playerSpeedTrainings);
    // eslint-disable-next-line prettier/prettier
    let percentangeOfSpeedPlayer = await this.getPercentangeSpeedPlayer(playerSpeedData);
    this.props.navigation.navigate('PlayerStatistics', {
      playerName: this.props.name,
      percentangeTeam: percentangeOfSpeedAllTeam,
      percentangePlayer: percentangeOfSpeedPlayer,
    });
  }

  async onPressTeamAccuracy() {
    let percentangeOfAccuracyTeam = await this.getPercentangeAccuracyTeam();
    let playerAccuracyTrainings = await this.getIndivudialAccuracyTrainings();
    let playerAccuracyData = await this.getTrainingData(
      playerAccuracyTrainings,
    );
    let percentangeOfAccuracyPlayer = await this.getPercentangeAccuracyPlayer(
      playerAccuracyData,
    );
    this.props.navigation.navigate('PlayerStatistics', {
      playerName: this.props.name,
      percentangeTeam: percentangeOfAccuracyTeam,
      percentangePlayer: percentangeOfAccuracyPlayer,
    });
  }

  async getPercentangeAccuracyPlayer(playerAccuracyData) {
    //check if array is not empty
    if (playerAccuracyData.length) {
      var playerSuccesTouches = playerAccuracyData[0];
      var playerTotalAccuracyTouches = playerAccuracyData[1];
      //avoiding dividin 0 exception
      if (playerTotalAccuracyTouches > 0) {
        var percentange =
          (playerSuccesTouches / parseFloat(playerTotalAccuracyTouches)) * 100;
        return percentange;
      }
      //if there is no speedtouches for current player return 0
      else {
        return 0;
      }
    }
    //if array is empty
    else {
      return 0;
    }
  }

  async getPercentangeAccuracyTeam() {
    var accuracyTrainingTouches = 0;
    var numberOfSuccesTouches = 0;
    const response = await fetch('http://192.168.1.183:3000/api/trainings');
    const data = await response.json();
    const teamMatesTrainings = await this.getTeamMatesTrainings();
    data.forEach(element => {
      //Check if training type is speed training
      if (element.trainingID.startsWith('A')) {
        teamMatesTrainings.forEach(training => {
          if (training == element.trainingID) {
            accuracyTrainingTouches++;
            //finding successful touches for all team
            if (element.isSucces == '1') {
              numberOfSuccesTouches++;
            }
          }
        });
      }
    });
    //avoiding dividing 0 exception
    if (accuracyTrainingTouches > 0) {
      var percentange =
        (numberOfSuccesTouches / parseFloat(accuracyTrainingTouches)) * 100;
      return percentange;
    }
    //speed training data for team is 0, so return 0
    else {
      return 0;
    }
  }

  async getTeamMatesTrainings() {
    let teamMatesTrainings = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const historyTable = await response.json();
    this.props.teamMates.forEach(element => {
      historyTable.forEach(history => {
        if (history.playerID == element) {
          teamMatesTrainings.push(history.trainingID);
        }
      });
    });
    return teamMatesTrainings;
  }
  //Get percentange of succes touches in speed training for all team
  async getPercentangeSpeedAllTeam() {
    var speedTrainingTouches = 0;
    var numberOfSuccesTouches = 0;
    const response = await fetch('http://192.168.1.183:3000/api/trainings');
    const data = await response.json();
    const teamMatesTrainings = await this.getTeamMatesTrainings();
    data.forEach(element => {
      //Check if training type is speed training
      if (element.trainingID.startsWith('S')) {
        teamMatesTrainings.forEach(training => {
          if (training == element.trainingID) {
            speedTrainingTouches++;
            //finding successful touches for all team
            if (element.isSucces == '1') {
              numberOfSuccesTouches++;
            }
          }
        });
      }
    });
    //avoiding dividing 0 exception
    if (speedTrainingTouches > 0) {
      var percentange =
        (numberOfSuccesTouches / parseFloat(speedTrainingTouches)) * 100;
      return percentange;
    }
    //speed training data for team is 0, so return 0
    else {
      return 0;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME {this.props.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressIndivudialSpeed}>
          <Text style={styles.buttonText}>SHOW INDIVUDIAL SPEED </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressIndivudialAccuracy}>
          <Text style={styles.buttonText}>SHOW INDIVUDIAL ACCURACY </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPressTeamSpeed}>
          <Text style={styles.buttonText}>SHOW ME vs TEAM SPEED </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressTeamAccuracy}>
          <Text style={styles.buttonText}>SHOW ME vs TEAM ACCURACY </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    color: '#fa6116',
    fontWeight: 'bold',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
    textDecorationStyle: 'solid',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 35,
    height: 65,
    padding: 15,
    margin: 23,
    backgroundColor: '#07b0e9',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export {PlayerOptions};
