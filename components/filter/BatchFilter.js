import React from "react";
import BoxPanel from "../BoxPanel";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Utils from "../../utils/Utils";
import moment from "moment";


import ProjectService from "../../services/ProjectService";
import SiteService from "../../services/SiteService";
import t from "../../translator/helper";
import DateForm from "../DateForm";

export default class BatchFilter extends React.Component {
  constructor(props) {
    super(props);
    let status = [
      {
        value: "",
        label: `- ${t("filter:Choose Status", props.language)} -`,
      },
      {
        value: "uploading",
        label: t("filter:Uploading", props.language),
      },
      {
        value: "uploaded",
        label: t("filter:Uploaded", props.language),
      },
      {
        value: "checking",
        label: t("filter:Checking", props.language),
      },
      {
        value: "checked",
        label: t("filter:Checked", props.language),
      },
    ];

    this.state = {
      lookup: {
        statusValidation: status,
        siteList: [],
        projectList: [],
      },
      start_date: "",
      end_date: "",
      tableFilter: this.props.tableFilter,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getProject();
    this.getSite();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmitFilter(this.state.tableFilter);
  }

  getProject = () => {
    let api = new ProjectService(this.props.session);
    api.getProject().then((res) => {
      let data = [{ value: "", label: `- ${t("filter:Choose Project", this.props.language)} -` }];
      if (res.records != null) {
        res.records.map(function (row) {
          data.push({
            value: row.id,
            label: row.project_code + " " + row.name,
          });
          return;
        });
      }
      this.setState((prevState) => ({
        lookup: {
          statusValidation: prevState.lookup.statusValidation,
          siteList: prevState.lookup.siteList,
          projectList: data,
        },
      }));
    });
  };

  getSite = () => {
    let api = new SiteService(this.props.session);
    api.getSite().then((res) => {
      let data = [{ value: "", label: `- ${t("filter:Choose Site", this.props.language)} -` }];
      if (res.records != null) {
        res.records.map(function (row) {
          data.push({ value: row.id, label: row.name });
          return;
        });
      }
      this.setState((prevState) => ({
        lookup: {
          statusValidation: prevState.lookup.statusValidation,
          projectList: prevState.lookup.projectList,
          siteList: data,
        },
      }));
    });
  };

  handleStartDateChange = (date) => {
    let filter = this.state.tableFilter;
    filter.startDate = Utils.formatDateTime(date)

    this.setState({
      tableFilter: filter,
      startDate: moment(date).toDate(),
    })
  }

  handleEndDateChange = (date) => {
    let filter = this.state.tableFilter;
    filter.endDate = Utils.formatDateTime(date);

    this.setState({
      tableFilter: filter,
      endDate: moment(date).toDate(),
    });
  }

  render() {
    return (
      <BoxPanel title={t("common:Filter Project Batches", this.props.language)} collapsed>
        <Form>
          <Row>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("common:Project Name", this.props.language)} </Form.Label>
                <Select
                  id="project_lis"
                  name="project_list"
                  placeholder={`- ${t("filter:Choose Project", this.props.language)} -`}
                  options={this.state.lookup.projectList}
                  autosize={true}
                  isMulti={false}
                  backspaceRemovesValue={false}
                  onChange={(selectedOption) => {
                    let filter = this.state.tableFilter;
                    filter.project = selectedOption.value;
                    this.setState({
                      tableFilter: filter,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <Form.Group>
                <Form.Label>{t("common:Site Name", this.props.language)} </Form.Label>
                <Select
                  id="site_list"
                  name="site_list"
                  placeholder={`- ${t("filter:Choose Site", this.props.language)} -`}
                  options={this.state.lookup.siteList}
                  autosize={true}
                  isMulti={false}
                  backspaceRemovesValue={false}
                  onChange={(selectedOption) => {
                    let filter = this.state.tableFilter;
                    filter.site = selectedOption.value;
                    this.setState({
                      tableFilter: filter,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4} md={4}></Col>
            <Col xs={12} sm={2} md={2}>
              <Form.Group>
                <Form.Label>{t("common:Date", this.props.language)} </Form.Label>
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
                <Form.Label>{t("filter:Status", this.props.language)}</Form.Label>
                <Select
                  id="status_list"
                  name="status_list"
                  placeholder={`- ${t("filter:Choose Status", this.props.language)} -`}
                  options={this.state.lookup.statusValidation}
                  autosize={true}
                  isMulti={false}
                  backspaceRemovesValue={false}
                  onChange={(selectedOption) => {
                    let filter = this.state.tableFilter;
                    filter.status = selectedOption.value;
                    this.setState({
                      tableFilter: filter,
                      statusValidation: selectedOption.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4} md={4}></Col>
            <Col xs={12} sm={2} md={2}>
              <Button
                size={"sm"}
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
