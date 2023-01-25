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

  const idUser = props.route.params.id_user
  console.log(idUser)

  useEffect(() =>{
    getUser();
  }, []);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('user_token');
    setLoading(true);
    fetch('http://10.10.60.177:3000/api/users/22', {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + userToken},
    })
    .then(response => response.json())
    .then(response =>{
      setUser(response.data);
      setLoading(false);
      console.log(user)
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
    </View>
  )
};

export default ProfileScreen