import React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Select from "react-select"
import BoxPanel from "../BoxPanel"
import t from "../../translator/helper"
import TaskTypeService from "../../services/TaskTypeService";

export default class SmallBatchFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableFilter: this.props.tableFilter
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
    }

    componentDidMount() {
        let taskType = new TaskTypeService(this.props.session)
        taskType.getTaskType().then(data => {
            let result = data.records.map(item => {
                return {value: item.id, label: `${item.task_type_id} - ${item.task_name}`}
            })

            this.setState(prevState => ({...prevState, status:result }))
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter)
    }

    onNameChange = (e) => {
        let tableFilter = this.state.tableFilter
        tableFilter.batch_name = e.target.value

        this.setState({
            tableFilter: tableFilter
        })
        console.log(this.state)
        // this.setState(prevState => (prevState, prevState.tableFilter.search = e.target.value))
    }

    render() {
        return (
            <BoxPanel
                title={t("common:Filter Small Batches", this.props.language)}
                collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>
                                    {t(
                                        "common:Small Batch",
                                        this.props.language
                                    )}
                                </Form.Label>
                                <Form.Control
                                    className="filter-form"
                                    size="sm"
                                    placeholder={t(
                                        "common:Small Batch",
                                        this.props.language
                                    )}
                                    onChange={this.onNameChange}
                                />
                            </Form.Group>

                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search" />
                                &nbsp;&nbsp;
                                {t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>
                                    {t("table:Status", this.props.language)}
                                </Form.Label>
                                <Select
                                    id="status"
                                    name="status"
                                    placeholder={`- ${t("filter:Select Status", this.props.language)} -`}
                                    options={this.state.status}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange=""
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}
