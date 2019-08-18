const cheerio = require("cheerio")
const fetch = require("node-fetch")
const { getState, pad, parseWeekday, parsePlan, parseInfo } = require("./Functions")

function getData(){
  return new Promise((resolve, reject) => {

    // Recursive function inside promise => recursion is the promise is needed (callbacks are deprecated)
    async function loadPage(i = 1, res = {info: {}, plan: {}}){
      const url =`https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_${pad(i)}.htm`
      const response = await fetch(url)
      if(response.status != 200){

        // Finished loading latest pages
        console.log("Done")
        resolve(res)
      }else{
        const html = await response.text()
        const $ = cheerio.load(html)

        // Set date of first page to compare it againt the next pages
        if(i === 1) res.state = getState($("body").text())

        // Get date of current processed page
        currentPageState = getState($("body").text())

        // Continue if processed page is up to date
        if(res.state === currentPageState){

           // Extract content of current page
           const weekday = parseWeekday($)
           parsePlan($, weekday, res)
           parseInfo($, weekday, res)

           // Load next pages recursive
           loadPage(++i, res)
         }else{

           // Finished loading latest pages
           console.log("Done")
           resolve(res)
         }
      }
    }
    loadPage()
  })
}

module.exports = {getData}
