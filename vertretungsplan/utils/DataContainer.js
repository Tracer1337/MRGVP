import DataParser from "./DataParser.js"
import sortByClass from "./sortByClass.js"

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
        this.plan = new Map([...this.plan.entries()].sort(([a], [b]) => sortByClass(a, b)))
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

    /**
     * Merge the entries of all classes which keys are including the target key
     */
    getClassData = targetCls => {
        const classElements = new Map()
        
        this.plan.forEach((weekdays, cls) => {
            if(cls.includes(targetCls)) {
                weekdays.forEach((entries, weekday) => {
                    if (!classElements.get(weekday)) {
                        classElements.set(weekday, [])
                    }
                    classElements.get(weekday).push(...entries)
                })
            }
        })

        return classElements
    }
}