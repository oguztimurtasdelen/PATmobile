import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      found: false,
    };
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  async onPressHandler() {
    this.setState({
      found: false,
    });
    console.log('onpress');
    let response = '';
    //Check if screen is player screen
    if (this.props.page == 'player') {
      response = await fetch('http://192.168.1.183:3000/api/players');
    }
    //Check if screen is coach screen
    if (this.props.page == 'coach') {
      response = await fetch('http://192.168.1.183:3000/api/coachs');
    }
    const data = await response.json();
    data.forEach(element => {
      console.log(element.ID);
      if (this.state.id == element.ID) {
        this.setState({
          found: true,
        });
      }
    });
    if (this.state.found) {
      Alert.alert('FOUND');
      if (this.props.page == 'player') {
        this.props.navigation.navigate('Player', {
          playerId: this.state.id,
        });
      } else if (this.props.page == 'coach') {
        this.props.navigation.navigate('Coach', {
          coachId: this.state.id,
        });
      }
    } else {
      Alert.alert('NOT FOUND ERROR');
    }
  }

  render() {
    return (
      <View style={styles.desing}>
        <TextInput
          style={styles.inputDesign}
          placeholder="Enter ID"
          placeholderTextColor="gray"
          underlineColorAndroid={'transparent'}
          onChangeText={id => this.setState({id})}
          value={this.state.id}
        />
        <TouchableOpacity
          style={styles.buttonDesign}
          onPress={this.onPressHandler}>
          <Text style={styles.buttonTextDesign}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  desing: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  inputDesign: {
    // alignSelf: 'stretch',
    height: 40,
    width: '50%',
    margin: 15,
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderRadius: 15,
    borderBottomWidth: 3,
  },
  buttonDesign: {
    //alignSelf: 'stretch',
    alignItems: 'center',
    width: '50%',
    padding: 10,
    margin: 15,
    borderRadius: 50,
    backgroundColor: '#00D367',
  },
  buttonTextDesign: {
    color: '#002A1C',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export {Login};
