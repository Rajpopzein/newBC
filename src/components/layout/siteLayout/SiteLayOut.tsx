import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { RxAvatar } from "react-icons/rx";
import logo from "../../../assets/Bulls-catch-logo-transparent.png";
import Footer from "@/components/landingpage/Footer";

interface siteinterFace {
  children: React.ReactNode;
}

const SiteLayOut = ({ children }: siteinterFace) => {
  return (
    <div >
      <Navbar position="static">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <img src={logo} alt="Logo" width={60} />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <RxAvatar />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <section className="body-site">{children}</section>
      <Footer/>
    </div>
  );
};

export default SiteLayOut;
