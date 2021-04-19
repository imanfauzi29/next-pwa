import * as Yup from "yup";

class BaseValidation {
  static requiredString(minLength, fieldName) {
    return Yup.string()
      .min(minLength, `Mininum ${minLength} characters`)
      .required(`${fieldName} is Required!`);
  }

  static numberOnly(fieldName) {
    return Yup.number().required(`${fieldName} only number allowed!`);
  }

  static requiredBoolean(fieldName) {
    return Yup.boolean()
      .required(`${fieldName} value only allowed!`)
      .oneOf([true, false], `${fieldName} must be boolean value`);
  }

  static requiredEmail() {
    return Yup.string()
      .email("Invalid format email")
      .required("Email is required");
  }

  static validationPassword(fieldFirtsPassword) {
    return Yup.string().when(fieldFirtsPassword, {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref(fieldFirtsPassword)],
        "Both password need to be the same"
      ),
    });
  }
  static requiredBool(fieldName) {
    return Yup.bool().required(`${fieldName} only number allowed!`);
  }

  static requiredArray(field) {
    return Yup.array().of(
      Yup.number().required(`${field} only number allowed!`)
    );
  }
}

export default BaseValidation;
