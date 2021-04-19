import React from "react";
import Utils from "../../../utils/Utils";
import ButtonLink from "../../ButtonLink";

export default class SiteManagerTableFormatter {
    static detailSiteFormatter = (cell, row) => {
        let url = `/site-manager/${row.id_user}/site`
        let icon = <i className="fa fa-map-marker"/>

        return (<ButtonLink url={url} label={ `${row.site_count} Site` } icon={icon} />)
    }


    static statusFormatter(cell, row) {
        let status = row.status ? {color: 'success', text: 'ACTIVE'} : {color: 'danger', text: 'NOT ACTIVE'}
        return <span className={`badge badge-${status.color}`}>{status.text}</span>
    }

    static createdAtformatter(cell, row) {
        return (
            <span> {Utils.formatDateTime(row.created_at)} </span>
        )
    }
}