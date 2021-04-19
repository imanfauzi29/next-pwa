import React from "react";
import Utils from "../../../utils/Utils";
import {Button} from "react-bootstrap";

export default class WorkflowTableFormatter {
    static statusFormatter(cell, row) {
        let process = row.status === 1 ? {color: 'success', value: 'DEPLOYED'} : {color: 'secondary', value: 'IDDLE'}
        return (
            <div>
                <span className={`badge badge-${process.color}`}>{process.value}</span>
            </div>
        )
    }
}