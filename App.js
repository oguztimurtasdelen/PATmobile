
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/components/Login';

export default class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Hello World</Text>
        <Login></Login>
        
      </View>
    )
  }
}
/*
Comment Line for GitHub push
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#002A1C',
    paddingLeft: 50,
    paddingRight: 50
  },
})