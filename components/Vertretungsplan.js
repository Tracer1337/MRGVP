import React, { Component } from "react"
import {
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { List, Text } from "react-native-paper"
import cheerio from "react-native-cheerio"

export default class Vertretungsplan extends Component{
  state = {data: null}

  getData(i = 1, state = null, res = {}){
    const getState = str => str.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")
    const getWeekday = str => str.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]

    const pad = num => ("000" + num).substr(-3,3)

    console.log(`Fetching https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
    fetch(`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
      .then(res => res.text())
      .then(html => {
        // PARSING DATA
        const $ = cheerio.load(html)
        // GET DATE
        if(i === 1) state = getState($("body").text())
        currentPageState = getState($("body").text())
        if(state === currentPageState){

           // GET WEEKDAY AND PARSE IT TO SCHEMA "<WEEKDAY> (<DATE>)"
           let weekday = getWeekday($(".mon_title").text())
           let date = weekday.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/g)[0]
           weekday = weekday.replace(date, "").trim().concat(` (${date})`)

           // GET ENTRYS
           const fields = $("td.list").map((i, e) => $(e).text()).get()
           const chunkLength = 7
           const entrys = {}

           // ITERATING THROUGH ALL ENTRYS ON PAGE
           for(let i = 0; i < fields.length/chunkLength; i++){
             // COMPUTING ONE ENTRY
             const entry = []
             const cls = fields[i*chunkLength] // ENTRYS CORRESPONDING CLASS
             if(!entrys[cls]) entrys[cls] = []
             // chunkLength - 1 SINCE THE LAST FILD "Neu" SHOULDN'T BE INCLUDED
             for(let j = 1; j < chunkLength - 1; j++){
               // COMPUTING ONE FIELD OF AN ENTRY
               entry.push(fields[i*chunkLength+j])
             }
             entrys[cls].push(entry)
           }

           // INSERTING NEW ENTRYS IN RESULT OBJECT
           res[weekday] = {...res[weekday], ...entrys}
           this.getData(++i, state, res)
         }else{
           // FETCHED ALL DATA => DONE
           console.log(res)
           this.setState({ data: res })
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

      const weekdays = []
      for(let weekday in data){
        const classes = []
        for(let cls in data[weekday]){
          const entrys = []
          for(let entry of data[weekday][cls]){
            console.log(entry)
            entrys.push(
              <List.Accordion title={`${entry[0]} ${entry[4]}`}>
                <List.Item title={`${entry[1]} ${entry[2]} ${entry[3]}`} />
              </List.Accordion>
            )
          }
          classes.push(<List.Accordion title={cls}>{entrys}</List.Accordion>)
        }
        weekdays.push(<List.Section title={weekday} key={weekday}>{classes}</List.Section>)
      }

      return (
      <ScrollView style={styles.container}>
        <Text style={styles.url}>Quelle: https://mrg-online.org/</Text>
        {weekdays}
      </ScrollView>
      )
    }else{
      return(
        <Text>Lädt...</Text>
      )
    }

  }

  parsePageNr(num){
    return ("000" + num).substr(-3,3)
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  url: {
    fontSize: 10,
    marginBottom: 5
  }
})
