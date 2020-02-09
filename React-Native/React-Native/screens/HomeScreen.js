import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icons } from 'react-native-fontawesome';
import CustomButton from "../components/CustomButton";
import Vertretungsplan from "../components/Vertretungsplan";
import VertretungsplanWebView from "../components/Vertretungsplan/WebView"

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return{
      title: "MRG Vertretungsplan",
      headerLeft: (
        <CustomButton
          onPress={() => navigation.navigate("Menu")}
          icon={Icons.bars}
          iconStyle={{fontSize: 18, marginLeft: 22, marginTop: 6}}
        />
      ),
      headerRight: (
        <CustomButton
          onPress={navigation.getParam("switchMode")}
          icon={Icons.retweet}
          iconStyle={{fontSize: 18, marginRight: 22, marginTop: 6}}
        />
      )
    }
  }

  state = {
    webview: false
  }

  switchMode = () => this.setState({ webview: !this.state.webview })

  componentDidMount(){
    this.props.navigation.setParams({ switchMode: this.switchMode })
  }

  render() {
    if(!this.state.webview){
      return (
        <View style={styles.container}>
          <Vertretungsplan />
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <VertretungsplanWebView />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
