import React from 'react'
import {Button, Col, Form, Row } from 'react-bootstrap'
import SiteService from '../../services/SiteService'
import UserService from '../../services/UserService'
import BoxPanel from '../BoxPanel'
import Select from "react-select";
import t from '../../translator/helper'

export default class SiteManagerFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableFilter: this.props.tableFilter,
            lookup: {
                sites : [],
                users: []
            }
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.getDataSite()
        this.getDataManager()
    }

    getDataSite = () => {
        let site = new SiteService(this.props.session)
        site.getSite().then(data => {
            let optionsSite = []
            if(data.records != null) {
                optionsSite.push({value: "", label: t("filter:Select Site", this.props.language)})
                data.records.forEach(record => {
                    let label = `${record.site_id} - ${record.name}`
                    optionsSite.push({value: record.id, label: label})
                });
                
                this.setState(prevState => ({
                    lookup: {
                        users: prevState.lookup.users,
                        sites: optionsSite
                    }
                }))
            }
        })
    }

    getDataManager = () => {
        let user = new UserService(this.props.session)
        user.getListSiteManager().then(data => {
            let optionsUser = []
            if(data.records != null) {
                optionsUser.push({value: "", label: t("filter:Select User", this.props.language)})
                data.records.forEach(record => {
                    let label = `${record.code} - ${record.fullname}`
                    optionsUser.push({value: record.id, label: label})
                });
                this.setState(prevState => ({
                    lookup: {
                        sites: prevState.lookup.sites,
                        users: optionsUser
                    }
                }))
            }
        })
    }

    onSiteIdChange = (value) => {
        let filter = this.state.tableFilter
        filter.filter.id_user = value.value

        this.setState({
            tableFilter: filter
        })
    }

    onManagerIdChange = (value) => {
        let filter = this.state.tableFilter
        filter.filter.id_site = value.value

        this.setState({
            tableFilter: filter
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter)
    }

    render() {
        return (
            <BoxPanel title={t("common:Filter Site Manager", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("table:Fullname", this.props.language)}</Form.Label>
                                <Select
                                    id="user_id"
                                    name="user_id"
                                    placeholder={t("filter:Choose User", this.props.language)}
                                    options={this.state.lookup.users}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onSiteIdChange}
                                />
                            </Form.Group>

                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>

                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("common:Site", this.props.language)}</Form.Label>
                                <Select
                                    id="site_id"
                                    name="site_id"
                                    placeholder={t("filter:Select Site", this.props.language)}
                                    options={this.state.lookup.sites}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onManagerIdChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}