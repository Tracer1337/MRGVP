import React, { Component } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking
} from 'react-native';
import FontAwesome  from 'react-native-fontawesome';

export default class Link extends Component{
  render(){
    return(
      <TouchableOpacity onPress={() => Linking.openURL(this.props.url)}>
        <Text style={styles.text}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#3498db"
  }
})
