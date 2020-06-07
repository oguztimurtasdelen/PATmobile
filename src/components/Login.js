import React from 'react';
import{
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default class Login extends React.Component{
    render(){
        return(
            <View style={styles.desing}>
                
                <TextInput style={styles.inputDesign} 
                placeholder="Enter ID"
                placeholderTextColor= "white" 
                underlineColorAndroid={"transparent"}>
                </TextInput>
                
                <TouchableOpacity style={styles.buttonDesign}>
                    <Text style = {styles.buttonTextDesign}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    desing:{
        alignSelf: 'stretch',
        alignItems: 'center'
    },
      
    inputDesign:{
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 18,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 3,
    },
    buttonDesign:{
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#00D367',
    },
    buttonTextDesign:{
        color: '#002A1C',
        fontWeight: 'bold',
        fontSize: 18
    }
})