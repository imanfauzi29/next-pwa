import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";


import SiteService from "../../services/SiteService";
import ProjectService from "../../services/ProjectService";
import {
  FormInputDropdown,
  FormInputText,
  FormInputNumber,
  FormSubmitButtonWithLoading,
  FormInputDropdownCustomeOnChange,
} from "./BaseForm";
import BaseValidation from "./BaseValidation";
import t from "../../translator/helper";

export default function BatchForm(props) {
  const [projectList, setprojectList] = useState([]);
  const [siteList, setsiteList] = useState([]);
  const [chooseSiteName, setChooseSiteName] = useState(t("table:Project First", props.language));
  const [disableSiteOptions, setdisableSiteOptions] = useState(true)
  const [priorityList, setpriorityList] = useState([
    {
      value: "",
      label: `- ${t("filter:Choose Priority", props.language)} -`,
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ]);
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = () => {
    let api = new ProjectService(props.session);
    api.getProject().then((res) => {
      let data = [{ value: "", label: `- ${t("filter:Choose Project Name",props.language)} -` }];
      if (res.records != null) {
        res.records.map(function (row) {
          data.push({
            value: row.id,
            label: `${row.project_code} - ${row.name}`,
          });
          return;
        });
      }
      setprojectList(data);
    });
  };

  let validationSchema = {
    project_id: BaseValidation.numberOnly("Project"),
    site_id: BaseValidation.numberOnly("Site"),
    batch_name: BaseValidation.requiredString(2, "Batch Name"),
    priority: BaseValidation.numberOnly("Priority"),
    image_quantity: BaseValidation.numberOnly("Image Quantity"),
  };

  const formik = useFormik({
    initialValues: props.batchData,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      props.formSubmitCallback(values);
    },
  });

  const handleUploadButton = (event) => {
    hiddenFileInput.current.click();
  };

  const handleProjectSelected = (projectId) => {
    let api = new ProjectService(props.session);
    api.getProjectSiteByProject(projectId).then(res => {
      let data = [{ value: "", label: `- Choose ${t("table:Site Name", props.language)} -` }];
      if (res.records != null) {
        res.records.map(function (row) {
          data.push({ value: row.site_id, label: `${row.site_code} - ${row.site_name}` });
          return;
        });
      }
      setChooseSiteName(`${t("table:Site Name", props.language)}`)
      setdisableSiteOptions(false);
      setsiteList(data);
    })

  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInputDropdownCustomeOnChange
        formik={formik}
        label={t("table:Project Name", props.language)}
        field="project_id"
        optionsValues={projectList}
        language={props.language}
        onChange={(selectedOption) => {
          handleProjectSelected(selectedOption.value)
          let event = {
            target: { name: "project_id", value: selectedOption.value }
          }
          formik.handleChange(event)
        }}
      />

      <FormInputDropdown
        formik={formik}
        label={chooseSiteName}
        field="site_id"
        disabled={disableSiteOptions}
        optionsValues={siteList}
        language={props.language}
      />

      <Form.Group>
        <Form.Label>{t("common:Upload Excel File", props.language)} </Form.Label>
        <br />
        <Button size="sm" variant="success" onClick={handleUploadButton}>
          <i className="fa fa-folder-open"/>&nbsp;{t("table:Select File", props.language)}
        </Button>
        <span style={{ fontSize: "14px" }}>
          {" "}
          {formik.values.upload_excel.name}{" "}
        </span>
        <Form.Control
          id="upload_excel"
          name="upload_excel"
          ref={hiddenFileInput}
          size="lg"
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            let filename = event.currentTarget.files[0].name;
            let extension = filename.split(".")[1];
            let batchName = filename.replace("." + extension, "");

            let setBatchName = {
              target: { name: "batch_name", value: batchName },
            };
            let fileExcel = {
              target: {
                name: "upload_excel",
                value: event.currentTarget.files[0],
              },
            };

            formik.handleChange(setBatchName);
            formik.handleChange(fileExcel);
          }}
        />
        {formik.errors.upload_excel && formik.touched.upload_excel && (
          <p style={{ color: "red", fontSize: "15px" }}>
            {formik.errors.upload_excel}
          </p>
        )}
      </Form.Group>

      <FormInputText formik={formik} label={t("filter:Batch Name", props.language)} field="batch_name" />
      <FormInputNumber
        formik={formik}
        label={t("table:Image Quantity",props.language)}
        field="image_quantity"
      />
      <FormInputDropdown
        formik={formik}
        label={t("filter:Priority", props.language)}
        field="priority"
        optionsValues={priorityList}
        language={props.language}
      />

      <FormSubmitButtonWithLoading loading={props.loadingSubmit} language={props.language} />
    </Form>
  );
}
