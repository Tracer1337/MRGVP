import React, { Component } from "react"
import { View, StyleSheet } from 'react-native';
import { List, Text, Surface, Title, Divider } from "react-native-paper"

export const getState = str => str.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")
export const getWeekday = str => str.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]
export const getClass = str => str.substr(0, str.indexOf(" ") !== -1 ? str.indexOf(" ") : str.length)

export const sort = arr => {
  //SEPERATE KEYS IN ARRAY
  const keys = Object.keys(arr)
  //SORT THE KEYS
  keys.sort((a,b) => {
    // FILTER "MP" AND EMPTY FIELD
    if(a.indexOf("MP") !== -1 || !Boolean(a.trim())) return 1
    if(b.indexOf("MP") !== -1 || !Boolean(b.trim())) return -1
    a = parseInt(getClass(a))
    b = parseInt(getClass(b))
    // FILTER NaN => S1/2 & S3/4
    if(!a) return 1
    if(!b) return -1
    return a - b
  });
  //BUILD SORTED ARRAY
  const sorted = []
  for(let i = 0; i < keys.length; i++) sorted[keys[i]] = arr[keys[i]]
  return sorted;
}

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

  // ITERATING THROUGH ALL ENTRYS ON PAGE
  for(let i = 0; i < fields.length/chunkLength; i++){
    // COMPUTING ONE ENTRY
    const entry = []
    const cls = fields[i*chunkLength] // ENTRY'S CORRESPONDING CLASS

    if(!res.plan[cls]) res.plan[cls] = []
    if(!res.plan[cls][weekday]) res.plan[cls][weekday] = []

    // chunkLength - 1 SINCE THE LAST FILD "Neu" SHOULDN'T BE INCLUDED
    for(let j = 1; j < chunkLength - 1; j++){
      // COMPUTING ONE FIELD OF AN ENTRY
      entry.push(fields[i*chunkLength+j])
    }
    // INSERTING NEW ENTRY IN RESULT OBJECT
    res.plan[cls][weekday].push(entry)
  }
  res.plan = sort(res.plan)
}

export const parseInfo = ($, weekday, res) => {
  const fields = $("td.info").map((i, e) => $(e).text().replace(/\s+/g,' ').trim()).get()
  if(!res.info[weekday]) res.info[weekday] = []
  for(let field of fields){
    if(!res.info[weekday].includes(field)) res.info[weekday].push(field)
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
      for(let i = 0; i < plan[cls][weekday].length; i++){
        const entry = plan[cls][weekday][i]
        const lastElement = i < plan[cls][weekday].length - 1
        entrys.push(
          <React.Fragment key={`${cls}-${weekday}-${entry[0]}-${entry[1]}-${entry[2]}`} >
            <View style={[lastElement ? styles.spacing : null]}>
              <Title>Stunde: {entry[0]}</Title>
              <Entry title="Vertreter:" value={entry[1]}/>
              <Entry title="Fach:"      value={entry[2]}/>
              <Entry title="Raum:"      value={entry[3]}/>
              <Entry title="Kommentar:" value={entry[4]}/>
            </View>
            {lastElement ? <Divider /> : null}
          </React.Fragment>
        )
      }
      weekdays.push(
        <Surface key={`${cls}-${weekday}`} style={styles.surface}>
          <Title style={styles.spacing}>{weekday}</Title>
          <Divider />
          {entrys}
        </Surface>
      )
    }
    classes.push(<List.Accordion title={cls} key={cls}>{weekdays}</List.Accordion>)
  }
  return classes
}

export const infoElements = infos => {
  const weekdays = []
  for(let weekday in infos){
    const entrys = []
    for(let i = 0; i < infos[weekday].length; i++){
      const info = infos[weekday][i]
      const lastElement = i < infos[weekday].length - 1
      entrys.push(
        <React.Fragment key={`${weekday}-${info}`} >
          <View style={[lastElement ? styles.spacing : null]}>
            <Text>{info}</Text>
          </View>
          {lastElement ? <Divider /> : null}
        </React.Fragment>
      )
    }
    weekdays.push(
      <List.Accordion title={weekday} key={`${weekday}`}>
        <Surface style={styles.surface}>
          {entrys}
        </Surface>
      </List.Accordion>
    )
  }
  return weekdays
}

const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    margin: 10,
    padding: 10,
    paddingTop: 0
  },
  spacing: {
    marginBottom: 10,
    marginTop: 10
  }
})
