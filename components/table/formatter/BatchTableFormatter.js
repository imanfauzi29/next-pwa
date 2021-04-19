import React from "react";
import Utils from "../../../utils/Utils";
import ButtonLink from "../../ButtonLink";

export default class BatchTableFormatter {
    static fileColumnFormatter = (cell, row) => {
        return (
            <>
                <span>Filename: {row.filename}</span><br/>
                <span>Filesize: {row.file_size}Kb</span><br/>
                <span>Total Row: {Utils.numberWithCommas(row.content_length)}</span>
            </>
        )
    }

    static createdColumnFormatter = (cell, row) => {
        return (
            <>
                <span>Created By: {row.created_by}</span><br/>
                <span>Created At: {Utils.formatDateTime(row.created_at)}</span>
            </>
        )
    }

    static postedColumnFormatter = (cell, row) => {
        return (
            <>
                <span>Created By: {row.posted_by}</span><br/>
                <span>Created At: {Utils.formatDateTime(row.poste)}</span>
            </>
        )
    }

    static smallBatchFormatter = (cell, row) => {
        let url = `/file-management/batch/${row.id}/small-batches`
        let icon = <i className="fa fa-list"/>

        return (<ButtonLink url={url} label={ `${row.small_batch_size} Small Batch` } icon={icon} />)
    }

    static postedColumnFormatter = (cell, row) => {
        return (
            <>
                <span>Posted By: {row.posted_by}</span><br/>
                <span>Posted At: {Utils.formatDateTime(row.posted_at)}</span>
            </>
        )
    }

    static projectFormatter = (cell, row) => {
        return `${row.project_code} - ${row.project_name}`
    }

    static siteFormatter = (cell, row) => {
        return `${row.site_code} - ${row.site_name}`
    }

    static statusColumnFormatter = (cel, row) => {
        console.log(row);
    }
}