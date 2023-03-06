import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        retrieveDarkMode().then(value => {
            setDarkMode(value);
        });
        }, []);

    const saveDarkMode = async (value) => {
        try {
            await AsyncStorage.setItem('darkMode', JSON.stringify(value));
        } catch (e) {
            console.log(e);
        }
        };
        
        const retrieveDarkMode = async () => {
        try {
            const value = await AsyncStorage.getItem('darkMode');
            if (value !== null) {
            return JSON.parse(value);
            }
        } catch (e) {
            console.log(e);
        }
        };

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0064e1',
            height: 80,
            paddingTop: 30,
            paddingHorizontal: 20,
        },
        headerText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkMode ? 'black' : 'white',
            //color: darkMode ? 'white' : 'white'
          },
        });

    return (
        <View style={styles.header}>
        <Ionicons name="ios-menu" size={32} color="white" />
        <Text style={styles.headerText}>Gwak man chat</Text>
        <Button 
            // title={darkMode ? 'Dark Mode On' : 'Dark Mode Off'} 
            onPress={() => {
                setDarkMode(!darkMode);
                saveDarkMode(!darkMode);
            }}
            buttonStyle={{
                backgroundColor: darkMode ? '#c4ae1f' : 'blue',
                borderRadius: 50,
                padding: 10,
            }}
            icon={
                <Icon
                name={darkMode ? 'sun' : 'moon'}
                size={20}
                color="white"
                />
            }
        />
        </View>
    );
};



export default Header;