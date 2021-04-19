import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import Select from "react-select";
import BoxPanel from "../BoxPanel";
import t from "../../translator/helper";

export default class SiteFilter extends React.Component {
    constructor(props) {
        super(props)
        let status = [
            {
                value: "",
                label: t('filter:Select Status', props.language)
            },
            {
                value: "true",
                label: t("filter:Active", props.language)
            },
            {
                value: "false",
                label: t("filter:Not Active", props.language)
            }
        ]
        this.state = {
            tableFilter: this.props.tableFilter,
            status_list: status,
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter, this.state.tableSearch)
    }


    onNameChange = (e) => {
        let search = this.state.tableFilter
        search.search = e.target.value

        this.setState({
            tableFilter: search
        })
    }

    onStatusChange = (value) => {
        let tableFilter = this.state.tableFilter
        tableFilter.filter.status = value.value

        this.setState({
            tableFilter: tableFilter
        })
    }

    render() {
        return (
            <BoxPanel title={t("common:Filter Site", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("common:Site Name", this.props.language)}</Form.Label>
                                <Form.Control className="filter-form" size="sm" placeholder={t("common:Site Name", this.props.language)} onChange={this.onNameChange}/>
                            </Form.Group>

                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>

                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("filter:Status", this.props.language)} </Form.Label>
                                <Select
                                    id="status_list"
                                    name="status_list"
                                    placeholder={t("filter:Choose Status", this.props.language)}
                                    options={this.state.status_list}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onStatusChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}

