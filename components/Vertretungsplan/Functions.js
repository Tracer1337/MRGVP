import React, { Component } from "react"
import { View } from 'react-native';
import { List, Text, Surface, Title, Divider } from "react-native-paper"

export const getState = str => str.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")
export const getWeekday = str => str.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]

export const pad = num => ("000" + num).substr(-3,3)

export const parseWeekday = $ => {
  // GET WEEKDAY AND PARSE IT TO SCHEMA "<WEEKDAY> (<DATE>)"
  let weekday = getWeekday($(".mon_title").text())
  let date = weekday.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/g)[0]
  return weekday.replace(date, "").trim().concat(` (${date})`)
}

export const parsePlan = ($, weekday, res) => {
  // GET ENTRYS
  const fields = $("td.list").map((i, e) => $(e).text()).get()
  const chunkLength = 7
  const entrys = {}

  // ITERATING THROUGH ALL ENTRYS ON PAGE
  for(let i = 0; i < fields.length/chunkLength; i++){
    // COMPUTING ONE ENTRY
    const entry = []
    const cls = fields[i*chunkLength] // ENTRY CORRESPONDING CLASS

    if(!res.plan[cls]) res.plan[cls] = {}
    if(!res.plan[cls][weekday]) res.plan[cls][weekday] = []

    // chunkLength - 1 SINCE THE LAST FILD "Neu" SHOULDN'T BE INCLUDED
    for(let j = 1; j < chunkLength - 1; j++){
      // COMPUTING ONE FIELD OF AN ENTRY
      entry.push(fields[i*chunkLength+j])
    }
    // INSERTING NEW ENTRY IN RESULT OBJECT
    res.plan[cls][weekday].push(entry)
  }
}

export const parseInfo = ($, weekday, res) => {
  const fields = $("td.info").map((i, e) => $(e).text().replace(/\s+/g,' ').trim()).get()
  if(!res.info[weekday]) res.info[weekday] = []
  for(let field of fields){
    res.info[weekday].push(field)
  }
}

const Entry = ({title, value}) => (
  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
    <Text style={{ flex: 1, alignSelf: 'stretch' }}>{title}</Text>
    <Text style={{ flex: 1, alignSelf: 'stretch' }}>{value}</Text>
  </View>
)

export const planElements = plan => {
  const classes = []
  for(let cls in plan){
    const weekdays = []
    for(let weekday in plan[cls]){
      const entrys = []
      for(let entry of plan[cls][weekday]){
        entrys.push(
          <Surface key={`${cls}-${weekday}-${entry[0]}`} style={{ elevation: 3, margin: 10, padding: 10, paddingTop: 0 }}>
            <Title>Stunde: {entry[0]}</Title>
            <Entry title="Vertreter:" value={entry[1]}/>
            <Entry title="Fach:"      value={entry[2]}/>
            <Entry title="Raum:"      value={entry[3]}/>
            <Entry title="Kommentar:" value={entry[4]}/>
          </Surface>
        )
      }
      weekdays.push(<List.Accordion title={weekday} key={`${cls}-${weekday}`}>{entrys}</List.Accordion>)
    }
    classes.push(<List.Accordion title={cls} key={cls}>{weekdays}</List.Accordion>)
  }
  return classes
}

export const infoElements = infos => {
  const weekdays = []
  for(let weekday in infos){
    const entrys = []
    for(let info of infos[weekday]){
      entrys.push(
        <View key={`${weekday}-${info}`} style={{ margin: 5, marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10}}>
          <Text>{info}</Text>
        </View>
      )
    }
    weekdays.push(
      <List.Accordion title={weekday} key={`${weekday}`}>{entrys}</List.Accordion>
    )
  }
  return weekdays
}
