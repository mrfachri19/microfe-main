// ** React Imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CONFIG from "@src/config/index";
import axios from "axios";
import { postLoginAuth, postLoginAuthCBN } from "@src/api/index";
import {
  setToken,
  setTokenAPIM,
  setUserData,
  setUsernik
} from "@src/utils/storage";
import ReCAPTCHA from "react-google-recaptcha";
import FooterComponent from '@layouts/components/footer';
import qs from "qs";
import toastAlert from "@src/utils/alert";
import { handleLogin } from "@store/authentication";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const LoginBasic = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = React.useState(0
    // localStorage.getItem("failedCount")
    //   ? parseInt(localStorage.getItem("failedCount"))
    //   : 0
  );
  const [captchaValue, setCaptchaValue] = React.useState("");

  // const history = useHistory();

  // validasi
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // handle login
  const Login = async (e) => {
    try {
      e.preventDefault();
      const grant_type = "password";
      const response = await postLoginAuth(
        qs.stringify({
          username: username,
          password: password,
          grant_type: grant_type
        })
      ).then((res) => {
        //  // console.log(res);
        setToken(res.data.access_token);
        setUsernik(res.data.user);
        setUserData(res.data);
        dispatch(handleLogin(res.data));
        toastAlert("success", "Berhasil login");

        // setTimeout(()=>{
        history('/dashboard')
        // },1000);
      });
    } catch (error) {
      if (error) {
        setFailedLogin(failedLogin + 1);
        toastAlert("error", "Username atau password salah")
      }
    }
  };

  // check captcha
  function onCheckCaptcha(value) {
     // console.log("Captcha value:", value);
    setCaptchaValue(value)
    dispatch({ type: "set", isValidCaptcha: true });
  }

  // get token
  const getToken = async () => {
    try {
      const xauth = "dXNlckRpYXJpdW06ZGlhcml1bVVzZXIjMTIz";
      const appKey = "b6562eef-9374-4f47-9904-ecfbeab1fa24";
      const response = await axios
        .get(
          `${CONFIG.API_URL}/gateway/telkom-jwt-getToken/1.0/getJsonWebToken?app_id=89eb6850-652d-40fd-8c51-9a8073f82426`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${xauth}`,
              "x-Gateway-APIKey": `${appKey}`
            }
          }
        )
        .then((res) => {
          if (res) {
             // console.log("token apim", res);
            setTokenAPIM(res.data.jwt);
          }
        });
      //  // console.log("token apim =>", response);
      // await localStorage.setItem("token_apim", response.data.jwt);
      // setTokenAPIM(response.data.jwt);
    } catch (error) {
       // console.log(error);
    }
  };

  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  useEffect(() => {
    // dispatch({ type: "set", isValidCaptcha: false });
    getToken();
  }, []);

  useEffect(() => {
    // dispatch({ type: "set", isValidCaptcha: false });
    // getToken();
    setFailedLogin(0)
    localStorage.removeItem("failedCount")
  }, [1]);

  useEffect(() => {
    if (failedLogin > 2) {
      dispatch({ type: "set", isValidCaptcha: true })
       // console.log("berapa nih", failedLogin)
    };
  }, [failedLogin]);

  return (
    <>
      <div className="auth-wrapper auth-basic">
        <img
          alt="..."
          className="background-cover"
          src={require(`@src/assets/img/bg-login.svg`).default}
        />
        <div className="auth-inner position-absolute">
          <Card className="mb-0">
            <CardBody>
              <div className="company-logo">
                <div className="image-telkom">
                  <img
                    alt="..."
                    className="h-9"
                    src={require(`@src/assets/images/pages/logotelkom.svg`).default}
                  />
                </div>
              </div>
              <Link
                className="brand-logo"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                <img className='img-fluid' src={require(`@src/assets/images/pages/logoDiarium.svg`).default} alt='Logo Diarium' />
              </Link>
              <CardTitle tag="h4" className="mb-4 text-center">
                Hello, Welcome Back!
              </CardTitle>
              <CardText className="mb-2 text-center">
                Let’s make your day more exciting here.
              </CardText>
              <Form className="auth-login-form mt-2" onSubmit={Login}>
                <div className="mb-4">
                  <Label className="form-label">NIK*</Label>
                  <Input
                    id=""
                    placeholder="Enter NIK"
                    type="text"
                    name="username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <Label
                      className="form-label"
                      for="login-password"
                      name="password"
                      typeof="password"
                    >
                      Password*
                    </Label>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    placeholder="Enter 8 characters password"
                    id="login-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {failedLogin > 2 ?
                  <div className="mb-4">
                    <Label className="form-label">Captcha*</Label>
                    <ReCAPTCHA
                      sitekey={CONFIG.captchaSiteKey}
                      onChange={onCheckCaptcha}
                    />
                  </div> :
                  <>
                  </>}
                <div className="form-check mb-7">
                  <Input type="checkbox" id="remember-me" onClick={() => { setAgree(!agree) }} defaultChecked={agree} />
                  <Label className="form-check-label" for="remember-me">
                    I agree to terms & conditions
                  </Label>
                </div>
                <Button type="submit" disabled={agree && (failedLogin < 3 || captchaValue!=="")  ? false : true} color="primary" block onSubmit={() => { Login }}>
                  Sign in
                </Button>
                <div className="d-flex justify-content-end">
                  <a href="https://portal.telkom.co.id/login/forgot" target="_blank">
                    <small>Forgot Password?</small>
                  </a>
                </div>
              </Form>
              <div className="divider my-7 d-none">
                <div className="divider-text">or</div>
              </div>
              <Button type="submit" className="border border-dark mb-3 d-none" color="#fff" block>
                QR Code Scan
              </Button>
              <footer className="copy-right-bottom mx-auto">
                <FooterComponent />
              </footer>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginBasic;
