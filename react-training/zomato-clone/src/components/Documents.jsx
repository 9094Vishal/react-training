import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const Documents = () => {
  const panRegex = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
  const GSTRegex =
    /\d{2}[A-Za-z]{5}\d{4}[A-Z]{1}[A-Za-z\d]{1}[Z]{1}[A-Za-z\d]{1}/;
  return (
    <div className="w-full">
      <h1 className="text-3xl">Restaurant Documents</h1>
      <Formik
        initialValues={{ panNo: "", GSTNo: "", restaurantImage: "" }}
        validationSchema={Yup.object().shape({
          panNo: Yup.string()
            .required("This field is required")
            .matches(panRegex, "Please enter valid PAN number"),
          restaurantImage: Yup.string().required("This field is required"),
          GSTNo: Yup.string()
            .required("This field is required")
            .matches(GSTRegex, "Please enter valid PAN number"),
        })}
        onSubmit={(values) => {
          const data = JSON.stringify({ documents: values });
          localStorage.setItem("complatedTap", 1);
          localStorage.setItem("registrationData", data);
          setActiveId(2);
        }}
      >
        <Form>
          <div className="py-2 bg-white rounded-lg shadow w-full">
            <div className="p-3">
              <p className="text-2xl font-semibold">Restaurant name</p>
              <p className="text-gray-400">
                Customers will see this name on Zomato
              </p>
            </div>
            <hr />
            <div className="p-3">
              <Field
                placeholder="Restaurant Image"
                name="restaurantImage"
                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                type="text"
              />
              <ErrorMessage
                component="span"
                name="restaurantImage"
                className="!text-red-500"
              />
            </div>
            <div className="p-3">
              <Field
                placeholder="PAN Number (DROPP4521G)"
                name="panNo"
                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg uppercase"
                type="text"
              />
              <ErrorMessage
                component="span"
                name="panNo"
                className="!text-red-500"
              />
            </div>
            <div className="p-3">
              <Field
                placeholder="GST number (27AAPFU0939F1ZV)"
                name="GSTNo"
                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg uppercase"
                type="text"
              />
              <ErrorMessage
                component="span"
                name="GSTNo"
                className="!text-red-500"
              />
            </div>
          </div>
          <div className="text-end pr-4">
            <button
              className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
              type="submit"
            >
              submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Documents;
