import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import {
  FormInputDropdown,
  FormInputDropdownMultiple,
  FormSubmitButton,
} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import SiteService from "../../services/SiteService";
import BatchService from "../../services/BatchService";
import t from "../../translator/helper";

export default function RelocateForm(props) {
  const [siteList, setsiteList] = useState([]);
  const [batchList, setbatchList] = useState([]);

  useEffect(() => {
    getBatchList();
    getSiteList();
  }, []);

  const getSiteList = () => {
    let api = new SiteService();
    api.getSite().then((res) => {
      if (res.records != null) {
        let data = [{ value: "", label: `- ${t('filter:Choose Site', props.language)} -` }];
        res.records.map(function (row) {
          data.push({ value: row.id, label: row.name });
          return;
        });

        setsiteList(data);
      }
    });
  };

  const getBatchList = () => {
    let api = new BatchService();
    api.getDataBatch().then((res) => {
      if (res.records != null) {
        let data = [{ value: "", label: t("filter:Choose Batch", props.language) }]
        res.records.map(function (row) {
          data.push({ value: row.id, label: row.batch_name });
          return;
        });

        setbatchList(data);
      }
    });
  };

  let validationSchema = {
    site_id: BaseValidation.numberOnly("Site"),
  };

  const formik = useFormik({
    initialValues: props.relocateData,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      props.formSubmitCallback(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInputDropdown
        formik={formik}
        label={t("table:Site", props.language)}
        field="site_id"
        optionsValues={siteList}
        language={props.language}
      />
      <FormInputDropdownMultiple
        formik={formik}
        label={t("table:Batch", props.language)}
        field="batch_id"
        options={batchList}
        language={props.language}
      />
      <FormSubmitButton />
    </Form>
  );
}

// const RelocateForm = ({ siteList = [], batchList = [] }) => {
//   let api = new BatchService();
//   let relocateData = {
//     site: null,
//     batch: [],
//     loading: false,
//   };

//   const formik = useFormik({
//     initialValues: relocateData,
//     validationSchema: Yup.object({
//       site: Yup.number().required("Please select Data Site!"),
//       batch: Yup.array().of(Yup.number()).required("Please select your batch!"),
//     }),
//     onSubmit: (values) => {
//       relocateBatch(values);
//     },
//   });

//   function relocateBatch(values) {
//     formik.setFieldValue("loading", true);
//     let body = {
//       id_batch: values.batch,
//       id_site: values.site,
//     };

//     api
//       .relocateBatch(body)
//       .then((res) => {
//         formik.setFieldValue("loading", false);

//         if (res.is_success) {
//           SwalAlert.showAlert(res.message, "success").then(() => {
//             window.location.reload();
//           });
//         } else {
//           SwalAlert.showAlert(res.message, "error");
//         }
//       })
//       .catch((e) => {
//         formik.setFieldValue("loading", false);

//         if (e.response) {
//           Swal.fire({
//             title: e.response.data.message,
//             confirmButtonText: "Ok",
//             icon: "error",
//           });
//         } else if (e.request) {
//           Swal.fire({
//             title: "Request Timeout\n Please try again!",
//             confirmButtonText: "Ok",
//             icon: "warning",
//           });
//         } else {
//           console.log(e.message);
//         }
//       });
//   }

//   return (
//     <Form onSubmit={formik.handleSubmit}>
//       <Row style={{ marginBottom: "2%" }}>
//         <Col xs={12} sm={6} md={6}>
//           <Form.Group>
//             <Form.Label>Bacth</Form.Label>
//             <Select
//               id="batch_list"
//               name="batch_list"
//               label="Field of Research"
//               placeholder="- Choose Batch -"
//               options={batchList}
//               autosize={true}
//               isMulti={true}
//               isClearable={true}
//               backspaceRemovesValue={true}
//               onChange={(selectedOption) => {
//                 let value = [];
//                 if (selectedOption !== null) {
//                   selectedOption.forEach((e) => {
//                     value.push(e.value);
//                   });
//                 }
//                 let event = { target: { name: "batch", value: value } };
//                 formik.handleChange(event);
//               }}
//             />
//             {formik.errors.batch && formik.touched.batch && (
//               <p className="validation-form">{formik.errors.batch}</p>
//             )}
//           </Form.Group>
//         </Col>

//         <Col xs={12} sm={6} md={6}>
//           <Form.Group>
//             <Form.Label>Relocate To</Form.Label>
//             <Select
//               id="site_list"
//               name="site_list"
//               label="Field of Research"
//               placeholder="- Choose Site -"
//               options={siteList}
//               autosize={true}
//               isMulti={false}
//               isClearable={false}
//               backspaceRemovesValue={false}
//               onChange={(selectedOption) => {
//                 let event = {
//                   target: { name: "site", value: selectedOption.value },
//                 };
//                 formik.handleChange(event);
//               }}
//             />
//             {formik.errors.site && formik.touched.site && (
//               <p className="validation-form">{formik.errors.site}</p>
//             )}
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Button
//             variant="primary"
//             type="submit"
//             size={"sm"}
//             disabled={formik.values.loading}
//           >
//             {formik.values.loading ? (
//               <Spinner
//                 as="span"
//                 animation="border"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//             ) : (
//               <i className="fa fa-plus-circle" />
//             )}{" "}
//             Relocate Batch{" "}
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default RelocateForm;
