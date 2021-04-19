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
import UserService from "../../services/UserService";
import React, { useEffect, useState } from "react";
import t from "../../translator/helper";

export default function AssignFmForm(props) {
  const [fileManager, setFileManager,] = useState([]);
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
    let user = new UserService(props.session)
    user.getListFileManager().then((data) => {
      let optionsUser = []
      if (data.records != null) {
        optionsUser.push({ value: "", label: `- ${t("filter:Choose File Manager", props.language)} -` })
        data.records.forEach((record) => {
          if (record.role != null) {
            let role = record.role.find((role) => role.name === "File Manager" || role.name === "FM")
            if (typeof role !== "undefined") {
              let label = `${record.code} - ${record.fullname}`
              optionsUser.push({ value: record.id, label: label })
            }
          }
        })
        setFileManager(optionsUser)
      }
    })
  }, [])

  const validationSchema = () => {
    let validationForm = {}
    if (props.mode === FORM_MODE_CREATE) {
      validationForm = {
        id_user: BaseValidation.requiredArray("File Manager"),
      }
    } else {
      validationForm = {
        status: BaseValidation.requiredBoolean("Status"),
      }
    }

    return validationForm
  }

  const formik = useFormik({
    initialValues: props.assignFmData,
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
          field={"fm_id"}
          label={t("table:File Manager", props.language)}
          options={fileManager}
          language={props.language}
        />
      ) : (
        <FormInputDropdown
          formik={formik}
          field="status"
          optionsValues={statusList}
          label={t("filter:Status", props.language)}
          language={props.language}
        />
      )}

      <FormSubmitButton language={props.language} />
    </Form>
  )
}
