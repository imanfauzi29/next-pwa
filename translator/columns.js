import TimestampTableFormatter from "../components/table/formatter/TimestampTableFormatter";
import t from "./helper";
export default function translateColumn(lang, cols) {
    let translateCols = []
    cols.forEach(col => {
        let c = Object.assign({}, col);
        if (c.text === "table:Action") {
            translateCols.push(
                ...TimestampTableFormatter.getFields(lang),
            )
        }
        let requestTranslate = c.text.includes(":");
        if (requestTranslate) {
            c.text =  t(c.text, lang);
        }
        translateCols.push(c)
    })
    return translateCols
}
