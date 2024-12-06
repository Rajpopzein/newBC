import { Button, CardContent, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayOut from "@/components/layout/AuthLayOut";
import Navbar from "@/components/landingpage/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <div className="login-main-box">
    <Navbar/>
      <AuthLayOut>
        <CardContent>
          <Typography variant="caption" className="login-header">
            Welcome Back 👋!
          </Typography>
          <Typography variant="h5" className="login-header">
            Continue to your account.
          </Typography>
          <div className="login-form">
            <Button className="w-[100%] google-btn p-5" variant="contained">
              <FcGoogle className="mr-3" /> Log in with Google
            </Button>
            <p className="textbtwline">Or Use Email</p>
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                className="form-input"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
              <Button type="submit" variant="contained" className="login-btn">
                Continue
              </Button>
            </form>
          </div>
          <Typography variant="body2" className="login-footer">
            Don't have an account?{" "}
            <a
              href="#"
              className="signup-txt"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </a>
          </Typography>
        </CardContent>
        <Button
          onClick={() => navigate("/")}
          startIcon={<BiSolidChevronLeft />}
          className="login-close-btn"
        >
          Home
        </Button>
      </AuthLayOut>
    </div>
  );
};

export default Login;
