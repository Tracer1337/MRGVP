export default class DataParser{
    static parseDate = rawString => rawString.match(/Stand: [0-9:. ]+/g)[0].replace("Stand: ", "")

    static extractWeekday = rawString => rawString.match(/[0-9]+.[0-9]+.[0-9]+ [A-z]+/g)[0]

    static extractClass = rawString => rawString.match(/(\d+|S\d{1}\/\d{1})/)[0]

    static parseWeekday = $ => {
        // Get weekday and parse it to schema "<Weekday> (<Date>)"
        const weekday = DataParser.extractWeekday($(".mon_title").text())
        const date = weekday.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/g)[0]
        return weekday.replace(date, "").trim().concat(` (${date})`)
    }

    static extractPlanFields = $ => $("td.list").map((i, e) => $(e).text()).get()

    static extractInfoFields = $ => $("td.info").map((i, e) => $(e).text().replace(/\s+/g, ' ').trim()).get()
}