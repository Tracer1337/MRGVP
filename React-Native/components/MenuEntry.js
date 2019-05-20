import React, { Component } from "react"
import {
  StyleSheet,
} from 'react-native'
import { TouchableRipple, Text } from "react-native-paper"

export default class MenuEntry extends Component{
  render(){
    return(
      <TouchableRipple
        onPress={this.props.onPress}
        style={styles.entry}
      >
        <Text style={styles.entryTitle}>{this.props.title}</Text>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  entry: {
    marginBottom: 8
  },
  entryTitle: {
    fontSize: 24
  }
})
