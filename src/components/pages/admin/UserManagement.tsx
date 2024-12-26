import TableComponent from "@/components/tables/Tables";
import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Typography } from "@mui/material";
import ModelPoper from "@/components/model/Model";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [modelPopup, setModelPopup] = useState<boolean>(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };

  const handleModelPopup = () => {
    setModelPopup(!modelPopup);
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    toast.success("User added successfully");
    setModelPopup(!modelPopup);
  };

  return (
    <SiteLayOut>
      <ModelPoper open={modelPopup} handleClose={setModelPopup}>
        <Typography variant="h6" className="mb-2">
          Add user
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex gap-4 mb-3">
                <div className="flex-1">
                  <Field
                    name="firstName"
                    as={Input}
                    label="First Name"
                    placeholder="Enter First Name"
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Field
                    name="lastName"
                    as={Input}
                    label="Last Name"
                    placeholder="Enter Last Name"
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  label="Email"
                  placeholder="Enter Your Email"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <Field
                  name="role"
                  as={Select}
                  label="Role"
                  placeholder="Select Role"
                >
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </Field>
                {touched.role && errors.role && (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                )}
              </div>
              <div className="mt-4">
                <Button type="submit" className="mr-3 Btn-primary">
                  Add User
                </Button>
                <Button variant="flat" onClick={handleModelPopup}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModelPoper>

      <div className="p-4">
        <div className="flex justify-between">
          <Typography variant="h5" className="mb-4">
            Users
          </Typography>
          <Button className="h-5 mb-4 p-[1.2rem]" onClick={handleModelPopup}>
            Add User
          </Button>
        </div>
        <TableComponent />
      </div>
    </SiteLayOut>
  );
};

export default UserManagement;
