import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";
let initialValues = {
  restaurantName: "",
  ownerDetails: {
    fullName: "",
    email: "",
    phone: "",
  },
  restaurantAddressDetails: {
    shop: "",
    area: "",
    city: "",
    landmark: "",
  },
};
const RestaurantInformation = () => {
  const [data, setData] = useState(initialValues);

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
      shop: Yup.string().required("This field id reaquired!"),
      area: Yup.string().required("This field id reaquired!"),
      city: Yup.string().required("This field id reaquired!"),
    }),
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.restaurantInformation) {
      setData({ ...regiData.restaurantInformation });
    }

    return () => {};
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-3xl">Restaurant information</h1>

      <Formik
        enableReinitialize={true}
        initialValues={data}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          let regiData = getRegistratonData();
          const data = { restaurantInformation: values };
          localStorage.setItem("complatedTap", 1);
          regiData = JSON.stringify({ ...regiData, ...data });
          console.log("data: ", data);
          console.log("regiData: ", regiData);
          localStorage.setItem("registrationData", regiData);

          setSubmitting(false);
          setActiveId(2);
        }}
      >
        {({ values }) => {
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
                <div className="p-3">
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
                <div className="flex p-3 gap-3">
                  <div className="flex-1">
                    <Field
                      placeholder="Shop no."
                      name="restaurantAddressDetails.shop"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="restaurantAddressDetails.shop"
                      className="!text-red-500"
                    />
                  </div>
                  <div className="flex-1">
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
                </div>
                <div className="flex p-3 gap-3">
                  <div className="flex-1">
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
                  <div className="flex-1">
                    <Field
                      placeholder="Land mark"
                      name="restaurantAddressDetails.landmark"
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name="restaurantAddressDetails.landmark"
                      className="!text-red-500"
                    />
                  </div>
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
    </div>
  );
};

export default RestaurantInformation;
