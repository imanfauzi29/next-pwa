import moment from "moment"
import { Base64 } from "js-base64"
import Swal from "sweetalert2"
import t from "../translator/helper"

export default class Utils {
    static encodePayload(data) {
        let payload = JSON.stringify(data)
        return encodeURIComponent(Base64.encode(payload))
    }

    static formatDateTime(data) {
        return moment(data).format("yyyy-MM-DD HH:mm:ss")
    }

    static convertFormatDate(data, format = "yyyy-MM-DD") {
        return moment(data).format(format)
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    static mapOptionsToValues(options, key) {
        return options.map((option) => ({
            value: option[key],
            label: option[key]
        }))
    }

    static stringToBool(string) {
        if (string != "0" || string != 0) {
            return true
        } else {
            return false
        }
    }

    static boolToString(bool) {
        if (bool == "true" || bool == true) {
            return "1"
        } else {
            return "0"
        }
    }

    static appendScript(scriptToAppend) {
        const script = document.createElement("script")
        script.src = scriptToAppend
        script.async = true
        document.body.appendChild(script)
    }

    static appendCss(scriptToAppend) {
        const script = document.createElement("link")
        script.rel = "stylesheet"
        script.href = scriptToAppend
        document.head.appendChild(script)
    }

    static removeScript(scriptToremove) {
        let allsuspects = document.getElementsByTagName("script")
        for (let i = allsuspects.length; i >= 0; i--) {
            if (
                allsuspects[i] &&
                allsuspects[i].getAttribute("src") !== null &&
                allsuspects[i]
                    .getAttribute("src")
                    .indexOf(`${scriptToremove}`) !== -1
            ) {
                allsuspects[i].parentNode.removeChild(allsuspects[i])
            }
        }
    }

    static messageConfirmationDelete(language, row = '') {
        return `${t("dialog:Do you really want to delete", language)} <b>${row}</b>?<br/>${t("dialog:This process cannot be undone", language)}`
    };

    static withUserConfirmation(message, onConfirmed, language, type = 'delete', title = 'Are You Sure ?') {
        Swal.fire({
            title: t(`dialog:${title}`, language),
            html: message,
            confirmButtonText: type !== 'delete' ? t('dialog:Yes', language) : t("dialog:Delete", language),
            showCancelButton: true,
            cancelButtonText: `${t("dialog:Cancel", language)}`,
            customClass: {
                cancelButton: "btn__sm w__100 bg-light-grey",
                confirmButton: `btn__sm w__100 ${type !== 'delete' ? 'bg-light-primary' : 'bg-light-red'}`
            },
            icon: type !== 'delete' ? "question" : "error",
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirmed()
            }
        })
    }

    static fieldInputDate = (date) => {
        let datePart = date.match(/\d+/g),
            year = datePart[0],
            month = datePart[1],
            day = datePart[2]

        let formatDate = `${year}-${month}-${day}`
        return moment(formatDate).toDate()
    }

    static camelizeString = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      }
}
