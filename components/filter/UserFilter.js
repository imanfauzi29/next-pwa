import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import BoxPanel from "../BoxPanel";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";
import Select from "react-select";

import UserService from "../../services/UserService";
import RoleService from "../../services/RoleService";
import t from "../../translator/helper";

export default class UserFilter extends Component {
  constructor(props) {
    super(props);
    let status = [
      {
        value: "",
        label: `- ${t("filter:Choose Status", props.language)} -`,
      },
      {
        value: true,
        label: t("filter:Active", props.language),
      },
      {
        value: false,
        label: t("filter:Not Active", props.language),
      },
    ];
    this.state = {
      tableFilter: props.tableFilter,
      statusList: status,
      filterUserCodeList: [],
      filterEmailList: [],
      roleList: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getRole();
    this.setUserCodeAndEmail();
  }

  getRole = () => {
    let api = new RoleService(this.props.session);
    api.getRoleList().then((res) => {
      if (res.records !== null) {
        let data = res.records.map(function (row) {
          return { value: row.id, label: row.name };
        });

        this.setState({
          roleList: data,
        });
      }
    });
  };

  setUserCodeAndEmail = () => {
    let userService = new UserService(this.props.session);
    userService.getUser().then((res) => {
      if (res.records !== null) {
        let userCode = [{ value: "", label: `- ${t("filter:Choose User Code", this.props.language)} -` }];
        let email = [{ value: "", label: `- ${t("filter:Choose Email", this.props.language)} -` }];

        res.records.map(function (row) {
          email.push({ value: row.email, label: row.email });
          userCode.push({ value: row.code, label: row.code });
          return;
        });

        this.setState({
          filterUserCodeList: userCode,
          filterEmailList: email,
        });
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmitFilter(this.state.tableFilter);
  }

  onNameChange = (e) => {
    let tableFilter = this.state.tableFilter;
    tableFilter.search = e.target.value;

    this.setState({
      tableFilter: tableFilter,
    });
  };

  onUserCodeChange = (value) => {
    let tableFilter = this.state.tableFilter;
    tableFilter.filter.user_code = value.value;

    this.setState({
      tableFilter: tableFilter,
    });
  };

  onEmailChange = (value) => {
    let tableFilter = this.state.tableFilter;
    tableFilter.filter.email = value.value;

    this.setState({
      tableFilter: tableFilter,
    });
  };

  onStatusChange = (value) => {
    let tableFilter = this.state.tableFilter;
    tableFilter.filter.status = value.value;

    this.setState({
      tableFilter: tableFilter,
    });
  };

  render() {
    return (
      <BoxPanel title={t("common:Filter User", this.props.language)} collapsed>
        <Form>
          <Row>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("table:Name", this.props.language)}</Form.Label>
                <Form.Control
                  size="md"
                  className="input-filter"
                  placeholder={t("table:Username", this.props.language)}
                  onChange={this.onNameChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("table:Email", this.props.language)}</Form.Label>
                <Select
                  id="email"
                  name="email"
                  placeholder={`- ${t("filter:Choose Email", this.props.language)} -`}
                  options={this.state.filterEmailList}
                  autosize={true}
                  isMulti={false}
                  isClearable={false}
                  backspaceRemovesValue={false}
                  onChange={this.onEmailChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("table:User Code", this.props.language)}</Form.Label>
                <Select
                  id="user_code"
                  name="user_code"
                  placeholder={`- ${t("filter:Choose User Code", this.props.language)} -`}
                  options={this.state.filterUserCodeList}
                  autosize={true}
                  isMulti={false}
                  isClearable={false}
                  backspaceRemovesValue={false}
                  onChange={this.onUserCodeChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("filter:Status", this.props.language)}</Form.Label>
                <Select
                  id="status_list"
                  name="status_list"
                  placeholder={`- ${t("filter:Choose Status", this.props.language)} -`}
                  options={this.state.statusList}
                  autosize={true}
                  isMulti={false}
                  isClearable={false}
                  backspaceRemovesValue={false}
                  onChange={this.onStatusChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={2} md={2}>
              <Button
                size="sm"
                onClick={this.onSubmit}
              >
                <i className="fa fa-search"/>&nbsp;&nbsp;{t("filter:Filter", this.props.language)}
              </Button>
            </Col>
          </Row>
        </Form>
      </BoxPanel>
    );
  }
}
