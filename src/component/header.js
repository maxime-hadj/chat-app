import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

const saveDarkMode = async (value) => {
  try {
    await AsyncStorage.setItem("darkMode", JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const retrieveDarkMode = async () => {
  try {
    const value = await AsyncStorage.getItem("darkMode");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    retrieveDarkMode().then((value) => {
      setDarkMode(value);
    });
  }, [retrieveDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    saveDarkMode(newMode);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: darkMode ? "black" : "white",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: darkMode ? "white" : "black",
    },
    button: {
      backgroundColor: darkMode ? "#c4ae1f" : "blue",
      borderRadius: 50,
      padding: 10,
    },
  });

  console.log('header',darkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
      <Button
        onPress={toggleDarkMode}
        buttonStyle={styles.button}
        icon={<Icon name={darkMode ? "sun" : "moon"} size={20} color="white" />}
      />
    </View>
  );
};

export default Header;