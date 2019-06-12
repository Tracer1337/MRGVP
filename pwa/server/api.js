const cheerio = require("cheerio")
const fetch = require("node-fetch")
const { getState, pad, parseWeekday, parsePlan, parseInfo } = require("./Functions")

function getData(){
  return new Promise((resolve, reject) => {
    function loadPage(i = 1, res = {info: [], plan: []}){
      const url =`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`
      fetch(url)
      .then(response => {
        if(response.status == 200){
          response.text().then(html => {
            const $ = cheerio.load(html)
            if(i === 1) res.state = getState($("body").text())
            currentPageState = getState($("body").text())
            if(res.state === currentPageState){
               const weekday = parseWeekday($)
               parsePlan($, weekday, res)
               parseInfo($, weekday, res)
               loadPage(++i, res)
             }else{
               console.log("Done")
               resolve(res)
             }
          })
        }else{
          console.log("Done")
          resolve(res)
        }
      })
      .catch(reject)
    }
    loadPage()
  })
}

getData().then(console.log).catch(console.log)
