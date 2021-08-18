import * as yup from "yup";

const formSchema = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .required("name is a required field")
    .min(3, "name must be 3 characters long"),
  email: yup
    .string()
    .trim()
    .email("must be a valid email address")
    .required("email is a required field"),
  password: yup
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
  TOS: yup.boolean(),
});

export default formSchema;
