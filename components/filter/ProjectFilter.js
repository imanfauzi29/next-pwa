import React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import BoxPanel from "../BoxPanel"
import moment from "moment"
import UserService from "../../services/UserService"
import "react-datepicker/dist/react-datepicker.css"
import Utils from "../../utils/Utils"
import dynamic from "next/dynamic"
import t from "../../translator/helper"
const Select = dynamic(() => import("react-select"), { ssr: false })
import DateForm from '../DateForm'
export default class ProjectFilter extends React.Component {
    constructor(props) {
        super(props)
        let status = [
            {
                value: "",
                label: `- ${t("filter:Choose Status", props.language)} -`
            },
            {
                value: true,
                label: t("filter:Active", props.language)
            },
            {
                value: false,
                label: t("filter:Not Active", props.language)
            }
        ]
        this.state = {
            tableFilter: this.props.tableFilter,
            lookup: {
                status: status,
                pm: []
            },
            status_list: status,
            start_date: null,
            end_date: null
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount = () => {
        let userPm = new UserService()
        userPm.getPmList().then((res) => {
            let res_data = res.records
            let userPM = [{ value: "", label: `- ${t("filter:Choose Project Manager", this.lang)} -` }]

            if (res_data !== null) {
                res_data.forEach((user) => {
                    if (user.role !== null) {
                        let role = user.role.find(
                            (role) => role.name === "Project Manager"
                        )
                        if (typeof role !== "undefined") {
                            let dataPm = {
                                value: user.id,
                                label: `${user.code} - ${user.fullname}`
                            }
                            userPM.push(dataPm)
                        }
                    }
                })
            }
            this.setState((prevState) => ({
                lookup: {
                    status: prevState.lookup.status,
                    pm: userPM
                }
            }))
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter)
    }

    onNameChange = (e) => {
        let tableFilter = this.state.tableFilter
        tableFilter.search = e.target.value

        this.setState({
            tableFilter: tableFilter
        })
    }

    onStatusChange = (value) => {
        let tableFilter = this.state.tableFilter
        tableFilter.filter.status = value.value

        this.setState({
            tableFilter: tableFilter
        })
    }

    handleStartDateChange = (date) => {
        let tableFilter = this.state.tableFilter
        tableFilter.filter.start_date = Utils.formatDateTime(date)
        
        this.setState({
            tableFilter: tableFilter,
            start_date: date
        })
    }

    handleEndDateChange = (date) => {
        let tableFilter = this.state.tableFilter
        tableFilter.filter.end_date = Utils.formatDateTime(date)

        this.setState({
            tableFilter: tableFilter,
            end_date: moment(date).toDate()
        })
    }

    handlePmChange = (value) => {
        let tableFilter = this.state.tableFilter
        tableFilter.filter.pm_id = value.value

        this.setState({
            tableFilter: tableFilter
        })
    }

    render() {
        return (
            <BoxPanel title={t("common:Project Filter", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>
                                    {t("common:Name", this.props.language)}
                                </Form.Label>
                                <Form.Control
                                    className="filter-form"
                                    placeholder={t(
                                        "common:Project Name",
                                        this.props.language
                                    )}
                                    onChange={this.onNameChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>
                                    {t("filter:Status", this.props.language)}
                                </Form.Label>
                                <Select
                                    id="status_list"
                                    name="status_list"
                                    placeholder={`- ${t("filter:Choose Status", this.props.language)} -`}
                                    options={this.state.lookup.status}
                                    autosize={true}
                                    isMulti={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onStatusChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4} md={4}></Col>

                        <Col xs={12} sm={2} md={2}>
                            <Form.Group>
                                <Form.Label>
                                    {t("common:Date", this.props.language)}
                                </Form.Label>
                                <DateForm handleChangeDate={this.handleStartDateChange} selected={this.state.start_date} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={2} md={2}>
                            <Form.Group>
                                <Form.Label> &nbsp; </Form.Label>
                                <br />
                                <DateForm handleChangeDate={this.handleEndDateChange} selected={this.state.end_date} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("table:Project Manager", this.props.language)} </Form.Label>
                                <Select id="pm_id"
                                    name="pm_id"
                                    placeholder={`- ${t("filter:Choose Project Manager", this.props.language)} -`}
                                    options={this.state.lookup.pm}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.handlePmChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4} md={4}></Col>
                        <Col xs={12} sm={2} md={2}>
                            <Button
                                size={"sm"}
                                onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;
                                {t("button:Filter", this.props.language)}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}
