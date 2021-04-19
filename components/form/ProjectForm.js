import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseValidation from "./BaseValidation";
import {
    FormInputDropdown,
    FormInputText,
    FormInputDate,
    FormSubmitButton,
} from "./BaseForm";
import WorkflowService from "../../services/WorkflowService";
import UserService from "../../services/UserService";
import t from "../../translator/helper";

export default function ProjectForm(props) {
    const [workflowList, setworkflowList] = useState([]);
    const [pmList, setpmList] = useState([]);
    const [statusProject, setstatusProject] = useState([
        {
            value: "",
            label: t("filter:Choose Status", props.language),
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
        let workflow = new WorkflowService(props.session);
        workflow.getWorkflows().then((res) => {
            let res_data = res.records;
            let data = [{ value: "", label: t("filter:Choose Workflow", props.language) }];
            if (res_data != null) {
                res_data.map(function (row) {
                    data.push({
                        value: row.id,
                        label: `${row.workflow_id} - ${row.title}`,
                    });
                    return;
                });
            }
            setworkflowList(data);
        });

        let userPm = new UserService();
        userPm.getPmList().then((res) => {
            let res_data = res.records;
            let userPM = [{ value: "", label: t("filter:Choose Project Manager", props.language) }];

            if (res_data !== null) {
                res_data.forEach((user) => {
                    if (user.role !== null) {
                        let role = user.role.find(
                            (role) => role.name === "Project Manager"
                        );
                        if (typeof role !== "undefined") {
                            let dataPm = {
                                value: user.id,
                                label: `${user.code} - ${user.fullname}`,
                            };
                            userPM.push(dataPm);
                        }
                    }
                });
            }
            setpmList(userPM);
        });
    }, []);

    let validationSchema = {
        project_name: BaseValidation.requiredString(2, "Project Name"),
        pm_id: BaseValidation.numberOnly("Project Manager"),
        workflow_id: BaseValidation.numberOnly("Workflow"),
        start_date: BaseValidation.requiredString(10, "Start Date"),
        end_date: BaseValidation.requiredString(10, "End Data"),
        status: BaseValidation.requiredBoolean("Status"),
    };

    const formik = useFormik({
        initialValues: props.projectData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            props.formSubmitCallback(values);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputText
                formik={formik}
                label={t("table:Project ID", props.language)}
                field="project_code"
                disabled={true}
            />
            <FormInputText
                formik={formik}
                label={t("table:Project Name", props.language)}
                field="project_name"
            />
            <FormInputDropdown
                formik={formik}
                label={t("table:Project Manager", props.language)}
                field="pm_id"
                optionsValues={pmList}
                language={props.language}
            />
            <FormInputDropdown
                formik={formik}
                label={t("table:Workflow", props.language)}
                field="workflow_id"
                optionsValues={workflowList}
                language={props.language}
            />
            <FormInputDate
                formik={formik}
                label={t("table:Start Date", props.language)}
                field="start_date"
            />
            <FormInputDate formik={formik} label={t("table:End Date", props.language)} field="end_date" />
            <FormInputDropdown
                formik={formik}
                label={t("table:Status", props.language)}
                field="status"
                optionsValues={statusProject}
                language={props.language}
            />
            <FormSubmitButton language={props.language} />
        </Form>
    );
}
