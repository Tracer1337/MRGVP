import React, { Component } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

export default class MenuEntry extends Component{
  render(){
    return(
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.entry}
      >
        <Text style={styles.entryTitle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  entry: {
    marginBottom: 8,
    flexDirection: "row"
  },
  icon: {
    fontSize: 22,
    marginRight: 8,
    marginTop: 4
  },
  entryTitle: {
    fontSize: 24
  }
})
