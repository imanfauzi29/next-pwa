import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import Select from "react-select";
import BoxPanel from "../BoxPanel";
import "react-datepicker/dist/react-datepicker.css"
import t from "../../translator/helper";
import ProjectService from "../../services/ProjectService";

export default class ProjectAttributeFilter extends React.Component {
    constructor(props) {
        super(props)
        let process = [
            {
                value: "",
                label: `- ${t("filter:Choose Should Process", props.language)} -`
            },
            {
                value: true,
                label: t("filter:Yes", props.language)
            },
            {
                value: false,
                label: t("filter:No", props.language)
            }
        ]
        this.state = {
            tableFilter: this.props.tableFilter,
            should_process: process,
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        let projectService = new ProjectService(this.props.session)
        projectService.getProject().then(data => {
            let {records} = data 
            let valueSelect = records.map(item => {
                return {value: item.id, label: `${item.project_code} - ${item.name}`}
            })
            this.setState(prevState => ({...prevState, project: valueSelect}))
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter)
    }

    onNameChange = (e) => (this.setState(prevState => (prevState, prevState.tableFilter.filter.attribute_field_name = e.target.value)))

    onShouldProcess = (value) => (this.setState(prevState => (prevState, prevState.tableFilter.filter.should_process = value.value)))

    onProjectSelected = (value) => (this.setState(prevState =>(prevState, prevState.tableFilter.filter.project_id = value.value)))

    render() {
        return (
            <BoxPanel title={t("common:Project Atribute Filter", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={3} md={3}>
                            <Form.Group>
                                <Form.Label>{t("common:Should Process", this.props.language)} </Form.Label>
                                <Select

                                    id="should_process"
                                    name="should_process"
                                    placeholder={`- ${t("filter:Select Project", this.props.language)} -`}
                                    options={this.state.should_process}
                                    autosize={true}
                                    isMulti={false}

                                    backspaceRemovesValue={false}
                                    onChange={this.onShouldProcess}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={3} md={3}>
                            <Form.Group>
                                <Form.Label>{t("common:Attributes Field Name", this.props.language)} </Form.Label>
                                <Form.Control className="filter-form" placeholder={t("common:Attributes Field Name", this.props.language)}
                                              onChange={this.onNameChange}/>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={3} md={3}>
                            <Form.Group>
                                <Form.Label>{t("common:Project", this.props.language)}</Form.Label>
                                <Select

                                    id="projects"
                                    name="projects"
                                    placeholder={`- ${t("common:Choose Project", this.props.language)} -`}
                                    options={this.state.project}
                                    autosize={true}
                                    isMulti={false}

                                    backspaceRemovesValue={false}
                                    onChange={this.onProjectSelected}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} sm={3} md={3}></Col>
                        <Col xs={12} sm={2} md={2}>
                            <Button size={"sm"} onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("button:Filter", this.props.language)}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}

