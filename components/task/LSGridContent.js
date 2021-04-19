import React from 'react'
import filterFactory, {Comparator} from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Api from '../../services/Api'
import dynamic from "next/dynamic"
import BootstrapTable from "react-bootstrap-table-next";
import UserTaskService from "../../services/UserTaskService";

export default class LSGridContent extends React.Component {
    constructor(props) {
        super(props)
        this.account = props.session.user.image.account
        this.rowEvents = {
            onClick: (e, row, rowIndex) => {
                // EventBus.publish("renderLS", row.lsJson)
                this.setState({
                    selectedRowIndex: rowIndex,
                    selectedRowData: row
                })
                props.selectedRowData(row, rowIndex);
            }
        };
        
        this.api = new Api(props.session)
        this.state = {
            table: {
                data: [],
                page: 1,
                perPage: 10,
                totalData: 0,
                url: props.url, 
                columns: [
                    {dataField: "id", text:"#",},
                    {dataField: 'content_id', text: 'ID'},
                    {dataField: 'image', text: 'Image', formatter: this.imageFormatter},
                    {dataField: 'is_completed', text: 'Status', formatter: this.statusFormatter}
                ]
            },
            selectedRowIndex: props.selectedIndex,
            selectedRowData: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            let index = this.props.selectedIndex;
            this.setState({
                selectedRowIndex: index
            })
        }

        if (Object.keys(prevProps.data).length !== 0 && this.state.table.data.length === 0) {
            let data = this.props.data
            this.setData(data)
        }

        if (this.state.table.data !== this.props.data.records && this.state.table.data.length > 0) {
            let data = this.props.data
            this.setData(data)
        }
    }

    rowClasses = (row, rowIndex) => {
        if (rowIndex === this.state.selectedRowIndex) {
            return 'selected-ls-grid'
        } else {
            return ''
        }
    }

    statusFormatter = (cell, row) => {
        if (row.is_completed) {
            return "DONE"
        } else {
            return "TODO"
        }
    }

    imageFormatter = (cell, row) => {
        let image = row.image
        let res = image.split("/")

        return res[res.length - 1]
    }

    setData = (data) => {
        let stateTable = this.state.table
        stateTable.data = data.records
        stateTable.page = data.page
        stateTable.perPage = data.limit
        stateTable.totalData = data.total_record

        this.setState({
            table: stateTable,
        })
    }

    handleTableChange = (type, {page, sizePerPage}) => {
        const params = "?page=" + page + "&perPage=" + sizePerPage
        let userTaskService = new UserTaskService(this.props.session)
        userTaskService.getLabelStudioMyContents(params).then(res => {
            this.props.onChangeData(res)
        })
    }

    render() {
        let lang = "en"
        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }] 
        let stateTable = this.state.table

        let page = stateTable.page
        let sizePerPage = stateTable.perPage
        let totalSize = stateTable.totalData
        let columns = stateTable.columns
        let records = stateTable.data

        return (
                <BootstrapTable
                    remote
                    keyField="id"
                    data={records}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    filter={filterFactory()}
                    pagination={paginationFactory({page, sizePerPage, totalSize})}
                    // onTableChange={this.onTableChange}
                    onTableChange={this.handleTableChange}
                    rowClasses={this.rowClasses}
                    rowEvents={this.rowEvents}

                />
        )
    }

}