import { useFormik } from 'formik';
import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
import { FormInputDropdown, FormInputText, FormSubmitButton } from './BaseForm';
import * as Yup from "yup";
import BaseValidation from './BaseValidation';
import t from '../../translator/helper';

export default function SiteForm(props) {
    const [status, setstatus] = useState([
        {
            value: "",
            label: t("filter:Choose Status", props.language)
        },
        {
            value: true,
            label: t("filter:Active", props.language)
        },
        {
            value: false,
            label: t("filter:Non Active", props.language)
        }
    ])

    useEffect(() => {
        
    }, [])

    let validationSchema = {
        site_name: BaseValidation.requiredString(2, "Site Name"),
        status: BaseValidation.requiredBoolean("Status")
    }

    const formik = useFormik({
        initialValues: props.siteData,
        validationSchema: Yup.object(validationSchema),
        onSubmit: values => {
            props.formSubmitCallback(values)
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormInputText formik={formik} label={t("table:Site ID", props.language)} field="site_id" disabled={true}/>
            <FormInputText formik={formik} label={t("table:Site Name", props.language)} field="site_name"/>
            <FormInputDropdown formik={formik} label={t("table:Status", props.language)} field="status" optionsValues={status} language={props.language} />
            <FormSubmitButton language={props.language} />
        </Form>
    )
}

// const SiteForm = ({name, id, status, type, siteId, session}) => {
//     console.log(session)
//     let siteService = new SiteService(session)

//     let defineData = {
//         name: "",
//         id: "",
//         status: 0,
//         site_id: "Auto generated with prefix SIT"
//     }

//     let statusSite = [
//         {
//             value: "",
//             label: "- Choose Status -"
//         },
//         {
//             value: 1,
//             label: "Active"
//         },
//         {
//             value: 0,
//             label: "Non Active"
//         }
//     ]

//     if (type === "edit") {
//         defineData.name = name
//         defineData.id = id
//         defineData.status = Utils.stringToBool(status)
//         defineData.type = 'edit'
//         defineData.site_id = siteId
//     }

//     function addSite(data) {
//         delete data.site_id
//         delete data.id
//         data.status = Utils.stringToBool(data.status)

//         siteService.addSite(data).then(
//             res => {
//                 if (res.code == 0) {
//                     Swal.fire({
//                         title: res.message,
//                         confirmButtonText: "Ok",
//                         icon: "success"
//                     }).then(function () {
//                         window.location.reload()
//                     })
//                 } else {
//                     Swal.fire({
//                         title: res.message,
//                         confirmButtonText: "Ok",
//                         icon: "error"
//                     })
//                 }

//             }
//         ).catch(e => {
//             if (e.response) {
//                 Swal.fire({
//                     title: e.response.data.message,
//                     confirmButtonText: "Ok",
//                     icon: "error"
//                 })
//             } else if (e.request) {
//                 console.log(e.request)

//             } else {
//                 console.log(e.message)
//             }
//         })
//     }

//     function updateSite(data) {
//         delete data.site_id
//         delete data.type
//         data.status = Utils.stringToBool(data.status)
//         siteService.updateSite(data, data.id).then(
//             res => {
//                 console.log(res)
//                 if (res.code == "0") {
//                     Swal.fire({
//                         title: res.message,
//                         confirmButtonText: "Ok",
//                         icon: "success"
//                     }).then(function () {
//                         window.location.reload()
//                     })
//                 } else {
//                     Swal.fire({
//                         title: res.message,
//                         confirmButtonText: "Ok",
//                         icon: "error"

//                     })
//                 }

//             }
//         ).catch(e => {
//             if (e.response) {
//                 Swal.fire({
//                     title: e.response.data.message,
//                     confirmButtonText: "Ok",
//                     icon: "error"
//                 })
//             } else if (e.request) {
//                 console.log(e.request)

//             } else {
//                 console.log(e.message)
//             }
//         })

//     }


//     // form validation
//     const formik = useFormik({
//         initialValues: defineData,
//         validationSchema: Yup.object({
//             name: Yup.string()
//                 .min(2, "Mininum 2 characters")
//                 .required("Site name is required!"),
//         }),

//         onSubmit: values => {
//             if (values.type === "edit") {
//                 updateSite(values)
//             } else {
//                 addSite(values)
//             }

//         }
//     });
//     return (
//         <Form onSubmit={formik.handleSubmit}>
//             <Form.Group>
//                 <Form.Label>Site ID </Form.Label>
//                 <Form.Control id="site_id" name="site_id" size="md" type="text" value={formik.values.site_id} disabled/>
//             </Form.Group>

//             <Form.Group>
//                 <Form.Label>Site name </Form.Label>
//                 <Form.Control id="name" name="name" size="md" type="text" value={formik.values.name}
//                               onChange={formik.handleChange}/>
//                 {formik.errors.name && formik.touched.name && (
//                     <p style={{color: "red", fontSize: "10px"}}>{formik.errors.name}</p>
//                 )}
//             </Form.Group>

//             <Form.Group>
//                 <Form.Label>Status </Form.Label>
//                 <Select
//                     id="status"
//                     name="status"
//                     placeholder="- Choose Status -"
//                     options={statusSite}
//                     autosize={true}
//                     isMulti={false}
//                     isClearable={false}
//                     backspaceRemovesValue={false}

//                     defaultValue={statusSite.filter(({value}) => parseInt(value) == formik.values.status)}

//                     onChange={selectedOption => {
//                         let event = {target: {name: 'status', value: selectedOption.value}}
//                         formik.handleChange(event)
//                     }}
//                 />
//             </Form.Group>


//             <br/>
//             <div style={{float: "right"}}>
//                 <Button variant="primary" type="submit" size="sm">
//                     <i className="fa fa-pencil"/> Save Changes
//                 </Button>
//             </div>

//         </Form>
//     )
// }

// export default SiteForm