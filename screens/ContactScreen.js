import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome"

export default class ContactScreen extends React.Component{

  static navigationOptions = {
    title: "Kontakt"
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.textIconWrapper}>
          <FontAwesome style={styles.icon}>{Icons.user}</FontAwesome>
          <Text style={styles.text}>Merlin Moelter</Text>
        </View>

        <View style={styles.textIconWrapper}>
          <FontAwesome style={styles.icon}>{Icons.envelope}</FontAwesome>
          <Text style={styles.text}>merlin.moelter@gmail.com</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textIconWrapper: {
    flexDirection: "row",
  },
  icon: {
    textAlignVertical: "center",
    fontSize: 18
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
  },
})
