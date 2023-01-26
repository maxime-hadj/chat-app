import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran UsersListScreen => affichage de la liste des users
// Si on clique sur un User on est envoyé vers la conversation privée avec ce user donc l'écran PrivateChatScreen

const UsersListScreen = (props) =>{
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async () =>    {

        const userToken = await AsyncStorage.getItem('user_token');
        setLoading(true);
        fetch('http://10.10.63.34:3000/api/users', {
            method: 'GET',
            headers:{ Authorization: 'Bearer ' + userToken },
        })
        .then(response => response.json())
        .then(response =>{
            setUsers(response.data);
            setLoading(false);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      userContainer: {
        margin: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
      },
      userName: {
        fontSize: 18,
      },
    });

    return (
  <View style={styles.container}>
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={styles.userContainer}>
          <Text 
            style={styles.userName}
            onPress={() => {
              props.navigation.navigate('Profile', {
                id_user: item.id_user,
              });
            }}
          >
            {item.firstname} {item.lastname}
          </Text>
        </View>
      )}
      keyExtractor={item => item.id_user}
    />
  </View>
    );


};

    export default UsersListScreen;
