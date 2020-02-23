const productionUrl = "https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_{}.htm"
const develepmontUrl = "http://192.168.178.26:8080/page_{}"

const baseUrl = __DEV__ ? develepmontUrl : productionUrl

export default pageNr => baseUrl.replace("{}", pageNr.toString().padStart(3, "0"))
