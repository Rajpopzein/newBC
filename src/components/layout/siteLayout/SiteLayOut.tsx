import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { RxAvatar } from "react-icons/rx";
import logo from "../../../assets/Bulls-catch-logo.png";
// import Footer from "@/components/landingpage/Footer";
import SiteNavbar from "./siteNavbar/SiteNavbar";
import { IoMenu } from "react-icons/io5";

interface siteinterFace {
  children: React.ReactNode;
}

const SiteLayOut = ({ children }: siteinterFace) => {
  return (
    <div className="flex flex-col main-staticLayout">
      <Navbar position="static" className="site-navbar">
        <NavbarBrand >
          <IoMenu className="text-2xl mr-[5%]"/>
          {/* <AcmeLogo /> */}
          <img src={logo} alt="Logo" width={70} />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <RxAvatar />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex">
        <SiteNavbar />
        <section className="body-site flex-1 h-[100vh] overflow-y-scroll">{children}</section>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default SiteLayOut;
