import React from "react";
import Utils from "../../../utils/Utils";

export default class AssignProjectFmTableFormmater {

    static statusFormatter = (cell, row) => {
        if (row.status) {
            return <span>Active</span>;
        } else {
            return <span>Non Active</span>
        }
    }

    static codeFormatter = (cell, row) => {
        return <span>{row.fm_code}</span>
    }

    static nameFormater = (cell, row) => {
        return <span>{row.fm_name}</span>
    }
}