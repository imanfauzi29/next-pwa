import {useFormik} from "formik"
import {Form} from "react-bootstrap"
import Select from "react-select";
import * as Yup from 'yup'
import BaseValidation from "./BaseValidation"
import React, {useState, useEffect} from "react"
import SiteService from "../../services/SiteService"
import { FormInputDropdown, FormSubmitButton } from "./BaseForm"
import UserService from "../../services/UserService"
import t from "../../translator/helper";

export default function SiteManagerForm(props) {
    const [siteList, setSiteList] = useState([]);
    const [managerList, setmanagerList] = useState([]);

    useEffect(() => {
        let site = new SiteService(props.session)
        site.getSite().then(data => {
            let optionsSite = []
            if(data.records != null) {
                optionsSite.push({value: "", label: `- ${t("filter:Choose Site", props.language)} -`})
                data.records.forEach(record => {
                    let label = `${record.site_id} - ${record.name}`
                    optionsSite.push({value: record.id, label: label})
                });
                setSiteList(optionsSite)
            }
        })

        let user = new UserService(props.session)
        user.getListSiteManager().then(data => {
            let optionsUser = []
            if(data.records != null) {
                optionsUser.push({value: "", label: `- ${t("filter:Choose Manager",props.language)} -`})
                data.records.forEach(record => {
                    let label = `${record.code} - ${record.fullname}`
                    optionsUser.push({value: record.id, label: label})
                });
                setmanagerList(optionsUser)
            }
        })
    }, [])

    let validationSchema = {
        site_id: BaseValidation.numberOnly("Site")
    };

    const formik = useFormik({
        initialValues: props.siteManagerData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            props.formSubmitCallback(values)
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputDropdown formik={formik} label={t("table:Site", props.language)} field="site_id" optionsValues={siteList} language={props.language} />
            <Form.Label>{t("common:Manager", props.language)}</Form.Label>
            <Select
                id="manager_id"
                name="manager_id"
                label="Manager"
                placeholder={`- ${t("filter:Choose Manager", props.language)} -`}
                options={managerList}
                isMulti={true}
                isClearable={true}
                backspaceRemovesValue={true}
                onChange={selectedOption => {
                    let event = {target: {name: 'manager_id', value: selectedOption}}
                    formik.handleChange(event)
                }}
            />

            <FormSubmitButton language={props.language} />
        </Form>
    )

    
}