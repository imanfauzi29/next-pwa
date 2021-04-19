import React from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import Select from "react-select";
import BoxPanel from "../BoxPanel";
import UserService from "../../services/UserService";
import SiteService from "../../services/SiteService";
import t from "../../translator/helper";

export default class SiteUserFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableFilter: this.props.tableFilter,
            sites: this.props.siteId,
            users: this.props.userId
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        let siteService = new SiteService(this.props.session)
        siteService.getSite().then(data => {
            let optionsSite = []
            data.records.forEach(r => {
                let label = `${r.site_id} - ${r.name}`
                optionsSite.push({value: r.id, label: label})
            })
            this.setState({
                sites: optionsSite
            })
        })

        let userService = new UserService(this.props.session)
        userService.getUser().then(data => {
            let optionsUser = []
            data.records.forEach(r => {
                let label = `${r.code} - ${r.fullname}`
                optionsUser.push({value: r.id, label: label})
            })
            this.setState({
                users: optionsUser
            })
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmitFilter(this.state.tableFilter, null)
    }


    onSiteChanged = (value) => {
        let filter = this.state.tableFilter
        filter.filter.site_id = value.value

        this.setState({
            tableFilter: filter
        })
    }
    onUserChanged = (value) => {
        let filter = this.state.tableFilter
        filter.filter.id_user = [value.value]
        this.setState({
            tableFilter: filter
        })
    }

    render() {
        return (
            <BoxPanel title={t("common:Filter Site User", this.props.language)} collapsed>
                <Form>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("common:Site", this.props.language)}</Form.Label>
                                <Select
                                    id="site_id"
                                    name="site_id"
                                    placeholder={t("filter:Choose Site", this.props.language)}
                                    options={this.state.sites}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onSiteChanged}
                                />
                            </Form.Group>

                            <Button size="sm" onClick={this.onSubmit}>
                                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
                            </Button>
                        </Col>

                        <Col xs={12} sm={4} md={4}>
                            <Form.Group>
                                <Form.Label>{t("filter:User", this.props.language)}</Form.Label>
                                <Select
                                    id="user_id"
                                    name="user_id"
                                    placeholder={t("filter:Choose User", this.props.language)}
                                    options={this.state.users}
                                    autosize={true}
                                    isMulti={false}
                                    isClearable={false}
                                    backspaceRemovesValue={false}
                                    onChange={this.onUserChanged}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BoxPanel>
        )
    }
}

