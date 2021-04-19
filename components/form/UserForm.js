import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import {
  FormInputDropdown,
  FormInputText,
  FormSubmitButton,
  FormInputDropdownMultiple,
  FormInputPassword,
  FORM_MODE_CREATE,
} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import RoleService from "../../services/RoleService";
import t from "../../translator/helper";

export default function UserForm(props) {
  const [roleList, setroleList] = useState([]);
  const [statusList, setstatusList] = useState([
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
      label: t("filter:Non Active", props.language),
    },
  ]);

  useEffect(() => {
    let roleService = new RoleService(props.session);
    roleService.getRoleList().then((res) => {
      let res_data = res.records;
      let data = [];
      if (res_data != null) {
        res_data.map(function (row) {
          data.push({ value: row.id, label: `${row.code} - ${row.name}` });
          return;
        });
      }
      setroleList(data);
    });
    validationPassword();
  }, []);

  let validationSchema = {
    fullname: BaseValidation.requiredString(2, "Fullname"),
    username: BaseValidation.requiredString(2, "Username"),
    email: BaseValidation.requiredEmail(),
    status: BaseValidation.requiredBoolean("Status"),
  };

  const validationPassword = () => {
    if (props.mode === FORM_MODE_CREATE) {
      validationSchema.password = BaseValidation.requiredString(4, "Password");
      validationSchema.confirmation_password = BaseValidation.validationPassword(
        "password"
      );
    }
  };

  const formik = useFormik({
    initialValues: props.userData,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      props.formSubmitCallback(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInputText
        formik={formik}
        label={t("table:User Code", props.language)}
        field="user_code"
        disabled={true}
      />
      <FormInputText formik={formik} label={t("table:Fullname", props.language)} field="fullname" />
      <FormInputText formik={formik} label={t("table:Username", props.language)} field="username" />
      <FormInputText formik={formik} label={t("table:Email", props.language)} field="email" />
      <FormInputDropdownMultiple
        formik={formik}
        label={t("table:Role", props.language)}
        field="role"
        options={roleList}
        language={props.language}
      />

      <FormInputPassword
        formik={formik}
        label={t("table:Password", props.language)}
        display={props.mode === FORM_MODE_CREATE ? "block" : "none"}
        field="password"
      />
      <FormInputPassword
        formik={formik}
        display={props.mode === FORM_MODE_CREATE ? "block" : "none"}
        label={t("table:Confirmation Password", props.language)}
        field="confirmation_password"
      />

      <FormInputDropdown
        formik={formik}
        label={t("table:Status", props.language)}
        field="status"
        optionsValues={statusList}
        language={props.language}
      />

      <FormSubmitButton language={props.language} />
    </Form>
  );
}
