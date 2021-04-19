import {useFormik} from "formik";
import {Form} from "react-bootstrap";
import * as Yup from "yup";
import {FormInputText, FormInputDropdown, FormSubmitButton, FormInputCheckbox} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import React, {useState, useEffect} from 'react';
import ProjectService from "../../services/ProjectService";
import TaskTypeService from "../../services/TaskTypeService";
import t from "../../translator/helper";

export default function ProjectAttributeForm(props) {
    const [taskTypeList, setTaskTypeList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [shouldProcessList, setShouldProcessList] = useState([
        {
            value: "",
            label: `- ${t("table:Should Process", props.language)} -`
        },
        {
            value: true,
            label: t("dialog:Yes", props.language)
        },
        {
            value: false,
            label: t("dialog:No", props.language)
        }
    ])

    useEffect(() => {
        let projectService = new ProjectService(props.session)
        projectService.getProject().then(data => {
            let optionsSite = []
            data.records.forEach(r => {
                let label = `${r.project_code} - ${r.name}`
                optionsSite.push({value: r.id, label: label})
            })
            setProjectList(optionsSite)
        })

        let taskTypeService = new TaskTypeService(props.session)
        taskTypeService.getTaskType().then(data => {
            let optionsUser = []
            data.records.forEach(r => {
                let label = `${r.task_type_id} - ${r.task_name}`
                optionsUser.push({value: r.id, label: label})
            })
            setTaskTypeList(optionsUser)
        })
    }, []);

    let validationSchema = {
        attribute_field_name: BaseValidation.requiredString(4, "Attribute Name"),
        should_process: BaseValidation.requiredBool("Should Process"),
        task_type_id: BaseValidation.numberOnly("Task Type"),
        project_id: BaseValidation.numberOnly("Project"),
    };

    const formik = useFormik({
        initialValues: props.projectAttributeData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            props.formSubmitCallback(values)
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputDropdown formik={formik} label={t("table:Project", props.language)} field="project_id" optionsValues={projectList} language={props.language} />
            <FormInputText formik={formik} field="attribute_field_name" label={t("common:Attribute Name", props.language)}/>
            <FormInputDropdown formik={formik} label={t("table:Task Type", props.language)} field="task_type_id" optionsValues={taskTypeList} language={props.language} />
            {/* <FormInputDropdown formik={formik} label={t("common:Should Process?", props.language)} field="should_process" optionsValues={shouldProcessList} language={props.language} /> */}
            <FormInputDropdown
                formik={formik}
                label={t("common:Should Process", props.language)}
                field="should_process"
                optionsValues={shouldProcessList}
                language={props.language}
            />
            {/* <FormInputCheckbox formik={formik} label={t("common:Should Process?", props.language)} field="should_process"/> */}
            <FormSubmitButton language={props.language} />
        </Form>
    )
}