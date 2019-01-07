import React from 'react';
import {
  StyleSheet,
  View,
  WebView,
  ActivityIndicator,
  Text
} from 'react-native';
import { Icons } from 'react-native-fontawesome';
import CustomButton from "../components/CustomButton";
import Vertretungsplan from "../components/Vertretungsplan";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: "Schulkalender"
  }

  init(){
    this.webview.injectJavaScript(`
      Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
      }
      document.getElementById("tooltip").remove()
    `)
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={ref => this.webview = ref}
          source={{uri: "https://www.mrg-online.de/fullcalendar/"}}
          onLoadEnd={this.init.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
