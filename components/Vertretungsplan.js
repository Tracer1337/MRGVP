import React, { Component } from "react"
import {
  WebView,
  Text,
  StyleSheet,
} from 'react-native';

export default class Vertretungsplan extends Component{

  init(){
    this.webview.injectJavaScript("window.stop();const meta=document.createElement('meta');meta.setAttribute('content','width=device-width,initial-scale=0.5,maximum-scale=0.5,user-scalable=0');meta.setAttribute('name','viewport');document.getElementsByTagName('head')[0].appendChild(meta);")
  }

  render(){
    const url = `http://www.mrg-online.de/upload/Untis_${this.props.page === 0 ? "Schueler" : "Lehrer"}/subst_${this.parsePageNr(this.props.pageNr)}.htm`;
    return (
    <React.Fragment>
      <Text style={styles.url}>Quelle: http://www.mrg-online.de/</Text>
      <WebView
        ref={ref => this.webview = ref}
        source={{uri: url}}
        scalesPageToFit={false}
        onLoadEnd={this.init.bind(this)}
        style={this.props.style}
      />
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
  }
})
