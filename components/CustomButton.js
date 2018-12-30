import React, { Component } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class CustomButton extends Component{
  render(){
    return(
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <FontAwesome style={this.props.fontStyle}>
          {this.props.icon}
        </FontAwesome>
        <Text style={styles.subtitle}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 10,
    textAlign: "center"
  }
})
