import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ButtonGoBack from "../../components/ButtonGoBack";
import BoxPanel from "../../components/BoxPanel";
import PageContainer from "../../components/PageContainer";
import StaticModal from "../../components/StaticModal";
import SiteManagerService from "../../services/SiteManagerService";
import { withRouter } from "next/router";
import PageLayout from "../../components/PageLayout";
import PageTitle from "../../gentelella/PageTitle";
import SessionHelper from "../../utils/SessionHelper";
import AssignManagerTbaleFormatter from "../../components/table/formatter/AssignManagerTbaleFormatter";
import RowNumberFormatter from "../../components/table/formatter/RowNumberFormatter";
import dynamic from "next/dynamic";
import TimestampTableFormatter from "../../components/table/formatter/TimestampTableFormatter";
import Utils from "../../utils/Utils";
import t from "../../translator/helper";
import AssignManagerForm from "../../components/form/AssignManagerForm";
import {
  FORM_MODE_CREATE,
  FORM_MODE_EDIT,
} from "../../components/form/BaseForm";
import Alerts from "../../utils/Alerts";
import translateColumn from "../../translator/columns";
import PreferencesHelper from "../../utils/PreferencesHelper";

const RemoteTable = dynamic(
  () => import("../../components/table/RemoteTable"),
  { ssr: false }
);

class AssignManager extends Component {
  static async getInitialProps(ctx) {
    let { siteId } = ctx.query
    return { session: await SessionHelper.CheckSession(ctx), siteId: siteId };
  }

  constructor(props) {
    super(props);
    this.siteId = props.siteId;
    this.siteManagerService = new SiteManagerService(props.session)

    this.needTranslationCols = [
      {
        dataField: "#",
        text: "",
        formatter: RowNumberFormatter.rowNumberFormatter,
      },
      { dataField: "code", text: "table:User Code" },
      { dataField: "fullname", text: "table:Fullname" },
      { dataField: "username", text: "table:Username" },
      { dataField: "email", text: "table:Email" },
      {
        dataField: "status",
        text: "table:Status",
        formatter: AssignManagerTbaleFormatter.statusFormatter,
      },
      {
        dataField: "action",
        text: "table:Action",
        formatter: this.actionFormatter,
      },
    ]

    this.state = {
      language: props.session.preferedLanguage,
      form: {
        data: {
          id_user: [],
          status: "",
        },
        mode: FORM_MODE_CREATE,
      },
      table: {
        url: this.siteManagerService.getTableUrl(`/${this.siteId}`),
        filter: "",
        columns: translateColumn(props.session.preferedLanguage,this.needTranslationCols)
      },
      showModal: false,
      idSite: this.siteId,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    let lang = PreferencesHelper.getLanguagePreferencesFromCookie(this.state.language)
    let state = this.state
    state.language = lang
    state.table.columns = translateColumn(lang, this.needTranslationCols)
    this.setState(state)
}

  modalVisibilityHandler = (isShown) => {
    this.setState({
      showModal: isShown,
    });
  };

  actionFormatter = (cell, row) => {
    return (
      <div>
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            let stateForm = this.state.form;
            stateForm.data = row;
            stateForm.mode = FORM_MODE_EDIT;
            this.setState({
              stateForm,
              showModal: true,
            });
          }}
        >
          <i className="fa fa-pencil"/>&nbsp;&nbsp;{t("button:Edit", this.state.language)}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => this.removeManager(row)}
        >
          <i className="fa fa-trash"/>&nbsp;&nbsp;{t("button:Delete", this.state.language)}
        </Button>
      </div>
    );
  };

  removeManager = (row) => {
    let language = this.state.language
    let rows = Alerts.messageConfirmationDelete(language)
    Alerts.withUserConfirmation(rows, () => {
      this.siteManagerService
        .removeSiteManager(row.id)
        .then((res) => {
          if (res.is_success) {
            Alerts.reloadPageWithMessage(res.message)
          } else {
            Alerts.showError(res.message)
          }
        })
        .catch((e) => {
          if (e.response) {
            Alerts.showError(e.response.data.message)
          }
        });
    }, language)
  };

  onFormSubmit = (data) => {
    if (this.state.form.mode === FORM_MODE_CREATE) {
      data.id_site = parseInt(this.state.idSite);
      this.siteManagerService
        .addSiteManager(data)
        .then((res) => {
          if (res.is_success) {
            Alerts.reloadPageWithMessage(res.message);
          } else {
            Alerts.showError(res.message);
          }
        })
        .catch((e) => {
          if (e.response) {
            Alerts.showError(e.response.data.message);
          }
        });
    } else if (this.state.form.mode === FORM_MODE_EDIT) {
      let body = {
        status: data.status,
      };
      this.siteManagerService
        .updateSiteManager(body, data.id)
        .then((res) => {
          if (res.is_success) {
            Alerts.reloadPageWithMessage(res.message);
          } else {
            Alerts.showError(res.message);
          }
        })
        .catch((e) => {
          if (e.response) {
            Alerts.showError(e.response.data.message);
          }
        });
    }
  };

  render() {
    return (
      <PageLayout session={this.props.session}>
        <PageContainer>
          <PageTitle>
            <ButtonGoBack language={this.state.language} /> {t("common:Assign Manager", this.state.language)}
          </PageTitle>
          <BoxPanel title={`${t("common:Assign Manager List", this.state.language)}: ${this.state.name}`}>
            <Button
              size="sm"
              type="button"
              variant="primary"
              onClick={() => {
                let stateForm = this.state.form;
                stateForm.mode = FORM_MODE_CREATE;
                this.setState((prevState) => ({
                  form: {
                    data: prevState.form.data,
                    mode: FORM_MODE_CREATE,
                  },
                  showModal: true,
                }));
              }}
            >
              <i className="fa fa-plus-circle"/>&nbsp;&nbsp;{t("button:Add Assign Manager", this.state.language)}
            </Button>

            <RemoteTable
              url={this.state.table.url}
              columns={this.state.table.columns}
              language={this.state.language}
            />
          </BoxPanel>
        </PageContainer>

        <StaticModal
          title={
            this.state.form.mode === FORM_MODE_CREATE
              ? t("modal:Assign Manager - Add", this.state.language)
              : t("modal:Assign Manager - Edit", this.state.language)
          }
          show={this.state.showModal}
          onHide={() => {
            this.modalVisibilityHandler(!this.state.showModal);
          }}
        >
          <AssignManagerForm
            session={this.props.session}
            assignManagerData={this.state.form.data}
            formSubmitCallback={this.onFormSubmit}
            mode={this.state.form.mode}
            language={this.state.language}
          />
        </StaticModal>
      </PageLayout>
    );
  }
}

export default withRouter(AssignManager);
