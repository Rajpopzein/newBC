import { Button, CardContent, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router";
import AuthLayOut from "@/components/layout/AuthLayOut";

const Login = () => {
  const navigate = useNavigate();
  return (
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
            {<FcGoogle className="mr-3" />} Log in with Google
          </Button>
          <p className="textbtwline">Or Use Email</p>
          <form className="flex flex-col">
            <input type="text" placeholder="Email" className="form-input" />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <Button type="submit" variant="contained" className="login-btn">
              {"Continue"}
            </Button>
          </form>
        </div>
        <Typography variant="body2" className="login-footer">
          Don't have an account?{" "}
          <a href="#" className="signup-txt">
            Sign up
          </a>
        </Typography>
      </CardContent>
      <Button
        onClick={() => navigate("/")}
        startIcon={<BiSolidChevronLeft />}
        className="login-close-btn "
      >
        Home
      </Button>
    </AuthLayOut>
  );
};

export default Login;
