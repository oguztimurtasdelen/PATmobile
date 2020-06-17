import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';

class CoachOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPlayer: '',
    };
    this.onPressPlayerSpeed = this.onPressPlayerSpeed.bind(this);
    this.onPressPlayerAccuracy = this.onPressPlayerAccuracy.bind(this);
    this.getPlayerSpeedTrainings = this.getPlayerSpeedTrainings.bind(this);
    this.getTrainingData = this.getTrainingData.bind(this);
    this.getPlayerAccuracyTrainings = this.getPlayerAccuracyTrainings.bind(
      this,
    );
    this.onPressTeamSpeed = this.onPressTeamSpeed.bind(this);
    this.getPercentangeSpeedAllTeam = this.getPercentangeSpeedAllTeam.bind(
      this,
    );
    this.getPercentangeSpeedPlayer = this.getPercentangeSpeedPlayer.bind(this);
    this.onPressTeamAccuracy = this.onPressTeamAccuracy.bind(this);
    this.getPercentangeAccuracyTeam = this.getPercentangeAccuracyTeam.bind(
      this,
    );
    this.getPercentangeAccuracyPlayer = this.getPercentangeAccuracyPlayer.bind(
      this,
    );
    this.getTeamMatesTrainings = this.getTeamMatesTrainings.bind(this);
  }

  async onPressPlayerSpeed() {
    //if player did not selected, return
    if (this.state.chosenPlayer === '') {
      Alert.alert('WARNING', 'CHOOSE A PLAYER');
      return;
    }
    let trainingIds = await this.getPlayerSpeedTrainings();
    let speedTrainingData = await this.getTrainingData(trainingIds);
    this.props.navigation.navigate('CoachStatistics', {
      trainingData: speedTrainingData,
      playerID: this.state.chosenPlayer,
    });
  }

  async onPressPlayerAccuracy() {
    //if player did not selected, return
    if (this.state.chosenPlayer === '') {
      Alert.alert('WARNING', 'CHOOSE A PLAYER');
      return;
    }
    let trainingIds = await this.getPlayerAccuracyTrainings();
    let accuracyTrainingData = await this.getTrainingData(trainingIds);
    this.props.navigation.navigate('CoachStatistics', {
      trainingData: accuracyTrainingData,
      playerID: this.state.chosenPlayer,
    });
  }

  async getPlayerAccuracyTrainings() {
    var IDarray = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const data = await response.json();
    data.forEach(element => {
      //check if it is current player and  if trainingID starts with A
      if (
        this.state.chosenPlayer == element.playerID &&
        element.trainingID.startsWith('A')
      ) {
        IDarray.push(element.trainingID);
      }
    });
    return IDarray;
  }

  async getPlayerSpeedTrainings() {
    var IDarray = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const data = await response.json();
    data.forEach(element => {
      //check if it is current player and  if trainingID starts with S
      if (
        this.state.chosenPlayer == element.playerID &&
        element.trainingID.startsWith('S')
      ) {
        IDarray.push(element.trainingID);
      }
    });
    return IDarray;
  }

  //Getting data of given trainings for current player
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

  async onPressTeamSpeed() {
    //if player did not selected, return
    if (this.state.chosenPlayer === '') {
      Alert.alert('WARNING', 'CHOOSE A PLAYER');
      return;
    }
    let percentangeOfSpeedAllTeam = await this.getPercentangeSpeedAllTeam();
    let playerSpeedTrainings = await this.getPlayerSpeedTrainings();
    let playerSpeedData = await this.getTrainingData(playerSpeedTrainings);
    // eslint-disable-next-line prettier/prettier
    let percentangeOfSpeedPlayer = await this.getPercentangeSpeedPlayer(playerSpeedData);
    this.props.navigation.navigate('CoachStatistics', {
      playerID: this.state.chosenPlayer,
      percentangeTeam: percentangeOfSpeedAllTeam,
      percentangePlayer: percentangeOfSpeedPlayer,
    });
  }

  async onPressTeamAccuracy() {
    //if player did not selected, return
    if (this.state.chosenPlayer === '') {
      Alert.alert('WARNING', 'CHOOSE A PLAYER');
      return;
    }
    let percentangeOfAccuracyTeam = await this.getPercentangeAccuracyTeam();
    let playerAccuracyTrainings = await this.getPlayerAccuracyTrainings();
    let playerAccuracyData = await this.getTrainingData(
      playerAccuracyTrainings,
    );
    let percentangeOfAccuracyPlayer = await this.getPercentangeAccuracyPlayer(
      playerAccuracyData,
    );
    this.props.navigation.navigate('CoachStatistics', {
      playerID: this.state.chosenPlayer,
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

  async getTeamMatesTrainings() {
    let teamMatesTrainings = [];
    const response = await fetch('http://192.168.1.183:3000/api/historyTable');
    const historyTable = await response.json();
    this.props.players.forEach(element => {
      //if it is not chosen player
      if (element.playerID != this.state.chosenPlayer) {
        historyTable.forEach(history => {
          if (history.playerID == element.playerID) {
            teamMatesTrainings.push(history.trainingID);
          }
        });
      }
    });
    return teamMatesTrainings;
  }

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
        <View style={styles.playerPickerView}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.chosenPlayer}
            onValueChange={itemValue =>
              this.setState({chosenPlayer: itemValue})
            }>
            {this.props.players.map(player => {
              console.log(player.playerName);
              return (
                <Picker.Item
                  label={player.playerName + ' ' + player.playerID}
                  value={player.playerID}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.playerOperations}>
          <TouchableOpacity
            style={styles.playerButtons}
            onPress={this.onPressPlayerSpeed}>
            <Text style={styles.buttonText}>PLAYER SPEED</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playerButtons}
            onPress={this.onPressPlayerAccuracy}>
            <Text style={styles.buttonText}>PLAYER ACCURACY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.playerOperations}>
          <TouchableOpacity
            style={styles.playerButtons}
            onPress={this.onPressTeamSpeed}>
            <Text style={styles.buttonText}>PLAYERvsTEAM SPEED</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playerButtons}
            onPress={this.onPressTeamAccuracy}>
            <Text style={styles.buttonText}>PLAYERvsTEAM ACCURACY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.empty} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerPickerView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    width: 300,
  },
  playerOperations: {
    flex: 0.3,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playerButtons: {
    flex: 0.5,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 15,
    margin: 18,
    backgroundColor: '#07b0e9',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  empty: {
    flex: 0.2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export {CoachOptions};
