import React from "react";
import ButtonLink from "../../ButtonLink";
import Utils from "../../../utils/Utils";


export default class SiteTableFormatter {
    /***
     *
     * @param cell
     * @param row
     * @returns {JSX.Element}
     */
    static managerFormater = (cell, row) => {
        let url = `/site/${row.id}/`
        let icon = <i className="fa fa-users"/>
        return (
            <div>
                <ButtonLink url={url} label={ row.site_manager + ' Site Manager' } icon={icon} />
            </div>
        )
    }

    /***
     *
     * @param cell
     * @param row
     * @returns {JSX.Element}
     */
    static statusFormatter(cell, row) {
        let status = row.status ? {color: 'success', text: 'ACTIVE'} : {color: 'danger', text: 'NON ACTIVE'}
        return (
            <span className={`badge badge-${status.color}`}> {status.text} </span>
        )
    }

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
     * @returns {JSX.Element}
     */
    static updatedFormatter = (cell, row) => {
        return <span> { Utils.formatDateTime(row.updated_at) } </span>
    }
}