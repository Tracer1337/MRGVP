import React, { Component } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import FontAwesome  from 'react-native-fontawesome';

export default class CustomButton extends Component{
  render(){
    let iconStyle = {}
    let fontStyle = {}
    if(this.props.disabled){
      iconStyle={...this.props.iconStyle, color:"#95a5a6"}
      fontStyle={color:"#95a5a6"}
    }
    return(
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress} disabled={this.props.disabled}>
        <FontAwesome style={{...this.props.iconStyle, ...iconStyle}}>
          {this.props.icon}
        </FontAwesome>
        <Text style={{...styles.subtitle, ...this.props.fontStyle, ...fontStyle}}>{this.props.children}</Text>
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
