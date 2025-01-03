import AuthLayOut from "@/components/layout/AuthLayOut";
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { BiSolidChevronLeft } from "react-icons/bi";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Navbar from "@/components/landingpage/Navbar";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const regData = await axios.post(`${BASE_URL}/register`, values);
      if (regData.status === 200) {
        navigate("/login");
      }
      // Handle form submission
    },
  });
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <AuthLayOut>
        <div className="login-form">
          <Typography variant="h5" className="font-bold">
            Join Our Trading Community Today 👋!
          </Typography>
          <Typography variant="caption">
            Start Your Journey Towards Financial Freedom with Our Cutting-Edge
            Trading Platform
          </Typography>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="flex justify-between gap-3">
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-input w-full"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-input w-full"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-input w-full"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="Phone"
                  className="form-input w-full"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-input w-[100%]"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                placeholder="Confirm Password"
                className="form-input w-[100%]"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <Button className="login-btn" variant="contained" type="submit">
              Start your journey
            </Button>
          </form>
          <Typography variant="body2" className="login-footer">
            Have an account?{" "}
            <a
              href="#"
              className="signup-txt"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          </Typography>
        </div>
        <Button
          onClick={() => navigate("/")}
          startIcon={<BiSolidChevronLeft />}
          className="signup-close-btn "
        >
          Home
        </Button>
      </AuthLayOut>
    </div>
  );
};

export default Signup;
