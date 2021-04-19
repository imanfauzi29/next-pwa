import React from 'react'

export default class ProjectAttributeTableFormatter {
    static projectNameFormatter(cell, row) {
        console.log(row);
        return (<span>{row.project_code} - {row.project_name}</span>)
    }
    
    static taskTypeIdFormatter(cell, row) {
        return (<span>{row.task_type_code} - {row.task_name}</span>)
    }

    static attributeFieldsName(cell, row) {
        console.log(row);
        return (<span>{row.attribute_field_name}</span>)
    }

    static shouldProcess(cell, row) {

        let process = row.should_process ? {color: 'success', value: 'YES'} : {color: 'danger', value: 'NO'}
        return (<span className={`badge badge-${process.color}`}>{process.value}</span>)
    }
}