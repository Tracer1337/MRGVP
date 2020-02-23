import DataParser from "./DataParser.js"

// Filter S1/2 & S3/4
const parse = str => parseInt(str === "S1/2" ? 11 : str === "S3/4" ? 12 : str)

// Push lower classes to the start and higher ones to the end
export default (a, b) => {
    // Filter "MP" and empty field
    if (a.indexOf("MP") !== -1 || !Boolean(a.trim())) return 1
    if (b.indexOf("MP") !== -1 || !Boolean(b.trim())) return -1

    // Extract the classes as integers ("7A" => 7, "S1/2" => "S1/2")
    a = parse(DataParser.extractClass(a))
    b = parse(DataParser.extractClass(b))

    return a - b
}