import React, { Component } from "react"
import Information from "./Elements/Information.js"
import Plan from "./Elements/Plan.js"

export default class Vertretungsplan extends Component{
  state = {data: null}

  getData = async () => {
    const response = await fetch("http://localhost/api")
    const data = await response.json()
    this.setState({data})
  }

  componentDidMount(){
    this.getData()
  }

  render(){
    if(!this.state.data) return <div>Loading...</div>
    const {info, plan} = this.state.data
    return(
      <div style={{margin: 10}}>
        Vertretungsplan
        <Information info={info}/>
        <Plan plan={plan}/>
      </div>
    )
  }
}
