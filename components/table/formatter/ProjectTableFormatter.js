import Utils from "../../../utils/Utils";
import React from "react";
import ButtonLink from "../../ButtonLink";

export default class ProjectTableFormatter {
    static createdAtformatter(cell, row) {
        return <span> {Utils.formatDateTime(row.created_at)} </span>;
    }

    static updatedAtFormatter(cell, row) {
        return <span> {Utils.formatDateTime(row.updated_at)} </span>;
    }

    static startDateFormatter(cell, row) {
        return <span> {Utils.formatDateTime(row.start_date)} </span>;
    }

    static endDateFormatter(cell, row) {
        return <span> {Utils.formatDateTime(row.end_date)} </span>;
    }

    static siteFormater = (cell, row) => {
        let icon = (<><i className="fa fa-map-marker"/>&nbsp;&nbsp;</>)
        let url = `/project/${row.id}/site`;
        return (
            <span>
                <ButtonLink url={url} label={`${row.count_site} Site`} icon={icon} />
            </span>
        );
    };

    static fmFormater = (cell, row) => {
        let icon = (<><i className="fa fa-users"/>&nbsp;&nbsp;</>)
        let url = `/project/${row.id}/fm`;
        return (
            <span>
                <ButtonLink label={`${row.count_fm} FM`} url={url} icon={icon} />
            </span>
        );
    };

    static statusFormatter(cell, row) {
        let status = ""
        let color = ""

        if (row.status == 1) {
            status = "ACTIVE"
            color = 'success'
        } else {
            status = "NON ACTIVE"
            color = 'danger'
        }

        return <span className={`badge badge-${color}`}> {status} </span>;
    }
}
