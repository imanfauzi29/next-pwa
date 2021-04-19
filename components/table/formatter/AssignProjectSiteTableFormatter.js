import React from "react";
import Utils from "../../../utils/Utils";

export default class AssignProjectSiteTableFormmater {

    static statusFormatter = (cell, row) => {
        if (row.status) {
            return <span className="badge badge-success">ACTIVE</span>;
        } else {
            return <span className="badge badge-danger">NON ACTIVE</span>
        }
    }

    static codeFormatter = (cell, row) => {
        return <span>{row.site_code}</span>
    }

    static nameFormater = (cell, row) => {
        return <span>{row.site_name}</span>
    }
}