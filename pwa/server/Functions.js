const getState = str => str.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")
const getWeekday = str => str.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]
const getClass = str => str.substr(0, str.indexOf(" ") !== -1 ? str.indexOf(" ") : str.length)

// const sort = arr => {
//   // SEPERATE KEYS IN ARRAY
//   const keys = Object.keys(arr)
//   // SORT THE KEYS
//   keys.sort((a,b) => {
//     // FILTER "MP" AND EMPTY FIELD
//     if(a.indexOf("MP") !== -1 || !Boolean(a.trim())) return 1
//     if(b.indexOf("MP") !== -1 || !Boolean(b.trim())) return -1
//     a = parseInt(getClass(a))
//     b = parseInt(getClass(b))
//     // FILTER NaN => S1/2 & S3/4
//     if(!a) return 1
//     if(!b) return -1
//     return a - b
//   });
//   // BUILD SORTED ARRAY
//   const sorted = []
//   for(let i = 0; i < keys.length; i++) sorted[keys[i]] = arr[keys[i]]
//   return sorted;
// }

const pad = num => ("000" + num).substr(-3,3)

const parseWeekday = $ => {
  // GET WEEKDAY AND PARSE IT TO SCHEMA "<WEEKDAY> (<DATE>)"
  let weekday = getWeekday($(".mon_title").text())
  let date = weekday.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/g)[0]
  return weekday.replace(date, "").trim().concat(` (${date})`)
}

const parsePlan = ($, weekday, res) => {
  // GET ENTRYS
  const fields = $("td.list").map((i, e) => $(e).text()).get()
  const chunkLength = 7

  // ITERATING THROUGH ALL ENTRYS ON PAGE
  for(let i = 0; i < fields.length/chunkLength; i++){
    // COMPUTING ONE ENTRY
    const entry = []
    const cls = fields[i*chunkLength] // ENTRY'S CORRESPONDING CLASS

    if(!res.plan[cls]) res.plan[cls] = {}
    if(!res.plan[cls][weekday]) res.plan[cls][weekday] = []

    // chunkLength - 1 SINCE THE LAST FILD "Neu" SHOULDN'T BE INCLUDED
    for(let j = 1; j < chunkLength - 1; j++){
      // COMPUTING ONE FIELD OF AN ENTRY
      entry.push(fields[i*chunkLength+j])
    }
    // INSERTING NEW ENTRY IN RESULT OBJECT
    res.plan[cls][weekday].push(entry)
  }
  // res.plan = sort(res.plan)
}

const parseInfo = ($, weekday, res) => {
  const fields = $("td.info").map((i, e) => $(e).text().replace(/\s+/g,' ').trim()).get()
  if(!res.info[weekday]) res.info[weekday] = []
  for(let field of fields){
    if(!res.info[weekday].includes(field)) res.info[weekday].push(field)
  }
}

module.exports = {
  getState,
  getWeekday,
  getClass,
  pad,
  parseWeekday,
  parsePlan,
  parseInfo
}
