import {useFormik} from "formik";
import {Form} from "react-bootstrap";
import * as Yup from "yup";
import {FormInputText, FormInputDropdown, FormSubmitButton, FormInputDropdownMultiple} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import React, {useState, useEffect} from 'react';
import SiteService from "../../services/SiteService";
import UserService from "../../services/UserService";
import t from "../../translator/helper";
import TaskTypeService from "../../services/TaskTypeService";
import Select from "react-select";

export default function SiteUserForm(props) {
    const [siteList, setSiteList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [taskTypeList, setTaskTypeList] = useState([])
    useEffect(() => {
        let siteService = new SiteService(props.session)
        siteService.getSite().then(data => {
            let optionsSite = []
            data.records.forEach(r => {
                let label = `${r.site_id} - ${r.name}`
                optionsSite.push({value: r.id, label: label})
            })
            setSiteList(optionsSite)
        })

        let userService = new UserService(props.session)
        userService.getUser().then(data => {
            let optionsUser = []
            data.records.forEach(r => {
                let label = `${r.code} - ${r.fullname}`
                optionsUser.push({value: r.id, label: label})
            })
            setUserList(optionsUser)
        })

        let taskTypeService = new TaskTypeService(props.session)
        taskTypeService.getTaskType().then(data => {
            let records = data.records
            let optionTaskType = records.map(r => {
                return {value: r.id, label:`${r.task_type_id} - ${r.task_name}`}
            })
            setTaskTypeList(optionTaskType)
        })
    }, []);

    let validationSchema = {
        site_id: BaseValidation.numberOnly("Site"),
        id_user: BaseValidation.numberOnly("User"),
    };

    const formik = useFormik({
        initialValues: props.siteUserData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            console.log(values);
            // props.formSubmitCallback(values)
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputDropdown formik={formik} label={t("table:Site", props.language)} field="site_id" optionsValues={siteList} language={props.language} />
            <FormInputDropdown formik={formik} label={t("table:User", props.language)} field="id_user" optionsValues={userList} language={props.language} />
            <FormInputDropdownMultiple
                formik={formik}
                label={t("table:Module", props.language)}
                field="module_id"
                options={taskTypeList}
                language={props.language}
            />
            <FormSubmitButton language={props.language} />
        </Form>
    )
}