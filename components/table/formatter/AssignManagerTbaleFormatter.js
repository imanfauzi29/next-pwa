import React from "react";
import Utils from "../../../utils/Utils";

export default class AssignManagerTbaleFormatter {
    /***
     *
     * @param cell
     * @param row
     * @returns {JSX.Element}
     */
    static createdFormatter = (cell, row) => {
        return <span> { Utils.formatDateTime(row.created_at) } </span>
    }

    /***
     *
     * @param cell
     * @param row
     * @returns {string}
     */
    static statusFormatter = (cell, row) => {
        let status = row.status ? {color: 'success', text: 'ACTIVE'} : {color: 'danger', text: 'NOT ACTIVE'}
        return <span className={`badge badge-${status.color}`}>{status.text}</span>
    }
}