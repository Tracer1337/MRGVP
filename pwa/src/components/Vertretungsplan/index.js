import React, { Component } from "react"
import jquery from "jquery"

export default class Vertretungsplan extends Component{
  state = {data: null}

  getData = (i = 1, res = {info: [], plan: []}) => {
    let url =`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${i.toString().padStart(3, 0)}.htm`
    fetch(url)
    .then(response => {
      console.log(response)
      if(response.status === 200){
        response.text().then(html => {
          console.log("HTML:", html)
          const $ = jquery(jquery.parseHTML(html))
          // if(i === 1) res.state = getState($("body").text())
          // currentPageState = getState($("body").text())
          // if(res.state === currentPageState){
          //    const weekday = parseWeekday($)
          //    parsePlan($, weekday, res)
          //    parseInfo($, weekday, res)
          //    this.getData(++i, res)
          //  }else{
          //    this.setState({data: res})
          //  }
        })
      }else{
        this.setState({data: res})
      }
    })
    .catch(console.log)
  }

  componentDidMount(){
    this.getData()
  }

  render(){
    return(
      <div>
        Vertretungsplan
        {this.state.data}
      </div>
    )
  }
}
