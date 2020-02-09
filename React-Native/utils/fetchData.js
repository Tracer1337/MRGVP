import cheerio from "react-native-cheerio"

import DataContainer from "./DataContainer.js"
import DataParser from "./DataParser.js"
import generateUrl from "./generateUrl.js"

export default (onLoadingNextPage) => {
    return new Promise(resolve => {
        const fetchData = async (onLoadingNextPage, i = 1, data = new DataContainer()) => {
            let url = generateUrl(i)
            onLoadingNextPage(i)
            const response = await fetch(url).catch(console.error)

            if (response.status == 200) {
                response.text().then(html => {
                    const $ = cheerio.load(html)
                    currentPageDate = DataParser.parseDate($("body").text())
                    if (i === 1) data.date = currentPageDate
                    if (data.date === currentPageDate) {
                        data.addRaw($)
                        fetchData(onLoadingNextPage, ++i, data)
                    } else {
                        resolve(data)
                    }
                })
            } else {
                resolve(data)
            }
        }

        fetchData(onLoadingNextPage)
    })
}