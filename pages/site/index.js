import PageContainer from "../../components/PageContainer";
import SiteFilter from "../../components/filter/SiteFilter";
import BoxPanel from "../../components/BoxPanel";
import { Button } from "react-bootstrap";
import StaticModal from "../../components/StaticModal";
import SiteService from "../../services/SiteService";
import { Component } from "react";
import Utils from "../../utils/Utils";
import PageLayout from "../../components/PageLayout";
import PageTitle from "../../gentelella/PageTitle";
import SiteForm from "../../components/form/SiteForm";
import SessionHelper from "../../utils/SessionHelper";
import RowNumberFormatter from "../../components/table/formatter/RowNumberFormatter";
import SiteTableFormatter from "../../components/table/formatter/SiteTableFormatter";
import TimestampTableFormatter from "../../components/table/formatter/TimestampTableFormatter";
import dynamic from "next/dynamic";
import {
  FORM_MODE_CREATE,
  FORM_MODE_EDIT,
} from "../../components/form/BaseForm";
import Alerts from "../../utils/Alerts";
import t from "../../translator/helper";
import translateColumn from "../../translator/columns";
import PreferencesHelper from "../../utils/PreferencesHelper";

const RemoteTable = dynamic(
  () => import("../../components/table/RemoteTable"),
  { ssr: false }
);

class Site extends Component {
  static async getInitialProps(ctx) {
    return { session: await SessionHelper.CheckSession(ctx) };
  }

  constructor(props) {
    super(props)
    this.siteService = new SiteService(props.session);
    const queryPayload = {
      search: "",
      filter: {
        status: "",
      },
    };

    this.needTranslationCols = [
      {
        dataField: "#",
        text: "",
        formatter: RowNumberFormatter.rowNumberFormatter,
      },
      { dataField: "site_id", text: "table:Site ID" },
      { dataField: "name", text: "table:Site Name" },
      {
        dataField: "site_manager",
        text: "table:Site Manager",
        formatter: SiteTableFormatter.managerFormater,
      },
      {
        dataField: "status",
        text: "table:Status",
        formatter: SiteTableFormatter.statusFormatter,
      },
      {
        dataField: "action",
        text: "table:Action",
        formatter: this.actionFormatter,
      },
    ],

    this.state = {
      language: props.session.preferedLanguage,
      form: {
        data: {
          id: "",
          site_name: "",
          status: true,
          site_id: "Auto generated with prefix SIT",
        },
        mode: FORM_MODE_CREATE,
      },
      table: {
        url: this.siteService.getTableUrl(),
        filter: queryPayload,
        columns: translateColumn(props.session.preferedLanguage,this.needTranslationCols)
      },
      showModal: false,
    };
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
          size="sm"
          onClick={(e) =>
            this.setState({
              form: {
                data: {
                  id: row.id,
                  site_name: row.name,
                  status: row.status,
                  site_id: row.site_id,
                },
                mode: FORM_MODE_EDIT,
              },
              showModal: true,
            })
          }
        >
          <i className="fa fa-pencil"/>&nbsp;&nbsp;{t("button:Edit", this.state.language)}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => this.deleteSite(row)}
        >
          <i className="fa fa-trash"/>&nbsp;&nbsp;{t("button:Delete", this.state.language)}
        </Button>
      </div>
    );
  };

  deleteSite = (row) => {
    let language = this.state.language
    let rows = Alerts.messageConfirmationDelete(language, `${row.site_id} - ${row.name}`)
    Alerts.withUserConfirmation(rows, () => {
      this.siteService
        .deleteSite(row.id)
        .then((res) => {
          if (res.code === 0) {
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
    }, language);
  };

  onFormSubmit = (data) => {
    if (this.state.form.mode === FORM_MODE_CREATE) {
      let body = {
        name: data.site_name,
        status: data.status,
      };
      this.siteService
        .addSite(body)
        .then((res) => {
          if (res.code === 0) {
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
        name: data.site_name,
        status: data.status,
      };
      this.siteService
        .updateSite(body, data.id)
        .then((res) => {
          if (res.code === 0) {
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

  onSubmitFilter = (tableFilter) => {
    let dataFilter = Utils.encodePayload(tableFilter);
    let filterUrl = this.siteService.getTableUrl(`?payload=${dataFilter}`);

    let tableState = this.state.table;
    tableState.url = filterUrl;
    tableState.filter = tableFilter;
    this.setState({
      tableState,
    });
  };

  render() {
    return (
      <PageLayout session={this.props.session}>
        <PageContainer>
          <PageTitle>{t("common:Site", this.state.language)}</PageTitle>
          <SiteFilter
            tableFilter={this.state.table.filter}
            onSubmitFilter={this.onSubmitFilter}
            language={this.state.language}
          />
          <BoxPanel title={t("common:Site List", this.state.language)}>
            <Button
              size="sm"
              type="button"
              variant="primary"
              onClick={(e) => {
                let form = this.state.form
                form.data = {}
                form.mode = FORM_MODE_CREATE
                this.setState({form})
                this.modalVisibilityHandler(true)
              }}
            >
              <i className="fa fa-plus-circle"/>&nbsp;&nbsp;{t("button:Add Site", this.state.language)}
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
              ? t("modal:Add Site", this.state.language)
              : t("modal:Edit Site", this.state.language)
          }
          show={this.state.showModal}
          onHide={() => {
            this.modalVisibilityHandler(!this.state.showModal);
          }}
        >
          <SiteForm
            siteData={this.state.form.data}
            formSubmitCallback={this.onFormSubmit}
            session={this.props.session}
            language={this.state.language}
          />
        </StaticModal>
      </PageLayout>
    );
  }
}

export default Site;
