import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome"

export default class FeedbackScreen extends React.Component{

  static navigationOptions = {
    title: "Feedback"
  }

  render(){
    return(
      <View style={styles.container}>

        <Text>Das ist der Feedback Screen</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
})
