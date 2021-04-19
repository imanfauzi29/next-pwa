import React from "react";

export default class RowNumberFormatter {
    static rowNumberFormatter(cell, row, index) {
        let currentPage = window.table.paginationContext.currPage;
        let currentPageSize = window.table.paginationContext.currSizePerPage;
        let rowNumber = ((currentPage - 1) * currentPageSize) + index + 1
        return (
            <span> {rowNumber} </span>
        )
    }
}