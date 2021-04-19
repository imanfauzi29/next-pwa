import React from "react";
import Utils from "../../../utils/Utils";
import {Badge} from "react-bootstrap";

export default class UserTableFormatter extends React.Component {
    static createdAtFormatter(cell, row) {
        let format_date = Utils.formatDateTime(row.created_at)

        return (
            <span> {format_date} </span>
        )
    }

    static updatedAtFormatter(cell, row) {
        let format_date = Utils.formatDateTime(row.updated_at)

        return (
            <span> {format_date} </span>
        )
    }

    static statusFormatter(cell, row) {
        let status = '';
        let variant = '';
        if (row.status) {
            variant = 'success';
            status = 'ACTIVE';
        } else {
            variant = 'danger';
            status = 'NON ACTIVE';
        }

        return (
            <Badge variant={variant}> {status} </Badge>
        )
    }
}