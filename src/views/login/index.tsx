import { useFormik } from "formik";
import FormField from "../components/FormField";
import { useState } from "react";

export function Login() {
  const [signup, setSignup] = useState(false);

  const signupHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setSignup((prevState) => !prevState);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      comfirmedPassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="register">
      <h1 className="register__header"> {!signup ? "Login" : "Sign up"}</h1>
      <form className="register__form">
        <FormField
          className="register__form_username"
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter email"
        />
        <FormField
          className="register__form_password"
          id="password"
          name="password"
          type="password"
          label="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter password"
        />

        {signup && (
          <FormField
            className="register__form_password"
            id="comfirmedPassword"
            name="comfirmedPassword"
            type="password"
            label="comfirm password"
            value={formik.values.comfirmedPassword}
            onChange={formik.handleChange}
            placeholder="Confirm password"
          />
        )}

        <button type="submit" className="register__form_btn">
          {!signup ? "Login" : "Signup"}
        </button>
      </form>
      <a href="" className="register__form_link" onClick={signupHandler}>
        {!signup ? "Not user yet? Signup Here" : "Already user? Login Here"}
      </a>
    </div>
  );
}
