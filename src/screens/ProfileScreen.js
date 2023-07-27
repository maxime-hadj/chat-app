import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

// Ecran ProfileScreen => affichage du profil de l'utilisateur 
// Si on clique sur le bouton modifier, on est envoyé vers l'écran UpdateProfileScreen

const ProfileScreen = (props) => {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [isCurrentUser, setIsCurrentUser] = useState('')

  const getUser = async () => {

    const userToken = await AsyncStorage.getItem('user_token');
    const decodedToken = jwt_decode(userToken);
    const unknownAvatar = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg'

    setToken(userToken)
    setLoading(true);

    let idUser 

  
    if (props.route.params == undefined) {
      idUser = decodedToken.result.id_user     
    } else  {
      idUser = props.route.params.id_user  
    }

    const apiUrl = 'http://192.168.8.137:3000/api/users/'
    const fetchUrl = apiUrl + idUser

    fetch(fetchUrl, {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + userToken},
    })
    .then(response => response.json())
    .then(response =>{
      setUser(response.data);
      setLoading(false);

      if (decodedToken.result.id_user == response.data.id_user) {
        setIsCurrentUser(true)
      } else {
        setIsCurrentUser(false)
      }

    })
    .catch(function(error){
      Alert.alert("Error", "There has been a problem with your fetch operation: " + error.message);
    })
  }

  getUser();

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#4285f4',
        padding: 10,
        alignSelf: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 75,
        marginBottom: 20,
    },
});



  return (
    <View style={styles.container}>
      <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
      />
    <Text style={styles.text}>Name: {user.firstname} {user.lastname}</Text>
    <Text style={styles.text}>Email: {user.email}</Text>
    {isCurrentUser === false ? (
        <Button
            title="Discuss"
            onPress={() =>
                props.navigation.navigate('Private', {
                    screen: 'Private Chat',
                    params: {
                      id_user: user.id_user,
                      token: token
                    }
                })
            }
            buttonStyle={styles.button}
        />
    ) : (
        <Button
            title="Edit"
            onPress={() =>
                props.navigation.navigate('Update infos', {
                    params: {
                        token: token
                    }
                })
            }
            buttonStyle={styles.button}
        />
    )}
</View>
  )
};

export default ProfileScreen