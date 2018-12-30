import React from 'react';
import {
  StyleSheet,
  View,
  WebView,
  TouchableOpacity,
  Text
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { WebBrowser } from 'expo';
import CustomButton from "../components/CustomButton";
import Vertretungsplan from "../components/Vertretungsplan";

export default class HomeScreen extends React.Component {

  state = {
    page: 0,
    pageNr: 1
  }

  pages = {
    0: "Schüler",
    1: "Lehrer"
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headline}>Vertretungsplan: { this.getPageName(this.state.page) }</Text>
          <CustomButton
            onPress={() => []}
            icon={Icons.bars}
            fontStyle={styles.menuBtn}
          />
        </View>

        <Vertretungsplan page={this.state.page} pageNr={this.state.pageNr}/>

        <View style={styles.footer}>

          <CustomButton
            onPress={this.switchPage.bind(this)}
            icon={Icons.retweet}
            style={styles.switchPage}
            fontStyle={styles.button}
          >Zum { this.getPageName(this.state.page === 0 ? 1 : 0) }plan</CustomButton>

          <CustomButton
            onPress={this.backward.bind(this)}
            icon={Icons.chevronLeft}
            style={styles.chevron}
            fontStyle={styles.button}
          >Vorige Seite</CustomButton>

          <CustomButton
            onPress={this.forward.bind(this)}
            icon={Icons.chevronRight}
            style={styles.chevron}
            fontStyle={styles.button}
          >Nächste Seite</CustomButton>

        </View>

      </View>
    );
  }

  switchPage(){
    this.setState({
      page: this.state.page === 0 ? 1 : 0,
      pageNr: 1
    })
  }

  forward(){
    this.setState({ pageNr: this.state.pageNr + 1 })
  }

  backward(){
    this.setState({ pageNr: this.state.pageNr <= 1 ? 1 : this.state.pageNr - 1 })
  }

  getPageName(num){
    return this.pages[num]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1/10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold"
  },
  menuBtn: {
    fontSize: 24,
    paddingTop: 7.5
  },
  footer: {
    flex: 1/14,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 7.5,
    paddingTop: 5,
    borderTopWidth: 1
  },
  button: {
    fontSize: 30,
    color: "#2f95dc",
    textAlign: "center",
  },
  switchPage: { flex: 2 },
  chevron: { flex: 1 }
});
