import React, { Component } from "react"
import {
  WebView,
  Text,
  StyleSheet,
} from 'react-native';

export default class Vertretungsplan extends Component{

  init(){
    this.webview.injectJavaScript("window.stop();const meta=document.createElement('meta');meta.setAttribute('content','width=device-width,initial-scale=0.5,maximum-scale=0.5,user-scalable=0');meta.setAttribute('name','viewport');document.getElementsByTagName('head')[0].appendChild(meta);")
    // const js = `
    //   const send = msg => {
    //     if (document.hasOwnProperty('postMessage')) {
    //       document.postMessage(msg, '*');
    //     } else if (window.hasOwnProperty('postMessage')) {
    //       window.postMessage(msg, '*');
    //     }
    //   }
    //
    //   document.addEventListener("message", data => {
    //     send("Received")
    //   })
    //   send("Initialised")
    // `
    //this.webview.injectJavaScript(js)
  }

  emit(msg){
    this.webview.postMessage("msg")
  }

  render(){
    const url = `https://mrg-online.org/iserv/plan/show/raw/Vertretungsplan%20Sch%C3%BCler/f1/subst_${this.parsePageNr(this.props.pageNr)}.htm`
    return (
    <React.Fragment>
      <Text style={styles.url}>Quelle: http://www.mrg-online.org/</Text>
      <WebView
        ref={ref => this.webview = ref}
        source={{uri: url}}
        scalesPageToFit={false}
        onLoadEnd={this.init.bind(this)}
        style={this.props.style}
        onMessage={e => this.props.onMessage(e.nativeEvent.data) || null}
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
