import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
class PlayerOptions extends React.Component {
  constructor(props) {
    super(props);
    //#region method binding
    this.onPressIndivudialSpeed = this.onPressIndivudialSpeed.bind(this);
    // eslint-disable-next-line prettier/prettier
    this.getIndivudialSpeedTrainings = this.getIndivudialSpeedTrainings.bind(this);
    this.getSpeedTrainingData = this.getSpeedTrainingData.bind(this);
    // eslint-disable-next-line prettier/prettier
    this.getPercentangeSpeedAllTeam =  this.getPercentangeSpeedAllTeam.bind(this);
    this.onPressTeamSpeed = this.onPressTeamSpeed.bind(this);
    this.getPercentangeSpeedPlayer = this.getPercentangeSpeedPlayer.bind(this);
    //#endregion
  }
  //#region Player Statictics
  //Sending indivudial speed training data of player to statictics screen
  async onPressIndivudialSpeed() {
    let trainingIds = await this.getIndivudialSpeedTrainings();
    let speedTrainingData = await this.getSpeedTrainingData(trainingIds);
    this.props.navigation.navigate('PlayerStatistics', {
      trainingData: speedTrainingData,
    });
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
        element.trainingID.startsWith('A')
      ) {
        IDarray.push(element.trainingID);
      }
    });
    return IDarray;
  }
  //Getting data of speed trainings for current player
  async getSpeedTrainingData(trainingIds) {
    var speedTrainingTouches = 0;
    var numberOfSuccesTouches = 0;
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
    return [numberOfSuccesTouches, speedTrainingTouches];
  }
  async getPercentangeSpeedPlayer(playerSpeedData) {
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
  //#endregion
  //#region Team Statictics
  async onPressTeamSpeed() {
    let percentangeOfSpeedAllTeam = await this.getPercentangeSpeedAllTeam();
    let playerSpeedTrainings = await this.getIndivudialSpeedTrainings();
    let playerSpeedData = await this.getSpeedTrainingData(playerSpeedTrainings);
    // eslint-disable-next-line prettier/prettier
    let percentangeOfSpeedPlayer = await this.getPercentangeSpeedPlayer(playerSpeedData);
    this.props.navigation.navigate('PlayerStatistics', {
      percentangeTeam: percentangeOfSpeedAllTeam,
      percentangePlayer: percentangeOfSpeedPlayer,
    });
  }
  //Get percentange of succes touches in speed training for all team
  async getPercentangeSpeedAllTeam() {
    var speedTrainingTouches = 0;
    var numberOfSuccesTouches = 0;
    const response = await fetch('http://192.168.1.183:3000/api/trainings');
    const data = await response.json();
    data.forEach(element => {
      //Check if training type is speed training
      if (element.trainingID.startsWith('A')) {
        speedTrainingTouches++;
        //finding successful touches for all team
        if (element.isSucces == '1') {
          numberOfSuccesTouches++;
        }
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
  //#endregion
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME {this.props.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressIndivudialSpeed}>
          <Text style={styles.buttonText}>SHOW INDIVUDIAL SPEED </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SHOW INDIVUDIAL ACCURACY </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPressTeamSpeed}>
          <Text style={styles.buttonText}>SHOW ME vs TEAM SPEED </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
