import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class CoachOptions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.playerPicker}>
          <Text>Player Picker</Text>
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
  playerPicker: {
    flex: 0.2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
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
