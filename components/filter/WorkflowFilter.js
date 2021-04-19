import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import Select from "react-select";
import BoxPanel from "../../components/BoxPanel";
import t from "../../translator/helper";

export default class WorkflowFilter extends React.Component {
    constructor(props) {
        super(props)
        let status = [
            {
                value: "",
                label: t('filter:Choose Status', props.language)
            },
            {
                value: "true",
                label: t("filter:Deployed", props.language)
            },
            {
                value: "false",
                label: t("filter:Iddle", props.language)
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
        this.props.onSubmitFilter(this.state.tableFilter)
    }


    onNameChange = (e) => {
        let filter = this.state.tableFilter
        filter.search = e.target.value

        this.setState({
            tableFilter: filter
        })
    }



    onStatusChange = (value) => {
        let filter = this.state.tableFilter
        filter.filter.status = value.value

        this.setState({
            tableFilter: filter
        })
    }

    render() {
        return (
            <BoxPanel title={t("common:Filter Workflow", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4} style={this.state.visibilityDatePicker}>
                            <Form.Group>
                                <Form.Label>{t("common:Title", this.props.language)}  </Form.Label>
                                <Form.Control placeholder={t("common:Workflow Title", this.props.language)} onChange={this.onNameChange}/>
                            </Form.Group>


                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/> {t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>

                        <Col xs={12} sm={4} md={4} style={this.state.visibilityDatePicker}>

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

