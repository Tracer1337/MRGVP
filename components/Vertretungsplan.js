import React, { Component } from "react"
import {
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import cheerio from "react-native-cheerio"

export default class Vertretungsplan extends Component{

  state = {
    data: [
      {name: "Test1"},
      {name: "Test2"},
      {name: "Test3"}
    ]
  }

  getData(i = 1, state = null, res = []){
    const getState = str => str.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")
    const getWeekday = str => str.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]

    const pad = num => ("000" + num).substr(-3,3)

    console.log(`Fetching https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
    fetch(`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`)
      .then(res => res.text())
      .then(html => {
        const $ = cheerio.load(html)
        // GET DATE
        if(i === 1) state = getState($("body").text())
        currentPageState = getState($("body").text())
        if(state === currentPageState){
           // GET WEEKDAY
           const weekday = getWeekday($(".mon_title").text())
           // GET ENTRYS
           const fields = $("td.list").map((i, e) => $(e).text()).get()
           const chunkLength = 7
           const entrys = []

           for(let i = 0; i < fields.length/chunkLength; i++){
             const temp = []
             // chunkLength - 1 SINCE THE LAST FILD "Neu" SHOULDN'T BE INCLUDED
             for(let j = 0; j < chunkLength - 1; j++){
               temp.push(fields[i*chunkLength+j])
             }
             entrys.push(temp)
           }
           // INSERTING NEW ENTRYS IN RESULT OBJECT
           res = res.concat(entrys)
           this.getData(++i, state, res)
         }else{
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
    const url = `https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${this.parsePageNr(this.props.pageNr)}.htm`
    return (
    <React.Fragment>
      <Text style={styles.url}>Quelle: https://mrg-online.org/</Text>
      <FlatList
        data={this.state.data}
        renderItem={({item}) =>{
          console.log(item)
          return(
            <View>
              <Text style={styles.class}>{item[0]}</Text>
              <Text style={styles.lesson}>{item[1]}</Text>
              <Text style={styles.teacher}>{item[2]}</Text>
              <Text style={styles.subject}>{item[3]}</Text>
              <Text style={styles.room}>{item[4]}</Text>
              <Text style={styles.comment}>{item[5]}</Text>
            </View>
          )
        }}
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
