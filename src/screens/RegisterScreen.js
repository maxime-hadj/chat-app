import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import jwt_decode from "jwt-decode";
import ImagePicker from 'react-native-image-picker';

//Register screen
const RegisterScreen = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_validation, setPasswordValidation] = useState('');
  const [avatar, setAvatar] = useState('');

  const selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setAvatar(source.uri);
      }
    });
  }

  const register = () => {

    if(password != password_validation){
      alert.alert("Your passwords doesn't match.")
    } else {
      fetch('http://192.168.0.12:3000/api/users', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          avatar: avatar
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
      <Text>Upload your Avatar</Text>
      <Button title="Select Image" onPress={selectImage} />
      {avatar && <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} 
      />}
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