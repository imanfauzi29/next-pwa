import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import BaseValidation from "./BaseValidation";
import {
  FormInputDropdown,
  FormInputDropdownMultiple,
  FormSubmitButton,
  FORM_MODE_CREATE,
} from "./BaseForm";
import SiteService from "../../services/SiteService";
import React, { useEffect, useState } from "react";
import t from "../../translator/helper";

export default function AssignSiteForm(props) {
  const [site, setSite,] = useState([]);
  const [statusList, setStatus] = useState([
    {
      value: "",
      label: `${t("filter:Choose Status", props.language)}`,
    },
    {
      value: true,
      label: t("filter:Active", props.language),
    },
    {
      value: false,
      label: t("filter:Non Active", props.language),
    },
  ])

  useEffect(() => {
    let site = new SiteService(props.session)
    site.getSite().then((data) => {
      let optionSite = []
      if (data.records != null) {
        optionSite.push({ value: "", label: `- ${t("filter:Choose Site", props.language)} -` })
        if (data.records != null) {
          data.records.forEach((record) => {
            let label = `${record.site_id} - ${record.name}`
            optionSite.push({ value: record.id, label: label })
          })
        }
        setSite(optionSite)
      }
    })
  }, [])

  const validationSchema = () => {
    let validationForm = {}
    if (props.mode === FORM_MODE_CREATE) {
      validationForm = {
        site_id: BaseValidation.requiredArray("Site"),
      }
    } else {
      validationForm = {
        status: BaseValidation.requiredBoolean("Status"),
      }
    }

    return validationForm
  }

  const formik = useFormik({
    initialValues: props.assignSiteData,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      props.formSubmitCallback(values)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      {props.mode === FORM_MODE_CREATE ? (
        <FormInputDropdownMultiple
          formik={formik}
          field={"site_id"}
          label={t("table:Site", props.language)}
          options={site}
          language={props.language}
        />
      ) : (
        <FormInputDropdown
          formik={formik}
          field="status"
          optionsValues={statusList}
          label={t("table:Status", props.language)}
          language={props.language}
        />
      )}

      <FormSubmitButton language={props.language} />
    </Form>
  )
}
