import React from "react";
import ButtonLink from "../../ButtonLink";
export default class TaskTypeTableFormatter {
    static zeebeProcessFormater = (cell, row) => {
        let url = `/workflow/view/${row.workflow_id}/`
        let icon = <i className="fa fa-random"/>
        return (<ButtonLink url={url} label={`${row.workflow_code} - ${row.workflow_title}`} icon={icon} />)
    }

    static taskNameFormatter = (cell, row) => {
        return (<span>{row.task_type_id} - {row.task_name}</span>)
    }
}