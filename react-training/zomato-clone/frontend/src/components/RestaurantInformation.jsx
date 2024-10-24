import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";
import PopUpModel from "./PopUpModel";
import UploadImage from "./UploadImage";

const RestaurantInformation = () => {
  const [openSuccesModel, setOpenSuccessModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [data, setData] = useState({
    restaurantName: "",
    ownerDetails: {
      fullName: "",
      email: "",
      phone: "",
    },
    restaurantAddressDetails: {
      address: "",
      area: "",
      city: "",
    },
    panNo: "",
    GSTNo: "",
    restaurantImage: "",
  });

  const panRegex = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
  const GSTRegex =
    /\d{2}[A-Za-z]{5}\d{4}[A-Z]{1}[A-Za-z\d]{1}[Z]{1}[A-Za-z\d]{1}/;

  const { setActiveId } = useContext(AddRestaurantContext);
  const schema = Yup.object().shape({
    restaurantName: Yup.string().required("This field id reaquired!"),
    ownerDetails: Yup.object().shape({
      fullName: Yup.string().required("This field id reaquired!"),
      email: Yup.string().email("Invalid email address"),
      phone: Yup.string()
        .required("This field id reaquired!")
        .min(10, "Number must be 10 digits")
        .max(10, "Number must be 10 digits"),
    }),
    restaurantAddressDetails: Yup.object().shape({
      address: Yup.string().required("This field id reaquired!"),
      area: Yup.string().required("This field id reaquired!"),
      city: Yup.string().required("This field id reaquired!"),
    }),
    panNo: Yup.string()
      .required("This field is required")
      .matches(panRegex, "Please enter valid PAN number"),
    restaurantImage: Yup.mixed().required("Reastaurant image is required"),
    GSTNo: Yup.string()
      .required("This field is required")
      .matches(GSTRegex, "Please enter valid PAN number"),
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.restaurantName) {
      setData({ ...regiData });
    }

    return () => {};
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-3">Restaurant information</h1>

      <Formik
        enableReinitialize={true}
        initialValues={data}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values: ", values);
          setOpenSuccessModel(true);

          let regiData = getRegistratonData();

          const data = { ...values };
          localStorage.setItem("complatedTap", 1);
          regiData = JSON.stringify({ ...regiData, ...data });
          localStorage.setItem("registrationData", regiData);

          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, validateForm }) => {
          return (
            <Form>
              <div className="py-2 bg-white rounded-lg shadow w-full">
                <div className="p-3">
                  <p className="text-2xl font-semibold">Restaurant name</p>
                  <p className="text-gray-400">
                    Customers will see this name on Zomato
                  </p>
                </div>
                <hr />
                <div className="p-3 mb-5">
                  <label htmlFor="restaurantName" className="text-gray-400">
                    Restaurant name
                  </label>
                  <Field
                    placeholder="Restaurant name"
                    name="restaurantName"
                    className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                    type="text"
                  />
                  <ErrorMessage
                    component="span"
                    name="restaurantName"
                    className="!text-red-500"
                  />
                </div>
                <div className="text-gray-400 text-center block mb-2">
                  Restaurant Image
                </div>
                <UploadImage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  title="Hotel image"
                  props={{ name: "restaurantImage" }}
                  onChangeImage={() => setFieldValue}
                />
                <ErrorMessage
                  component="p"
                  name="restaurantImage"
                  className="!text-red-500 !text-center !block"
                />
              </div>
              <div className="py-2 bg-white rounded-lg shadow w-full mt-5">
                <div className="p-3">
                  <p className="text-2xl font-semibold">Owner details</p>
                  <p className="text-gray-400">
                    Zomato will use these details for all business
                    communications and updates
                  </p>
                </div>
                <hr />
                <div className="flex p-3 gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="ownerDetails.fullName"
                      className="text-gray-400"
                    >
                      Full name
                    </label>
                    <Field
                      placeholder="Full name"
                      name="ownerDetails.fullName"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="ownerDetails.fullName"
                      className="!text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="ownerDetails.email"
                      className="text-gray-400"
                    >
                      Email adress (optional)
                    </label>
                    <Field
                      placeholder="Email adress (optional)"
                      name="ownerDetails.email"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="ownerDetails.email"
                      className="!text-red-500"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label htmlFor="ownerDetails.phone" className="text-gray-400">
                    Phone number
                  </label>
                  <Field
                    placeholder="Phone"
                    name="ownerDetails.phone"
                    className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                    type="number"
                  />
                  <ErrorMessage
                    component="span"
                    name="ownerDetails.phone"
                    className="!text-red-500"
                  />
                </div>
              </div>
              <div className="py-2 bg-white rounded-lg shadow w-full mt-5">
                <div className="p-3">
                  <p className="text-2xl font-semibold">
                    Restaurant address details
                  </p>
                  <p className="text-gray-400">
                    Address details are basis the restaurant location mentioned
                    above
                  </p>
                </div>
                <hr />
                <div className=" p-3 gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="restaurantAddressDetails.address"
                      className="text-gray-400"
                    >
                      Address
                    </label>
                    <Field
                      placeholder="Address"
                      name="restaurantAddressDetails.address"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="restaurantAddressDetails.address"
                      className="!text-red-500"
                    />
                  </div>
                </div>
                <div className="flex p-3 gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="restaurantAddressDetails.area"
                      className="text-gray-400"
                    >
                      Area
                    </label>
                    <Field
                      placeholder="Area"
                      name="restaurantAddressDetails.area"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="restaurantAddressDetails.area"
                      className="!text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="restaurantAddressDetails.city"
                      className="text-gray-400"
                    >
                      City
                    </label>
                    <Field
                      placeholder="City"
                      name="restaurantAddressDetails.city"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="restaurantAddressDetails.city"
                      className="!text-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="py-2 bg-white rounded-lg shadow w-full mt-5">
                <div className="p-3">
                  <p className="text-2xl font-semibold">
                    Restaurant information
                  </p>
                  <p className="text-gray-400">This data will used for GST</p>
                </div>
                <hr />

                <div className="p-3">
                  <label htmlFor="panNo" className="text-gray-400">
                    Pan Number(AAPFU0939F)
                  </label>
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
                  <label htmlFor="GSTNo" className="text-gray-400">
                    GST number (27AAPFU0939F1ZV)
                  </label>
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
          );
        }}
      </Formik>
      {openSuccesModel && (
        <PopUpModel
          msg={"Resturant data sucessfully added.."}
          setModel={setOpenSuccessModel}
          title={"Success"}
          redirect={"/"}
          type={"success"}
        />
      )}
    </div>
  );
};

export default RestaurantInformation;
