import dynamic from "next/dynamic"
import React, { Component } from "react"
import { Tab, Tabs } from "react-bootstrap"
import SessionHelper from "../../utils/SessionHelper"
import Utils from "../../utils/Utils"
const GridDataTable = dynamic(
    () => import("../../components/table/GridDataTable"),
    { ssr: false }
)
import jsonSchema from "./jsonSchema.json"
import uiSchema from "./UiSchema.json"
import formData from "./formData.json"
import InputDataEntryForm from "../../components/InputDataEntryForm"

import EventBus from "eventing-bus"

class DataEntryList extends Component {
    static async getInitialProps(ctx) {
        return { session: await SessionHelper.CheckSession(ctx) }
    }

    constructor(props) {
        super(props)
        this.state = {
            language: props.session.preferedLanguage,
            columns: [],
            data: [],
            tableHead: []
        }
    }

    componentDidMount() {
        /**
         * payload
            {
                {dataField: "", text: "", editorRenderer: () => {...}, attrs: () => {...}, editable: () => {...}}
            }
         */

        let data = Object.entries(jsonSchema.properties).map((element, i) => {
            return {
                dataField: element[0],
                text: element[1].title,
                attrs: (cell, row, rowIndex, colIndex) => ({
                    "data-col": colIndex
                }),
                style: { minWidth: "200px" },
                editable: (cell, row, rowIndex, colIndex) => {
                    if (colIndex === 0) return false 
                    return true
                },
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => { 
                        if (columnIndex > 0) {
                            EventBus.publish("eventAttributeLabel", columnIndex - 1)
                        }
                     }
                }
            }
        })

        let ui = Object.keys(uiSchema).map((item, i) => {
            let type = uiSchema[item]["ui:widget"]
            return {
                dataField: item,
                editorRenderer: (
                    editorProps,
                    value,
                    row,
                    column,
                    rowIndex,
                    columnIndex
                ) => (<InputDataEntryForm key={i} columnIndex={columnIndex} {...editorProps} type={type} value={value} />),
            }
        })
        
        // filter undefined 
        data = this.mergeArrayObjects(data, ui).filter(item => item)

        this.setState({ columns: data, data: formData })
    }

    mergeArrayObjects(arr1,arr2){
        return arr1.map((item,i)=>{
           if(item.dataField === arr2[i].dataField){
             return Object.assign({},item,arr2[i])
           }
        })
      }

    componentDidUpdate() {
        Utils.appendScript("/app/static/js/gridDataTable.js")
    }

    render() {
        let heightTable = (this.props.heightDE * 30) / 100
        return (
            <GridDataTable
                columns={this.state.columns}
                data={this.state.data}
                heightTable={heightTable}
            />
        )
    }
}

export default DataEntryList
