import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { Comparator } from "react-bootstrap-table2-filter";
import Api from "../../services/Api";
import { trackPromise } from "react-promise-tracker";
import t from "../../translator/helper";

const defaultSorted = [
    {
        dataField: "id",
        order: "desc",
    },
];

// define the table here with the argument property
const RemoteBootstrapTable = ({
    columns,
    data,
    page,
    sizePerPage,
    onTableChange,
    totalSize,
    selectRow,
    onSelectRow,
    language,
    rowEvents
}) => {
    let table = undefined;
    if (selectRow) {
        let select_row = {
            mode: "checkbox",
            clickToSelect: true,
            hideSelectAll: true,
            onSelect: (row, isSelect) => {
                onSelectRow(row.id, isSelect);
            },
        };

        return (
            <div>
                <BootstrapTable
                    ref={(n) => (window.table = n)}
                    remote
                    keyField="id"
                    data={data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    filter={filterFactory()}
                    pagination={paginationFactory({
                        page,
                        sizePerPage,
                        totalSize,
                    })}
                    onTableChange={onTableChange}
                    striped
                    condensed
                    selectRow={select_row}
                    noDataIndication={t("table:No records on database", language)}
                    wrapperClasses="table-responsive"
                    classes="text-nowrap"
                    rowEvents={rowEvents}
                />
            </div>
        );
    } else {
        return (
            <div>
                <BootstrapTable
                    remote
                    ref={(n) => (window.table = n)}
                    keyField="id"
                    data={data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    filter={filterFactory()}
                    pagination={paginationFactory({
                        page,
                        sizePerPage,
                        totalSize,
                    })}
                    onTableChange={onTableChange}
                    striped
                    condensed
                    noDataIndication={t("table:No records on database", language)}
                    wrapperClasses="table-responsive"
                    classes="text-nowrap"
                    rowEvents={rowEvents}
                />
            </div>
        );
    }
};

export default class RemoteTable extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.api = new Api();
        this.state = {
            page: 1,
            data: [],
            totalSize: 0,
            sizePerPage: 10,
            token: this.props.token,
        };

        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        // execute after component update
        if (prevProps.url !== this.props.url) {
            let url = this.props.url;
            let token = this.props.token;
            if (this.props.usefilter) {
                url = this.props.url;
            }
            trackPromise(
                this.api.getRemoteTableDataAdmin(url, token).then((data) => {
                    let result = data.records;
                    if (result == null) {
                        result = [];
                    }
                    this.setState(() => ({
                        page: data.page,
                        data: result,
                        totalSize: data.total_record,
                        sizePerPage: data.per_page,
                    }));
                })
            );
        }
    }

    componentDidMount() {
        let url =
            this.props.url +
            "?page=" +
            this.state.page +
            "&perPage=" +
            this.state.sizePerPage;
        let token = this.props.token;
        if (this.props.usefilter) {
            url = this.props.url + "&page=1" + "&perPage=10";
        }
        trackPromise(
            this.api.getRemoteTableDataAdmin(url, token).then((data) => {
                let result = data.records;
                if (result == null) {
                    result = [];
                }
                if (this.props.current_data) {
                    this.props.current_data(data.current_data);
                }
                this.setState(() => ({
                    page: data.page,
                    data: result,
                    totalSize: data.total_record,
                    sizePerPage: data.per_page,
                    token: token,
                }));
            })
        );
    }

    handleTableChange = (
        type,
        { page, sizePerPage, filters, sortField, sortOrder }
    ) => {
        let url = this.props.url + "?page=" + page + "&perPage=" + sizePerPage;
        if (this.props.usefilter) {
            url = this.props.url + "&page=" + page + "&perPage=" + sizePerPage;
        }
        let token = this.props.token;

        trackPromise(
            this.api.getRemoteTableDataAdmin(url, token).then((data) => {
                let result = data.records;
                if (result == null) {
                    result = [];
                }
                // Handle column filters
                result = result.filter((row) => {
                    let valid = true;
                    for (const dataField in filters) {
                        const { filterVal, filterType, comparator } = filters[
                            dataField
                        ];

                        if (filterType === "TEXT") {
                            if (comparator === Comparator.LIKE) {
                                valid =
                                    row[dataField]
                                        .toString()
                                        .indexOf(filterVal) > -1;
                            } else {
                                valid = row[dataField] === filterVal;
                            }
                        }
                        if (!valid) break;
                    }
                    return valid;
                });
                // Handle column sort
                if (sortOrder === "asc") {
                    result = result.sort((a, b) => {
                        if (a[sortField] > b[sortField]) {
                            return 1;
                        } else if (b[sortField] > a[sortField]) {
                            return -1;
                        }
                        return 0;
                    });
                } else {
                    result = result.sort((a, b) => {
                        if (a[sortField] > b[sortField]) {
                            return -1;
                        } else if (b[sortField] > a[sortField]) {
                            return 1;
                        }
                        return 0;
                    });
                }
                this.setState(() => ({
                    page: data.page,
                    data: result,
                    totalSize: data.total_record,
                    sizePerPage: data.per_page,
                }));
            })
        );
    };

    render() {
        const { data, sizePerPage, page } = this.state;

        return (
            <RemoteBootstrapTable
                data={data}
                columns={this.props.columns}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.totalSize}
                onTableChange={this.handleTableChange}
                selectRow={this.props.selectRow}
                onSelectRow={this.props.onSelectedRow}
                language={this.props.language}
                rowEvents={this.props.rowEvents}
            />
        );
    }
}
