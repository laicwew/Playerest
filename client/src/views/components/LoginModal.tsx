import { useFormik } from "formik";
import FormField from "../components/FormField";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  userSignIn,
  userSignUp,
  userSignUpVerify,
  sendVerifyCode,
} from "../../helpers/hooks/api/api";

interface loginProps {
  show: boolean;
  handleClose: () => void;
  handleLogin: (username: string) => void;
}

export function LoginModal({ show, handleClose, handleLogin }: loginProps) {
  const [signup, setSignup] = useState(false); // To toggle between login and signup
  const [isToVerify, setIsToVerify] = useState(false); // To handle the verification code page
  const [verificationCode, setVerificationCode] = useState(""); // Store verification code

  const signupHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setSignup((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmedPassword: "",
    },
    onSubmit: async (values) => {
      if (signup) {
        // Handle sign-up process
        try {
          const response = await userSignUp(
            values.email,
            values.username,
            values.password
          );
          if (response?.ok) {
            alert("Sign up successful! Verification code sent.");
            setIsToVerify(true); // Switch to verification screen
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // Handle login process
        try {
          const response = await userSignIn(values.username, values.password);
          if (response?.ok) {
            alert("Login successful!");
            handleLogin(values.username); // Call parent login handler
            handleClose(); // Close modal after login
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleVerification = async () => {
    try {
      const response = await userSignUpVerify(
        formik.values.username,
        verificationCode
      );
      if (response?.ok) {
        alert("Verification successful!");
        setIsToVerify(false); // Reset verify state
        handleClose(); // Close the modal
        handleLogin(formik.values.username);
      }
    } catch (error) {
      console.log(error);
      alert("Invalid verification code");
    }
  };

  const resendCodeHandler = async () => {
    try {
      const response = await sendVerifyCode(formik.values.username);
      if (response?.ok) {
        alert("Verification code resent!");
        handleClose(); // Close the modal
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <div className="register">
        <Modal.Header closeButton />
        <h1 className="register__header">
          {isToVerify ? "Verify Email" : !signup ? "Login" : "Sign up"}
        </h1>

        {/* Verification Page */}
        {isToVerify ? (
          <div className="register__form">
            <FormField
              className="register__form--username"
              id="verificationCode"
              name="verificationCode"
              type="text"
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <button
              type="button"
              className="register__form_btn--login"
              onClick={handleVerification}
            >
              Verify
            </button>
            <a
              href="#"
              className="register__form_link--resend"
              onClick={resendCodeHandler}
            >
              Resend Code
            </a>
          </div>
        ) : (
          /* Sign Up / Login Form */
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
              className="register__form--user"
              id="username"
              name="username"
              type="text"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Enter username"
            />
            <FormField
              className="register__form--user"
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter password"
            />

            {signup && (
              <FormField
                className="register__form--confirmedPassword"
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                label="Confirm Password"
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
                placeholder="Confirm password"
              />
            )}

            <button type="submit" className="register__form_btn--login">
              {!signup ? "Login" : "SignUp"}
            </button>
          </form>
        )}

        {/* Link to toggle between signup and login */}
        {!isToVerify && (
          <a
            href=""
            className="register__form_link--action"
            onClick={signupHandler}
          >
            {!signup
              ? "Not a user yet? Sign up here"
              : "Already a user? Login here"}
          </a>
        )}
      </div>
    </Modal>
  );
}
