import { Button, Form, Spinner } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import moment from "moment"
import t from "../../translator/helper"

const FORM_MODE_CREATE = 1
const FORM_MODE_EDIT = 2

const FormInputText = ({ formik, label, field, disabled = false }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                id={field}
                name={field}
                placeholder={label}
                disabled={disabled}
                size="md"
                type="text"
                value={formik.values[field]}
                onChange={formik.handleChange}
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormInputNumber = ({ formik, label, field }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                id={field}
                name={field}
                size="md"
                type="number"
                value={formik.values[field]}
                onChange={formik.handleChange}
            />

            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormInputPassword = ({
    formik,
    label,
    field,
    disabled = false,
    display = "block"
}) => {
    return (
        <Form.Group style={{ display: display }}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                id={field}
                name={field}
                placeholder={label}
                disabled={disabled}
                size="md"
                type="password"
                value={formik.values[field]}
                onChange={formik.handleChange}
            />
        </Form.Group>
    )
}
const FormInputCheckbox = ({ formik, label, field }) => {
    return (
        <Form.Group>
            <Form.Check
                type="checkbox"
                id={field}
                name={field}
                checked={formik.values[field]}
                label={label}
                onChange={formik.handleChange}
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormInputDropdown = ({ formik, label, field, optionsValues, language, disabled = false }) => {
    const getObjectValue = (v) => {
        return optionsValues.find((o) => {
            return o.value === v
        })
    }

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>

            <Select
                id={field}
                name={field}
                placeholder={`- ${t('filter:Choose', language)} ${label} -`}
                options={optionsValues}
                autosize={true}
                isClearable={false}
                isDisabled={disabled}
                classNamePrefix="select"
                backspaceRemovesValue={false}
                defaultValue={getObjectValue(formik.values[field])}
                value={getObjectValue(formik.values[field])}
                onChange={(selectedOption) => {
                    let event = {
                        target: { name: field, value: selectedOption.value }
                    }
                    formik.handleChange(event)
                }}
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormInputDropdownMultiple = ({ formik, label, field, options, language }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Select
                id={field}
                name={field}
                placeholder={`- ${t('filter:Choose', language)} ${label} -`}
                options={options}
                autosize={true}
                isMulti
                isClearable={false}
                classNamePrefix="select"
                backspaceRemovesValue={false}
                defaultValue={formik.values[field]}
                onChange={(selectedOption) => {
                    let value = []
                    if (selectedOption !== null) {
                        selectedOption.forEach((e) => {
                            value.push(e.value)
                        })
                    }
                    let event = { target: { name: field, value: value } }
                    formik.handleChange(event)
                }}
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormSubmitButton = ({language}) => {
    return (
        <div style={{ float: "right" }} className="mt-5">
            <Button size="sm" variant="primary" type="submit">
                <i className="fa fa-pencil"/>&nbsp;&nbsp;{t("button:Save", language)}
            </Button>
        </div>
    )
}
const FormSubmitButtonWithLoading = ({ loading, language }) => {
    return (
        <div style={{ float: "right" }} className="mt-5">
            <Button size="sm" variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                ) : (
                    <i className="fa fa-plus-circle" />
                )} {t("button:Save", language)}
            </Button>
        </div>
    )
}
const FormInputDate = ({ formik, label, field }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <DatePicker
                className="form-control form-control-md"
                selected={formik.values[field]}
                onChange={(selectedOption) => {
                    let event = {
                        target: {
                            name: field,
                            value: moment(selectedOption).toDate()
                        }
                    }
                    formik.handleChange(event)
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}
const FormInputDropdownCustomeOnChange = ({ formik, label, field, optionsValues, language, onChange }) => {
    const getObjectValue = (v) => {
        return optionsValues.find((o) => {
            return o.value === v
        })
    }

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>

            <Select
                id={field}
                name={field}
                placeholder={`- ${t('filter:Choose', language)} ${label} -`}
                options={optionsValues}
                autosize={true}
                isClearable={false}
                classNamePrefix="select"
                backspaceRemovesValue={false}
                defaultValue={getObjectValue(formik.values[field])}
                value={getObjectValue(formik.values[field])}
                onChange={onChange}
            />
            {formik.errors[field] && (
                <small className="text-danger font-weight-bold">{formik.errors[field]}</small>
            )}
        </Form.Group>
    )
}

export {
    FormInputText,
    FormInputNumber,
    FormInputPassword,
    FormInputCheckbox,
    FormInputDropdown,
    FormInputDate,
    FormInputDropdownMultiple,
    FormSubmitButtonWithLoading,
    FormSubmitButton,
    FormInputDropdownCustomeOnChange,
    FORM_MODE_CREATE,
    FORM_MODE_EDIT
}
