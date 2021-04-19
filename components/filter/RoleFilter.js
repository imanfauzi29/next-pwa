import React, {Component} from "react";
import BoxPanel from "../BoxPanel";
import {Button, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import t from '../../translator/helper'

export default class RoleFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableFilter: this.props.tableFilter,
            roleName: '',
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

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

    render() {
        return (
            <BoxPanel title={t("common:Filter Role", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("table:Name", this.props.language)}</Form.Label>
                                <Form.Control size="md" className="input-filter" placeholder={t("table:Role Name", this.props.language)} onChange={this.onNameChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={2} md={2}>
                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}