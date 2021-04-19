import Common from "../locales/common.json"
import Button from "../locales/button.json"
import Modal from "../locales/modal.json"
import Menu from "../locales/menu.json"
import Dialog from "../locales/dialog.json"
import Table from "../locales/table.json"
import Filter from "../locales/filter.json"

const data = {
    common: Common,
    button: Button,
    modal: Modal,
    menu: Menu,
    dialog: Dialog,
    table: Table,
    filter: Filter
}

export default function t(text, lang = "en") {
    let split = text.split(":")
    if (split.length !== 2) {
        return "Error"
    }
    let namespace = split[0]
    let txt = split[1]
    if (lang === "en") {
        return Object.keys(data[namespace]).find(
            (key) => data[namespace][key] === data[namespace][txt]
        )
    } else {
        return data[namespace][txt]
    }
}
