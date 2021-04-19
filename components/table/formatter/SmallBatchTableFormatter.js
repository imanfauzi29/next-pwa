import React from 'react'

export default class SmallBatchTableFormatter {
    static smallBatchNameFormatter(cell, row) {
        console.log(row);
        return (<span>{row.name}</span>)
    }

    static imageQuantityFormatter(cell, row) {
        return (<span>{row.small_batch_size}</span>)
    }

    static statusFormatter(cell, row) {
        return (<span>{row.status}</span>)
    }

    static lastDateFormatter(cell, row) {
        return (<span></span>)
    }
}