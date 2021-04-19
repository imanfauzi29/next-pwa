import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import BaseValidation from "./BaseValidation";
import { FormInputNumber, FormSubmitButton } from "./BaseForm";

export default function SplitBatchImageQuantityForm(props) {
  let validationSchema = {
    split_batch_image: BaseValidation.numberOnly("Split Image Batch"),
  };

  const formik = useFormik({
    initialValues: props.postData,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      props.formSubmitCallback(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInputNumber
        formik={formik}
        field="split_batch_image"
        label="Split Image Quantity"
      />
      <FormSubmitButton />
    </Form>
  );
}
