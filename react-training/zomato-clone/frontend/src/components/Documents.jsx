import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  getLoginUser,
  getRegistratonData,
  setReaturantDataToMainList,
} from "../helper/helper";
import PopUpModel from "./PopUpModel";

const Documents = () => {
  const [initialValues, setInitialValue] = useState({
    panNo: "",
    GSTNo: "",
    restaurantImage: "",
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.documents) {
      setInitialValue({ ...regiData.documents });
    }

    return () => {};
  }, []);
  const [openSuccesModel, setOpenSuccessModel] = useState(false);
  const panRegex = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
  const GSTRegex =
    /\d{2}[A-Za-z]{5}\d{4}[A-Z]{1}[A-Za-z\d]{1}[Z]{1}[A-Za-z\d]{1}/;
  return (
    <div className="w-full">
      <h1 className="text-3xl mb-3">Restaurant Documents</h1>
      <Formik
        enableReinitialize
        initialValues={initialValues}
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
          let regiData = getRegistratonData();

          let data = { documents: values };
          localStorage.setItem("complatedTap", 2);

          if (regiData.documents) {
            regiData = {
              ...regiData,
              ...data,
            };
          } else regiData = { ...regiData, ...data };
          setOpenSuccessModel(true);
          localStorage.setItem("registrationData", JSON.stringify(regiData));
          setReaturantDataToMainList(regiData);
          setLoginData(getLoginUser());
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
              <ErrorMessage name="panNo" className="!text-red-500" />
            </div>
            <div className="p-3">
              <Field
                placeholder="Pan number (AAPFU0939F)"
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
      {openSuccesModel && (
        <PopUpModel
          msg={"Resturant data sucessfully added.."}
          setModel={setOpenSuccessModel}
          title={"Success"}
          redirect={"/"}
        />
      )}
    </div>
  );
};

export default Documents;
