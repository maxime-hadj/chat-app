import React, { useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar,  TouchableOpacity,  } from 'react-native';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Ecran UsersListScreen => affichage de la liste des users
// Si on clique sur un User on est envoyé vers la conversation privée avec ce user donc l'écran PrivateChatScreen

const UsersListScreen = (props) =>{
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async () =>    {

      const unknownAvatar = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg'
      const userToken = await AsyncStorage.getItem('user_token');
      const decodedToken = jwtDecode(userToken)
      const idUser = decodedToken.result.id_user

      setLoading(true);
      fetch('http://192.168.0.14:3000/api/users', {
          method: 'GET',
          headers:{ Authorization: 'Bearer ' + userToken },
      })
      .then(response => response.json())
      .then(response =>{


        const processedUsers = response.data.map(user => {


          if (user.id_user === idUser){
            return null;
          }

          if (!user.avatar) {
            return { 
              ...user,
              avatar: unknownAvatar
            }
          } else {
            return { 
              ...user,
              avatar: user.avatar.replace("localhost", "192.168.0.14"),
            }
          }
        }).filter(Boolean);
        
        setUsers(processedUsers);
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
        backgroundColor: '#F5FCFF',
      },
      userContainer: {
        flex: 1,
        flexDirection:'row',
        margin: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
      },
      userName: {
        fontSize: 14,
        marginLeft: 20,
        paddingTop:'5%',
        fontWeight:'900'
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginColor: '#black'
      },
    });

    return (
      <View style={styles.container}>

        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => {
              props.navigation.navigate('Profile', {
                id_user: item.id_user,
              });
            }}>
            <Image 
              style={styles.avatar}
              source={{uri: item.avatar}} 
            />
            <Text 
              style={styles.userName}
            >
              {item.firstname} {item.lastname}
            </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id_user.toString()}
        />
      </View>
    );


};

    export default UsersListScreen;
