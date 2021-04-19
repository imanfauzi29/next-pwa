import { useFormik } from "formik"
import React, {useState, useEffect} from "react"
import { Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap"
import {
    FormInputCheckbox,
    FormInputText,
    FormSubmitButton
} from "./form/BaseForm"
import * as Yup from "yup"
import BaseValidation from "./form/BaseValidation"
import t from "../translator/helper"

const Input = (props) => {
    return (

            <Form.Group>
                <Form.Label>{props.label} {props.required && "*"}</Form.Label>
                <Form.Control type={props.type} disabled />
            </Form.Group>
    )
}

const InputBoolean = ({label, type, formik}) => {
    const [id, setId] = useState(0)
    const [listInput, setListInput] = useState([
        {
            id: id,
            input: (<BooleanField formik={formik} type={type} field={`boolean[${id}]`} />)
        }
    ])
    let addOption = () => {
        setId(id + 1)
        let row = (
            <Row>
                <Col md="10">
                    <BooleanField formik={formik} type={type} field={`boolean[${id}]`} />
                </Col>
                <Col md="2">
                    <Button variant="link" className="btn-default" data-form-id={id} onClick={removeField}>X</Button>
                </Col>
            </Row>
        )
        let input = {
            id: id,
            input: row
        }
        setListInput([...listInput, input])
        console.log(listInput, id);
    }

    let  removeField = (e) => {
        let idx = e.target.dataset.formId
        const input = listInput.filter(item => item.id !== parseInt(id))
        console.log(id, listInput);
        // setListInput([input])
    }
    return (
        <>
            <Form.Label>{label}</Form.Label>
                {listInput.map(item => item.input)}
            <Button variant="link" onClick={addOption}>add option</Button>
        </>
    )
}

const BooleanField = ({type, formik, field}) => {
    let inputType = type == 'radio' ? <InputGroup.Radio disabled /> : type == 'checkbox' ? <InputGroup.Checkbox disabled /> : ''
    console.log(formik.values, field);
    return (
        <InputGroup>
            <InputGroup.Prepend>
                {inputType}
            </InputGroup.Prepend>
            <FormControl name={field} onChange={formik.handleChange} value={formik.values[field]} />
        </InputGroup>
    )
}

function FormInput(props) {
    let hasType = props.type !== undefined
    const [type, setType] = useState(props.type)
    const [label, setLabel] = useState(props.label)
    
    let validationSchema = {
        field_name: BaseValidation.requiredString(2, "This field")
    }

    const formik = useFormik({
        initialValues: props.siteData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            props.formSubmitCallback(values)
        }
    })

    let Input = ({type, label}) => {
        switch (type) {
            case 'text':
                return ''
            case 'radio':
                return <InputBoolean label={"radio"} formik={formik} type={type} name={"radio"} />
        
            default:
                return ''
        }
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputText
                    formik={formik}
                    label={t("table:Input Field Name", props.language)}
                    field="field_name"
                />
                { hasType && <Input type={props.type} label={props.label} />}
            <div className="dropdown-divider" />
            <FormInputCheckbox formik={formik} label={"required"} field="required" />
            <div style={{ float: "right" }}>
                <Button size="sm" variant="primary" type="submit">
                    <i className="fa fa-pencil" />{' '}{t("button:Save", props.language)}
                </Button>
            </div>
        </Form>
    )
}

export { Input, FormInput, InputBoolean}
