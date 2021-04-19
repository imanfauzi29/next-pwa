import {useFormik} from "formik";
import {Button, Form} from "react-bootstrap";
import * as Yup from "yup";
import BaseValidation from "./BaseValidation";
import { FormInputText, FormSubmitButton } from "./BaseForm";
import t from "../../translator/helper";

export default function RoleForm(props) {
    let validationSchema = {
        role_name: BaseValidation.requiredString(2, "Role Name")
    }

    const formik = useFormik({
        initialValues: props.roleData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            props.formSubmitCallback(values)
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputText formik={formik} label={t("table:Role Name", props.language)} field="role_name"/>
            <FormSubmitButton language={props.language} />
        </Form>
    )
}