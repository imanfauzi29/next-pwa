import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import Select from "react-select";
import BoxPanel from "../BoxPanel";
import WorkflowService from "../../services/WorkflowService";
import t from "../../translator/helper";

export default class TaskTypeFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableFilter: this.props.tableFilter,
            lookup: {
                workflows: []
            }
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
    }

    componentDidMount() {
        let workflow = new WorkflowService(this.props.session)
        workflow.getWorkflows().then(data => {
            let optionsWorkflow = []
            data.records.forEach(r => {
                let label = `${r.title} #${r.id}`
                optionsWorkflow.push({value: r.id, label: label})
            })
            this.setState({
                lookup: {
                    workflows: optionsWorkflow
                }
            })
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

    onTaskTypeIdChange = (value) => {
        let filter = this.state.tableFilter
        filter.filter.zeebe_process_id = value.value

        this.setState({
            tableFilter: filter
        })
    }

    render() {
        return (
            <BoxPanel title={t("common:Filter Task Type", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("common:Task Name", this.props.language)}</Form.Label>
                                <Form.Control className="filter-form" size="sm" placeholder={t("common:Task Name", this.props.language)}
                                              onChange={this.onNameChange}/>
                            </Form.Group>

                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>

                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("common:Workflow", this.props.language)}</Form.Label>
                                <Select
                                    id="zeebe_process_id"
                                    name="zeebe_process_id"
                                    placeholder={`- ${t("filter:Select Workflow", this.props.language)} -`}
                                    options={this.state.lookup.workflows}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onTaskTypeIdChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}

