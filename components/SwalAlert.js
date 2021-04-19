import React from "react";
import Swal from "sweetalert2";
import Utils from "../utils/Utils";

export default class SwalAlert extends React.Component {
    static showAlert(message = "", status = "success") {
        let lang = Utils.getLang();

        return Swal.fire({
            title: message,
            confirmButtonText: t("dialog:ok", lang),
            icon: status,
        });
    }

    static showAlertQuestion(question = "") {
        let lang = Utils.getLang();

        return Swal.fire({
            title: question,
            confirmButtonText: t("dialog:yes", lang),
            showCancelButton: true,
            icon: "question",
        });
    }
}
