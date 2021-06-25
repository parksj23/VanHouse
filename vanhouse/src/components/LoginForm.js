import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import RegistrationForm from "./RegistrationForm"
import "../styles/login.css"
import usePasswordValidator from "./usePasswordValidator";
import validateEmail from "./utils";

function LoginForm({
                       setIsRegistrationVisible,
                       isRegistrationVisible,
                       setIsLoginVisible,
                       isLoginVisible,
                       setIsRegisterButtonVisible,
                       isRegisterButtonVisible,
                       submit,
                       show,
                       handleClose,
                       loginError,
                       name,
                       setName,
                       email,
                       setEmail,
                       setPassword,
                       passwordError,
                       regEmail,
                       setRegEmail,
                       regPassword,
                       setRegPassword,
                       register,
                       regUser,
                       handleRegChange,
                       confirmPassword,
                       setConfirmPassword,
                       confirmPasswordError,
                       setConfirmPasswordError,
                   }) {

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    const [emailError, setEmailError] = useState("");

    const setVisibilities = () => {
        setIsRegistrationVisible(!isRegistrationVisible);
        setIsLoginVisible(!isLoginVisible);
        setIsRegisterButtonVisible(!isRegisterButtonVisible);
    }

    useEffect(
        () => {
            if (!email) {
                setEmailError("");
            }
            // else if (validateEmail(email)) {
            //     setEmailError("");
            // } else {
            //     setEmailError("Please enter a valid email.");
            // }
        },
        [email]
    );

    // end of copied code

    const handleSubmit = e => {
        e.preventDefault();
        submit(name, email);
    }

    return (
        <Modal id="Login-Modal" show={show} onHide={handleClose} animation={false}>
            {isLoginVisible &&
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(loginError !== "") ? (<div className="login-error">{loginError}</div>) : ""}
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="name" placeholder="Enter name" onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password"
                                      onChange={(e) => {
                                          setPassword(e.target.value)
                                      }}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Modal.Footer>
            </Form>
            }

            <div className="register-button-and-form">
                {isRegisterButtonVisible &&
                <Button
                    // className="register-button"
                    variant="success"
                    onClick={(e) => setVisibilities()}>
                    Register for a new account
                </Button>
                }

                {isRegistrationVisible &&
                <RegistrationForm
                    emailError={emailError}
                    register={register}
                    regUser={regUser}
                    handleRegChange={handleRegChange}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    confirmPasswordError={confirmPasswordError}
                    setConfirmPasswordError={setConfirmPasswordError}
                    regPassword={regPassword}
                    handleClose={handleClose}
                />
                }
                <br/>
                <br/>
            </div>
        </Modal>
    )
}


LoginForm.defaultProps = {
    loginError: ""
}

LoginForm.propTypes = {
    setIsRegistrationVisible: PropTypes.func.isRequired,
    isRegistrationVisible: PropTypes.bool.isRequired,
    setIsLoginVisible: PropTypes.func.isRequired,
    isLoginVisible: PropTypes.bool.isRequired,
    setIsRegisterButtonVisible: PropTypes.func.isRequired,
    isRegisterButtonVisible: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    // password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    // user: PropTypes.objectOf(PropTypes.object).isRequired
    regEmail: PropTypes.string.isRequired,
    setRegEmail: PropTypes.func.isRequired,
    regPassword: PropTypes.string.isRequired,
    setRegPassword: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    regUser: PropTypes.objectOf(PropTypes.object).isRequired,
    handleRegChange: PropTypes.func.isRequired
};

export default LoginForm
