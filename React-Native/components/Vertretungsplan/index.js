import React, { Component } from "react"
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl
} from 'react-native';
import { List, Text, Surface, Title, Divider, Headline } from "react-native-paper"
import cheerio from "react-native-cheerio"
import { getState, getWeekday, pad, parseWeekday, parsePlan, parseInfo, planElements, infoElements } from "./Functions"

export default class Vertretungsplan extends Component{

  constructor(props){
    super(props)
    this.getData = this.getData.bind(this)
    this.getDataDone = this.getDataDone.bind(this)
    this.state = {
      data: null,
      refreshing: false,
      loadingStatus: "Initialisieren"
    }
  }

  getDataDone = res => {
    this.setState({ data: res, loadingStatus: "done", refreshing: false })
  }

  getData(i = 1, res = {info: [], plan: []}){
    this.setState({ refreshing: true })
    let url =`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${i.toString().padStart(3, "0")}.htm`
    this.setState({ loadingStatus: `Seite ${i} wird geladen...` })
    fetch(url)
    .then(response => {
      if(response.status == 200){
        response.text().then(html => {
          const $ = cheerio.load(html)
          if(i === 1) res.state = getState($("body").text())
          currentPageState = getState($("body").text())
          if(res.state === currentPageState){
             const weekday = parseWeekday($)
             parsePlan($, weekday, res)
             parseInfo($, weekday, res)
             this.getData(++i, res)
           }else{
             this.getDataDone(res)
           }
        })
      }else{
        this.getDataDone(res)
      }
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    this.getData()
  }

  render(){
    // KLASSE / STUNDE / VERTRETER / FACH / RAUM / KOMMENTAR
    let { data } = this.state
    if(data){
      return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getData}
          />
        }
      >
        {this.state.refreshing ? <Text>{this.state.loadingStatus}</Text> : null}
        <View style={styles.header}>
          <Text style={styles.headerText}>Quelle: https://mrg-online.org/</Text>
          <Text style={styles.headerText}>Stand: {this.state.data.state}</Text>
        </View>
        <Title style={styles.headline}>Informationen</Title>
          {infoElements(data.info)}
        <Title style={styles.headline}>Vertretungsplan</Title>
          {planElements(data.plan)}
      </ScrollView>
      )
    }else{
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"/>
          <View style={styles.loadingCaption}>
            <Text>{this.state.loadingStatus}</Text>
          </View>
        </View>
      )
    }

  }

  parsePageNr(num){
    return ("000" + num).substr(-3,3)
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  container: {

  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
  },
  headerText: {
    fontSize: 10
  },
  headline: {
    marginLeft: 10
  },
  loadingCaption: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  }
})
