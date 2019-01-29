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
    this.state = {
      data: null,
      refreshing: false
    }
  }

  getData(i = 1, res = {info: {}, plan: {}}){
    this.setState({ refreshing: true })
    console.log(`Fetching https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
    fetch(`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
      .then(res => res.text())
      .then(html => {
        const $ = cheerio.load(html)
        if(i === 1) res.state = getState($("body").text())
        currentPageState = getState($("body").text())
        if(res.state === currentPageState){
           const weekday = parseWeekday($)
           parsePlan($, weekday, res)
           parseInfo($, weekday, res)
           this.getData(++i, res)
         }else{
           this.setState({ data: res, refreshing: false })
           console.log(res)
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
  }
})
