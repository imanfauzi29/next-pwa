import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BatchService from "../../services/BatchService";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import RowNumberFormatter from "../table/formatter/RowNumberFormatter";
import RemoteTable from "../table/RemoteTable";
import CollapsiblePanel from "../ColapsiblePanel";
import { FormInputNumber, FormSubmitButtonWithLoading } from "./BaseForm";
import BaseValidation from "./BaseValidation";
import t from "../../translator/helper";

export default function BatchNotPassForm(props) {
  const batchService = new BatchService(props.session);
  const [dataBatch, setDataBatch] = useState(props.notPassData);
  const [isFileCorrectionExpanded, setIsFileCorrectionExpanded] = useState(false)
  const [isNoteExpaned, setIsNoteExpaned] = useState(false)
  const hiddenFileInput = React.useRef(null);
  const urlErrorData = batchService.getTableUrl(`/error/${dataBatch.id}`)
  const [columns, setColumns] = useState([
    {
      dataField: "#",
      text: "",
      formatter: RowNumberFormatter.rowNumberFormatter,
    },
    { dataField: "filename", text: "Filename", headerAlign: "center" },
    { dataField: "message", text: "Message", headerAlign: "center" },
  ]);

  const handleNote = () => {
    let statusUpload = dataBatch.validation_status;
    if (statusUpload === "Uploaded") {
      let note = (
        <ul
          style={{
            border: "1px solid black",
            height: "150px",
            overflowY: "auto",
          }}
        >
          <li>{dataBatch.remark_check}</li>
        </ul>
      );
      return note;
    } else {
      let note = (
        <RemoteTable
          url={urlErrorData}
          token="irMU0gh35klOVbFfhWuIWrp8MXyHhBsc"
          columns={columns}
        />
      );
      return note;
    }
  };

  const handleUploadButton = (event) => {
    hiddenFileInput.current.click()
  };

  const onVisibilityChangeFileCorrection = (isExpanded) => {
    setIsFileCorrectionExpanded(isExpanded)
  }

  const onVisibilityChangeNote = (isExpanded) => {
    setIsNoteExpaned(isExpanded)
  }

  let validationSchema = {
    image_quantity: BaseValidation.numberOnly("Image Quantity"),
  };

  const formik = useFormik({
    initialValues: props.notPassData,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      console.log(props)
      props.onSubmitNotPassCallback(values);
    },
  });

  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} style={{marginBottom: "5px"}}>
          <strong>{t("common:Batch Info", props.language)} </strong>
        </Col>
        <Col xs={12} sm={6} md={6}>
          <p> Batch Name : {dataBatch.batch_name}</p>
          {/*<p> Site : {site} </p>*/}
          <p> Total Row : {dataBatch.content_length} data</p>
        </Col>

        <Col xs={12} sm={6} md={6}>
          <p> {t("common:Checked Date", props.language)}: {dataBatch.check_date} </p>
          <p> {t("common:Created By", props.language)} : {dataBatch.created_by}</p>
        </Col>
      </Row>
      <div className="divider" />
      <Row>
        <CollapsiblePanel
          title={t("common:File Correction", props.language)}
          isExpanded={isFileCorrectionExpanded}
          onVisibilityChange={onVisibilityChangeFileCorrection}>
          <Form onSubmit={formik.handleSubmit}>
            <Col xs={12} sm={12} md={12} style={{marginBottom: "5px"}}>
              <strong>{t("common:File Correction", props.language)} </strong>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <div>
                <Form.Group>
                  <Form.Label>Upload Excel file </Form.Label> <br />
                  <Form.Control
                    id="upload_excel"
                    name="upload_excel"
                    ref={hiddenFileInput}
                    size="lg"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      let fileExcel = {
                        target: {
                          name: "upload_excel",
                          value: event.currentTarget.files[0],
                        },
                      };

                      formik.handleChange(fileExcel);
                    }}
                  />
                  <Button
                    variant="light"
                    size={"sm"}
                    onClick={handleUploadButton}>
                    <i className="fa fa-folder-open"/> {t("common:Select File", props.language)}{" "}
                  </Button>
                </Form.Group>
              </div>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <div>
                <Form.Group>
                  <FormInputNumber
                    formik={formik}
                    label="Image Qty Correction"
                    field="image_quantity"
                  />
                </Form.Group>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <FormSubmitButtonWithLoading loading={props.loadingSubmit} language={props.language} />
            </Col>
          </Form>
        </CollapsiblePanel>
      </Row>
      <div className="divider" />
      <Row>
        <CollapsiblePanel
          title={t("common:Note", props.language)}
          isExpanded={isNoteExpaned}
          onVisibilityChange={onVisibilityChangeNote}>
          <Col xs={12} sm={12} md={12}>
            {handleNote()}
          </Col>
        </CollapsiblePanel>
      </Row>
    </>
  );
}
