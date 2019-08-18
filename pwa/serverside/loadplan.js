import getData from "./pageloader/getData.js"

exports.handler = (event, context, callback) => {
  getData().then(data => callback(null, {
    statusCode: 200,
    body: data
  }))
}
