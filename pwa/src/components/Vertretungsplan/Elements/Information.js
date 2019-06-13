import React from "react"

export default ({info}) => {
  console.log(info)
  const weekdays = []
  for(let weekday in info){
    console.log(weekday)
    const entrys = []
    for(let i = 0; i < info[weekday].length; i++){
      const singleInformation = info[weekday][i]
      // const lastElement = i < info[weekday].length - 1
      entrys.push(
        <li key={`${weekday}-${singleInformation}`} >
          <span>{singleInformation}</span>
        </li>
      )
    }
    weekdays.push(
      <ul title={weekday} key={`${weekday}`}>
        {entrys}
      </ul>
    )
  }
  return weekdays
}
