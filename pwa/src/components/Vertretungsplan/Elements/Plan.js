import React from "react"

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
            <div style={{}}>
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
        <div key={`${cls}-${weekday}`} style={{}}>
          <h3 style={{}}>{weekday}</h3>
          <hr/>
          {entrys}
        </div>
      )
    }
    classes.push(<ul title={Boolean(cls.trim()) ? cls : "Sonstiges"} key={cls}>{weekdays}</ul>)
  }
  return classes
}
