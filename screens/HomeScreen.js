import React from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text
} from 'react-native';
import { Icons } from 'react-native-fontawesome';
import CustomButton from "../components/CustomButton";
import Vertretungsplan from "../components/Vertretungsplan";

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
      )
    }
  }

  constructor(props){
    super(props)
    this.lastSite = this.lastSite.bind(this)
  }

  state = {
    page: 0,
    pageNr: 1
  }

  pages = {
    0: "Schüler",
    1: "Lehrer"
  }

  getPageName = num => this.pages[num]

  switchPage = () => {
    this.setState({
      page: this.state.page === 0 ? 1 : 0,
      pageNr: 1
    })
  }

  forward = () => this.setState({ pageNr: this.state.pageNr + 1 })

  backward = () => this.setState({ pageNr: this.state.pageNr <= 1 ? 1 : this.state.pageNr - 1 })

  //Boolean([].filter.call(document.getElementsByTagName("meta"), e => e.getAttribute("content").includes("URL=subst_001.htm")).length)
  lastSite(){
    return false
  }

  render() {
    return (
      <View style={styles.container}>

        <Vertretungsplan
          page={this.state.page}
          pageNr={this.state.pageNr}
          style={styles.vertretungsplan}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  vertretungsplan: {
    marginTop: 5
  },
  footer: {
    flex: 1/14,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
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

// <View style={styles.footer}>
//
//   <CustomButton
//     icon={Icons.retweet}
//     style={styles.switchPage}
//     iconStyle={styles.button}
//     disabled
//   >Zum Lehrerplan</CustomButton>
//
//   <CustomButton
//     onPress={this.backward.bind(this)}
//     icon={Icons.chevronLeft}
//     style={styles.chevron}
//     iconStyle={styles.button}
//     disabled={this.state.pageNr <= 1}
//   >Vorige Seite</CustomButton>
//
//   <CustomButton
//     onPress={this.forward.bind(this)}
//     icon={Icons.chevronRight}
//     style={styles.chevron}
//     iconStyle={styles.button}
//     disabled={this.lastSite()}
//   >Nächste Seite</CustomButton>
//
// </View>
