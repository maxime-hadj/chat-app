import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You have some workers.</Text>
      </View>
    );
  }
}

export default HomeScreen;