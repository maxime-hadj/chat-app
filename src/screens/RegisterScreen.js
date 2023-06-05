import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, SafeAreaViewComponent} from 'react-native';
import { Input, Button, Image} from 'react-native-elements';
import jwt_decode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import sanitizeHtml from 'sanitize-html';


//Register screen
const RegisterScreen = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_validation, setPasswordValidation] = useState('');
  const [avatar, setAvatar] = useState(null);

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });
  
    if (!result.canceled) {

      const filename = result.assets[0].uri.split('/').pop();
      const fileType = filename.split('.').pop().toLowerCase();
      const allowedFileTypes = ['jpg', 'jpeg', 'png'];
      const maxSizeInBytes = 5242880; // 5MB
      const imageSizeInBytes = result.assets[0].fileSize;
  
      if (!allowedFileTypes.includes(fileType)) {
        console.log('Unauthorized file type.');
        return;
      }
  
      if (imageSizeInBytes > maxSizeInBytes) {
        console.log('Unauthorized file over 5MB.');
        return;
      }
  
      
      const { uri } = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      const imageContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setAvatar({
        uri: uri,
        name: filename,
        type: 'image/jpeg',
        content: imageContent,
      });
    }
  };


  const register = () => {

    const sanitizedFirstname = sanitizeHtml(firstname)
    const sanitizedLastname = sanitizeHtml(lastname)
    const sanitizedEmail = sanitizeHtml(email)
    const sanitizedPassword = sanitizeHtml(password)
    const sanitizedPasswordValidation = sanitizeHtml(password_validation)

    
    const namesRegex = "^[a-zA-ZÀ-ÿ -]+$"

    //Verifying firstname & lastname without numbers or special caracters except accents and "-"
    if (!sanitizedFirstname.match(namesRegex) || !sanitizedLastname.match(namesRegex)){
      alert("Your firstname and lastname can only contain letters, accents, blank space and '-'.")
      return;
    }

    //Verifying email format
    if (!sanitizedEmail.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      alert("Your email is not correct.")
      return;
    }

    if(!sanitizedPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!&#])[A-Za-z\d?!&#]{8,}$/)) {
      alert("The password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character (? or ! or & or #).")
      return;
    }

    if(sanitizedPassword != sanitizedPasswordValidation){
      alert("Your passwords doesn't match.")
      return;
    }

    const data = {
      firstname: sanitizedFirstname,
      lastname: sanitizedLastname,
      email: sanitizedEmail,
      password: sanitizedPassword,
      avatar: avatar,
    };
    fetch('http://192.168.0.14:3000/api/users', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
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
    <ScrollView style={styles.inputContainer}>
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
      <Button title="Select Image" onPress={pickImage} />
      {avatar && <Image source={{ uri: avatar.uri }} style={{ width: 200, height: 200 }} 
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
      
      <View style={styles.buttonContainer}>
      <Button title='Register' onPress={()=> register()} />
      <Text onPress={()=>{props.navigation.navigate('Login')}} style={styles.text}>
        Got an account ? Login here !
      </Text>
    </View>
  </ScrollView>
  )
}


export default RegisterScreen