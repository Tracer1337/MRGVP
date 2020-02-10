import DataParser from "./DataParser.js"

export default class DataContainer{
    static PlanChunkLength = 6

    constructor() {
        this.info = new Map()
        this.plan = new Map()
        this.date = null
    }

    /**
     * Sort the plan map
     */
    sort = () => {
        // Sort the keys
        const sortByClass = ([a], [b]) => {
            // Filter "MP" and empty field
            if (a.indexOf("MP") !== -1 || !Boolean(a.trim())) return 1
            if (b.indexOf("MP") !== -1 || !Boolean(b.trim())) return -1

            // Extract the classes as integers ("7A" => 7)
            a = parseInt(DataParser.extractClass(a))
            b = parseInt(DataParser.extractClass(b))
            
            // Filter NaN => S1/2 & S3/4
            if (!a) return 1
            if (!b) return -1

            return a - b
        }
        
        // Build sorted map
        this.plan = new Map([...this.plan.entries()].sort(sortByClass))
    }

    addRaw = $ => {
        this.addPlanRaw($)
        this.addInfoRaw($)
    }

    addPlanRaw = $ => {
        const weekday = DataParser.parseWeekday($)

        // Get entries
        const fields = DataParser.extractPlanFields($)

        // Iterate through all entries on page
        for (let i = 0; i < fields.length / DataContainer.PlanChunkLength; i++) {
            // Compute one entry
            const entry = []
            const cls = fields[i * DataContainer.PlanChunkLength] // Entry's corresponding class

            if (!this.plan.has(cls)) this.plan.set(cls, new Map())
            if (!this.plan.get(cls).has(weekday)) this.plan.get(cls).set(weekday, [])

            for (let j = 1; j < DataContainer.PlanChunkLength; j++) {
                // Compute one field of an entry
                entry.push(fields[i * DataContainer.PlanChunkLength + j])
            }

            // Insert new entry into result object
            this.plan.get(cls).get(weekday).push(entry)
        }

        this.sort()
    }

    addInfoRaw = $ => {
        const weekday = DataParser.parseWeekday($)
        const fields = DataParser.extractInfoFields($)

        if (!this.info.has(weekday)) this.info.set(weekday, [])

        for (let field of fields) {
            if (!this.info.get(weekday).includes(field)) this.info.get(weekday).push(field)
        }
    }
}