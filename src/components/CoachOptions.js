import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

class CoachOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPlayer: '0',
    };
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
                  label={player.playerName}
                  value={player.playerID}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.playerOperations}>
          <Text>button 1</Text>
          <Text>button 2</Text>
        </View>
        <View style={styles.playerOperations}>
          <Text>button 3</Text>
          <Text>button 4</Text>
        </View>
        <View style={styles.teamOperations}>
          <Text>team op1</Text>
          <Text>team op2</Text>
        </View>
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
    backgroundColor: 'white',
  },
  playerPickerView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    width: 200,
  },
  playerOperations: {
    flex: 0.3,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  teamOperations: {
    flex: 0.2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
});
export {CoachOptions};
