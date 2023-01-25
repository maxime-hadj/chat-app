import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran ProfileScreen => affichage du profil de l'utilisateur 
// Si on clique sur le bouton modifier, on est envoyé vers l'écran UpdateProfileScreen

const ProfileScreen = (props) => {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('')

  const idUser = props.route.params.id_user
  const apiUrl = 'http://10.10.60.177:3000/api/users/'
  const fetchUrl = apiUrl + idUser

  useEffect(() =>{
    getUser();
  }, []);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('user_token');
    setToken(userToken)
    setLoading(true);
    fetch(fetchUrl, {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + userToken},
    })
    .then(response => response.json())
    .then(response =>{
      setUser(response.data);
      setLoading(false);
    })
    .catch(function(error){
      Alert.alert("Error", "There has been a problem with your fetch operation: " + error.message);
    })
  }

  if (loading){
    return <Text>Loading...</Text>
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    text: {
      fontSize: 42,
    },
  });


  return (
    <View>
      <Text>Name: {user.firstname} {user.lastname}</Text>
      <Text>Email: {user.email}</Text>
      <Button title='Discuss' onPress={()=> props.navigation.navigate('App', {
        screen: 'Private Chat', 
        params: {
          idUserTarget: user.id_user,
          token: token
        }
      })} />

    </View>
  )
};

export default ProfileScreen