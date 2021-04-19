import {useFormik} from "formik";
import {Form} from "react-bootstrap";
import * as Yup from "yup";
import {FormInputText, FormInputDropdown, FormSubmitButton} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import React, {useState, useEffect} from 'react';
import WorkflowService from "../../services/WorkflowService";
import t from "../../translator/helper";

export default function TaskTypeForm(props) {
    const [workflowList, setWorkflowList] = useState([]);
    useEffect(() => {
        let workflow = new WorkflowService(props.session)
        workflow.getWorkflows().then(data => {
            let optionsWorkflow = []
            data.records.forEach(r => {
                console.log(r);
                let label = `${r.workflow_id} - ${r.title}`
                optionsWorkflow.push({value: r.id, label: label})
            })
            setWorkflowList(optionsWorkflow)
        })
    }, []);

    let validationSchema = {
        task_name: BaseValidation.requiredString(2, "Task name"),
        workflow_id: BaseValidation.numberOnly("Workflow"),
    };

    const formik = useFormik({
        initialValues: props.taskTypeData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            props.formSubmitCallback(values)
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputText formik={formik} label={t("table:Task Name", props.language)} field="task_name"/>
            <FormInputDropdown formik={formik} label={t("table:Workflow", props.language)} field="workflow_id" optionsValues={workflowList} language={props.language} />
            <FormSubmitButton language={props.language} />
        </Form>
    )
}