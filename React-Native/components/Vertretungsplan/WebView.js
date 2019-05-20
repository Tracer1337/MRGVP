import React, { Component } from "react"
import {
  WebView,
  Text,
  StyleSheet,
  View
} from 'react-native';
import { Icons } from 'react-native-fontawesome';
import CustomButton from "../CustomButton";

export default class VertretungsplanWebView extends Component{

  state = {
    page: 0,
    pageNr: 1
  }

  init(){
    this.webview.injectJavaScript("window.stop();const meta=document.createElement('meta');meta.setAttribute('content','width=device-width,initial-scale=0.5,maximum-scale=0.5,user-scalable=0');meta.setAttribute('name','viewport');document.getElementsByTagName('head')[0].appendChild(meta);")
  }

  switchPage = () => {
    this.setState({
      page: this.state.page === 0 ? 1 : 0,
      pageNr: 1
    })
  }

  forward = () => this.setState({ pageNr: this.state.pageNr + 1 })

  backward = () => this.setState({ pageNr: this.state.pageNr <= 1 ? 1 : this.state.pageNr - 1 })

  render(){
    const url = `https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${this.parsePageNr(this.state.pageNr)}.htm`
    return (
    <React.Fragment>
      <Text style={styles.url}>Quelle: https://mrg-online.org/</Text>
      <WebView
        ref={ref => this.webview = ref}
        source={{uri: url}}
        scalesPageToFit={false}
        onLoadEnd={this.init.bind(this)}
        style={styles.vertretungsplan}
      />

      <View style={styles.footer}>

        <CustomButton
          icon={Icons.retweet}
          style={styles.switchPage}
          iconStyle={styles.button}
          disabled
        >Zum Lehrerplan</CustomButton>

        <CustomButton
          onPress={this.backward.bind(this)}
          icon={Icons.chevronLeft}
          style={styles.chevron}
          iconStyle={styles.button}
          disabled={this.state.pageNr <= 1}
        >Vorherige Seite</CustomButton>

        <CustomButton
          onPress={this.forward.bind(this)}
          icon={Icons.chevronRight}
          style={styles.chevron}
          iconStyle={styles.button}
        >Nächste Seite</CustomButton>

      </View>
    </React.Fragment>
    )
  }

  parsePageNr(num){
    return ("000" + num).substr(-3,3)
  }
}

const styles = StyleSheet.create({
  url: {
    fontSize: 10,
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
})
