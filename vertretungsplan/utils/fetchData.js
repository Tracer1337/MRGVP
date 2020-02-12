import axios from "axios"
import cheerio from "react-native-cheerio"

import DataContainer from "./DataContainer.js"
import DataParser from "./DataParser.js"
import generateUrl from "./generateUrl.js"

export default (onLoadingNextPage, token) => {
    return new Promise((resolve, reject) => {
        const fetchData = async (onLoadingNextPage, i = 1, data = new DataContainer()) => {
            let url = generateUrl(i)
            onLoadingNextPage(i)

            let response, cancelled
            try {
                const CancelToken = axios.CancelToken
                const source = CancelToken.source()
                token.cancel = () => {
                    console.log("[FetchData] Cancel")
                    cancelled = true
                    source.cancel()
                }
                response = await axios.get(url, {
                    cancelToken: source.token
                })
            } catch(error) {
                // Handle 404 (and other) errors
                if(!cancelled) {
                    resolve(data)
                } else {
                    reject()
                }
                return
            }

            if (response.status == 200) {
                const html = response.data
                const $ = cheerio.load(html)
                currentPageDate = DataParser.parseDate($("body").text())
                if (i === 1) data.date = currentPageDate
                if (data.date === currentPageDate) {
                    data.addRaw($)
                    fetchData(onLoadingNextPage, ++i, data)
                } else {
                    resolve(data)
                }
            } else {
                resolve(data)
            }
        }

        fetchData(onLoadingNextPage)
    })
}