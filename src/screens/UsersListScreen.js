import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UsersListScreen = ({ navigation }) =>{
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async () =>    {

        const userToken = await AsyncStorage.getItem('user_token');
        setLoading(true);
        fetch('http://10.10.43.219:3000/api/users', {
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
      <ScrollView style={styles.scrollView}>
        <FlatList
            data={users}
            renderItem={({ item }) => (
            <View>
                <Text>{item.email}</Text>
                <Text>{item.firstname}</Text>
                <Text>{item.lastname}</Text>
            </View>
            )}
            keyExtractor={item => item.id}
        />
      </ScrollView>
    );


};

    export default UsersListScreen;
