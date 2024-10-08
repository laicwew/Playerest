import { useFormik } from "formik";
import FormField from "../components/FormField";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

interface loginProps {
  show: boolean;
  handleClose: () => void;
  handleLogin: () => void;
}

export function LoginModal({ show, handleClose, handleLogin }: loginProps) {
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
      handleClose();
    },
  });
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <div className="register">
          <Modal.Header closeButton />
          <h1 className="register__header"> {!signup ? "Login" : "Sign up"}</h1>
          <form className="register__form" onSubmit={formik.handleSubmit}>
            <FormField
              className="register__form--username"
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter email"
            />
            <FormField
              className="register__form--password"
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
                className="register__form--confirmedPassword"
                id="comfirmedPassword"
                name="comfirmedPassword"
                type="password"
                label="comfirm password"
                value={formik.values.comfirmedPassword}
                onChange={formik.handleChange}
                placeholder="Confirm password"
              />
            )}

            <button
              type="submit"
              className="register__form_btn--login"
              onClick={handleLogin}
            >
              {!signup ? "Login" : "Signup"}
            </button>
          </form>
          <a
            href=""
            className="register__form_link--action"
            onClick={signupHandler}
          >
            {!signup ? "Not user yet? Signup Here" : "Already user? Login Here"}
          </a>
        </div>
      </Modal>
    </>
  );
}
