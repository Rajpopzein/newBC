import logo from "./../../assets/Bulls-catch-logo.png";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
// type Props = {}

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="footermain">
      <div className="header flex">
        <div>
          <div className="h-[30%] w-[10%]">
            <img src={logo} alt="logo" className="logoimage" />
          </div>
          <div className="w-[29%] mt-6 ml-2 para-footer">
            <Typography variant="subtitle2">
              BullsCatch engages in facilitating beginners and traders to access
              stock market professional trading desk and to explore different
              stock markets of the world. At BullsCatch mainly professionals
              explores Indian stock market, US and European equity markets.
            </Typography>
          </div>
        </div>
        <div className="w-[10%] mt-3">
          <ul className="list">
            <li onClick={()=>navigate("/")}>Home</li>
            <li onClick={()=>navigate("/gallery")}>Gallary</li>
            {/* <li>Contact us</li> */}
          </ul>
        </div>
      </div>
      <div className="foot flex justify-between mt-4">
        <div className="flex ml-2  gap-5 footer-tearms">
          <Typography>Tearms&Condition</Typography>
          <Typography>Privacy Policy</Typography>
        </div>
        <div className="flex gap-5 footer-icon-color">
          <FaFacebookSquare />
          <FaSquareTwitter />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default Footer;
