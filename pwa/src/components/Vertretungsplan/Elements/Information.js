import React from "react"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"

export default ({info}) => {
  const weekdays = []
  for(let weekday in info){
    const entrys = []
    for(let i = 0; i < info[weekday].length; i++){
      const singleInformation = info[weekday][i]
      const lastElement = i < info[weekday].length - 1
      entrys.push(
        <div key={`${weekday}-${singleInformation}`} >
          <span>{singleInformation}</span>
          {lastElement ? <hr/> : null}
        </div>
      )
    }
    weekdays.push(
      <ExpansionPanel key={`${weekday}`}>
        <ExpansionPanelSummary>
          {weekday}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {entrys}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
  return weekdays
}
