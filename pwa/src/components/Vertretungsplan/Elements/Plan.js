import React from "react"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"

const Entry = ({title, value}) => (
  <div style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
    <span style={{ flex: 1, alignSelf: 'stretch' }}>{title}</span>
    <span style={{ flex: 1, alignSelf: 'stretch' }}>{value}</span>
  </div>
)

export default ({plan}) => {
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
            <div>
              <h3>Stunde: {entry[0]}</h3>
              <Entry title="Vertreter:" value={entry[1]}/>
              <Entry title="Fach:"      value={entry[2]}/>
              <Entry title="Raum:"      value={entry[3]}/>
              <Entry title="Kommentar:" value={entry[4]}/>
            </div>
            {lastElement ? <hr/> : null}
          </React.Fragment>
        )
      }
      weekdays.push(
        <div key={`${cls}-${weekday}`}>
          <h3 style={{}}>{weekday}</h3>
          <hr/>
          {entrys}
        </div>
      )
    }
    classes.push(
      <ExpansionPanel key={cls}>
        <ExpansionPanelSummary>
          {Boolean(cls.trim()) ? cls : "Sonstiges"}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {weekdays}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
  return classes
}
