const baseUrl = "https://mrg-online.org/iserv/public/plan/show/Vertretungsplan%20Sch%C3%BCler/ad45b91822493600/f1/subst_{}.htm"

export default pageNr => baseUrl.replace("{}", pageNr.toString().padStart(3, "0"))
