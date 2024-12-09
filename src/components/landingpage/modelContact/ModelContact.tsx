import React, { useState } from "react";
import { Typography } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

type SetBooleanState = (value: boolean) => void;

interface ModalProps {
  isOpen: boolean;
  onClose: SetBooleanState;
}

const ModalContact = ({ isOpen, onClose }: ModalProps) => {
  const [textToCopy, setTextToCopy] = useState<any>({
    email: "info@bullscatchsecurities.com",
    mobile: "9718929008",
  });
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");
  const [disableCopyBtn, setDisableCopyBtn] = useState<boolean>(false);

  const handleCopyButton = (buttonState: boolean) => {
    if (buttonState) {
      if (!disableCopyBtn) {
        handleCopy();
        setCopyButtonText("Copied..");
        setDisableCopyBtn(true);
      }
    }
    setTimeout(() => {
      setCopyButtonText("Copy");
      setDisableCopyBtn(false);
    }, 6000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${textToCopy.email}, ${textToCopy.mobile}`
      );
    } catch (error) {
      console.error("Failed to copy text: ", error);
      alert("Failed to copy!");
    }
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a 10-digit phone number")
        .required("Mobile number is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose(false)}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Contact Us !</ModalHeader>
            <ModalBody>
              <p>
                <p>{textToCopy.email}</p>
                <p>{textToCopy.mobile}</p>
                <p>Available Mon-Fri: 9:00AM – 6:00PM</p>
              </p>
              <div>
                <Typography variant="caption">
                  We’ll call you. Request a callback, just drop
                  your phone number in the form below and hit the request.
                </Typography>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  placeholder="Mobile Number"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.mobile && Boolean(formik.errors.mobile)} // Validation check
                  errorMessage={formik.touched.mobile && formik.errors.mobile} // Display error message
                />
                <Button className="callback-btn mt-2" fullWidth type="submit">
                  Request CallBack
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => onClose(false)}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => handleCopyButton(true)}
                disabled={disableCopyBtn}
              >
                {copyButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalContact;
