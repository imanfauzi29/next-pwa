import Utils from "../../../utils/Utils";
import React from "react";
import t from "../../../translator/helper";

export default class TimestampTableFormatter {
    static getFields(language) {
        return [
            {dataField: 'created_by', text: t('table:Created By', language), formatter: this.createdByFormatter},
            {dataField: 'created_at', text: t('table:Timestamp', language), formatter: this.createdAtformatter},
        ]
    }

    static createdByFormatter(cell, row) {
        return <span>{row.created_by}</span>
    }

    static createdAtformatter(cell, row) {
        let dateCreated = Utils.formatDateTime(row.created_at)
        let dateUpdated = Utils.formatDateTime(row.updated_at)
        return (
            <p>
                <span> Created: {dateCreated} </span><br/>
                <span> Last Update: {dateUpdated} </span>
            </p>
        )
    }

}