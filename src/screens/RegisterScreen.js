import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import jwt_decode from "jwt-decode";

//Register screen
const RegisterScreen = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_validation, setPasswordValidation] = useState('');

  useEffect(() => {
    retrieveDarkMode().then(value => {
      setDarkMode(value);
    });
  }, []);


  const register = () => {

    if(password != password_validation){
      alert.alert("Your passwords doesn't match.")
    } else {
      fetch('http://10.10.22.129:3000/api/users', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
              "Successfully registered",
              "Press OK to login",
              [
                { text: "OK", onPress: () =>{props.navigation.navigate('Login')} }
              ]
            )
          }
      })
    }
  }

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      backgroundColor: darkMode ? 'black' : 'white',
      color: darkMode ? 'white' : 'black'
    },
    inputContainer: {
      margin: 20,
      width: '90%',
    },
    buttonContainer: {
      margin: 20,
      width: '90%',
    },
    text: {
      fontSize: 15,
      textAlign: 'center',
      margin: 10,
      color: darkMode ? 'white' : 'white'
    },
  };
  
  return (
    <View>
    <View style={styles.inputContainer}>
      <Input
        placeholder='Enter your First Name'
        label='First Name'
        leftIcon={{ type: 'material', name:'face'}}
        value={firstname}
        onChangeText={text => setFirstname(text)}
        id={firstname}
      /> 
      <Input
        placeholder='Enter your Last Name'
        label='Last Name'
        leftIcon={{ type: 'material', name:'face'}}
        value={lastname}
        onChangeText={text => setLastname(text)}
        id={lastname}
      />
      <Input
        placeholder='Enter your Email'
        label='Email'
        leftIcon={{ type: 'material', name:'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
        id={email}
      /> 
      <Input
        placeholder='Enter your Password'
        label='Password'
        leftIcon={{ type: 'material', name:'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        id={password}
        secureTextEntry
      />

      <Input
        placeholder='Confirm your Password'
        label='Password validation'
        leftIcon={{ type: 'material', name:'lock'}}
        value={password_validation}
        onChangeText={text => setPasswordValidation(text)}
        id={password_validation}
        secureTextEntry
      />
    </View>
      <View style={styles.buttonContainer}>
      <Button title='Register' onPress={()=> register()} />
    </View>
    <View>
      <Text onPress={()=>{props.navigation.navigate('Login')}} style={styles.text}>
        Got an account ? Login here !
      </Text>
    </View>
  </View>
  )
}


export default RegisterScreen