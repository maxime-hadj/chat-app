import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran ProfileScreen => affichage du profil de l'utilisateur 
// Si on clique sur le bouton modifier, on est envoyé vers l'écran UpdateProfileScreen

const ProfileScreen = (props) => {

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    getUser();
  }, []);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('user_token');
    setLoading(true);
    fetch('http://10.10.59.176:3000/api/users/22', {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + userToken},
    })
    .then(response => response.json())
    .then(response =>{
      setUser(response.data);
      console.log(response.data);
      setLoading(false);
      console.log(user, 'faux c est ma bite');
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
        <FlatList
            data={user.data}
            renderItem={({ item }) => (
            <View>
                <Text>{item.firstname}</Text>
                <Text>{item.lastname}</Text>
            </View>
            )}
            keyExtractor={item => item.id_user}
        />
      </View>
  )
};

export default ProfileScreen