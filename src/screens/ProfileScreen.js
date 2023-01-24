import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran ProfileScreen => affichage du profil de l'utilisateur 
// Si on clique sur le bouton modifier, on est envoyé vers l'écran UpdateProfileScreen

const ProfileScreen = (props) => {

  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    getUser();
  }, []);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('user_token');
    setLoading(true);
    fetch('http://10.10.56.231:3000/api/users/22', {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + userToken},
    })
    .then(response => response.json())
    .then(response =>{
      setUsers(response.data);
      setLoading(false);
    })
    .catch(function(error){
      console.log('There has been a problem with your fetch operation: ' + error.message);
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
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });


  return (
    <ScrollView >
        <FlatList
            data={users}
            renderItem={({ item }) => (
            <View>
                <Text>{item.firstname}</Text>
                <Text>{item.lastname}</Text>
            </View>
            )}
            keyExtractor={item => item.id}
        />
      </ScrollView>
  )
};

export default ProfileScreen