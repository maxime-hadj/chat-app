import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Image, FlatList } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran UpdateProfileScreen => écran avec form pour que l'utilisateur modifie ses infos, 
// quand validé, retour vers le ProfileScreen

const UpdateProfileScreen = (props) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_validation, setPasswordValidation] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    retrieveDarkMode().then(value => {
      setDarkMode(value);
    });
  }, []);

const update = async () =>{

  if(password != password_validation){
    alert.alert("Your passwords doesn't match.")
  } else {
    const userToken = await AsyncStorage.getItem('user_token');
    fetch('http://192.168.1.8:3000/api/users', { 
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + userToken},
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
    })
    .then(data => data.json())
    .then(data =>  { 
        if(data.error) {
          Alert.alert(data.error)
        } else if (data.success == 1) {
          Alert.alert(
            "Successfully updated.",
            '',
            [
              { text: "OK", onPress:() =>{props.navigation.navigate('My profile')} 
              }
            ]
          )
        }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
  })
  }
}

const saveDarkMode = async (value) => {
  try {
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const retrieveDarkMode = async () => {
  try {
    const value = await AsyncStorage.getItem('darkMode');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 8,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#0064e1',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
  },
  registerText: {
    margin: 10,
    fontSize: 15,
    color: '#0064e1',
    textAlign: 'center',
  },
});

  return (
  //<ScrollView>
      <View style={styles.container} >
    <Input
      placeholder='Enter your First Name'
      label='First Name'
      leftIcon={{ type: 'material', name:'face'}}
      value={firstname}
      onChangeText={text => setFirstname(text)}
      id={firstname}
      style={styles.input}
    /> 
    <Input
      placeholder='Enter your Last Name'
      label='Last Name'
      leftIcon={{ type: 'material', name:'face'}}
      value={lastname}
      onChangeText={text => setLastname(text)}
      id={lastname}
      style={styles.input}
    />
    <Input
      placeholder='Enter your Email'
      label='Email'
      leftIcon={{ type: 'material', name:'email'}}
      value={email}
      onChangeText={text => setEmail(text)}
      id={email}
      style={styles.input}
    /> 
    <Input
      placeholder='Enter your Password'
      label='Password'
      leftIcon={{ type: 'material', name:'lock'}}
      value={password}
      onChangeText={text => setPassword(text)}
      id={password}
      secureTextEntry
      style={styles.input}
    />
    <Input
      placeholder='Confirm your Password'
      label='Password validation'
      leftIcon={{ type: 'material', name:'lock'}}
      value={password_validation}
      onChangeText={text => setPasswordValidation(text)}
      id={password_validation}
      secureTextEntry
      style={styles.input}
    />
    
    <Button title='update' onPress={()=> update()} style={styles.button} buttonStyle={styles.buttonText} />
  </View>
  //</ScrollView>
  )
};


export default UpdateProfileScreen