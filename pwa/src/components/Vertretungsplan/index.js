import React, { Component } from "react"
import Information from "./Elements/Information.js"
import Plan from "./Elements/Plan.js"
import Typography from "@material-ui/core/Typography"

export default class Vertretungsplan extends Component{
  state = {data: null}

  getData = async () => {
    const response = await fetch("http://"+window.location.hostname+"/api")
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
        <Typography variant="h6">Informationen</Typography>
        <Information info={info}/>

        <Typography variant="h6">Vertretungsplan</Typography>
        <Plan plan={plan}/>
      </div>
    )
  }
}
