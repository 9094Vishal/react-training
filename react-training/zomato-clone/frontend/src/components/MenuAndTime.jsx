import { v4 as uuidv4 } from "uuid";
import { ErrorMessage, Field, FieldArray, Form, Formik, insert } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";
import { Flex, Switch } from "antd";

const MenuAndTime = () => {
  const [initialValues, setInitialValue] = useState({
    menuItem: [
      {
        foodCategory: "",
        title: "",
        isActive: true,
        price: "",
        image: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.menuItem) {
      setInitialValue({ menuItem: [...regiData.menuItem] });
    }

    return () => {};
  }, []);
  const category = {
    gujarati: "1",
    panjabi: "2",
    chiniess: "3",
  };

  const { setActiveId } = useContext(AddRestaurantContext);
  const formSchema = Yup.object().shape({
    menuItem: Yup.array().of(
      Yup.object().shape({
        foodCategory: Yup.string().required("This field is required"),
        title: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required"),
        price: Yup.string().required("This field is required"),
        image: Yup.string().required("This field is required"),
      })
    ),
  });
  return (
    <div className="w-full">
      <h1 className="text-3xl">Restaurant Menu & timing</h1>
      <div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            let regiData = getRegistratonData();
            let data = { ...values };

            localStorage.setItem("complatedTap", 2);

            if (regiData?.menuItem) {
              regiData = {
                ...regiData,

                menuItem: [...data.menuItem],
              };
            } else regiData = { ...regiData, ...data };
            localStorage.setItem("registrationData", JSON.stringify(regiData));

            setActiveId(3);
          }}
          validationSchema={formSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <FieldArray name="menuItem">
                {({ insert, remove, push }) => (
                  <>
                    {values.menuItem.length > 0 &&
                      values.menuItem.map((item, index) => {
                        return (
                          <div
                            className="bg-white p-3 rounded-xl shadow my-3"
                            key={index}
                          >
                            {" "}
                            <Flex justify="space-between">
                              <div
                                role="group"
                                aria-labelledby="checkbox-group"
                                className="flex items-center gap-2"
                              >
                                <label>
                                  <Field
                                    type="radio"
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.panjabi}
                                  />{" "}
                                  Panjabi
                                </label>
                                <label className="">
                                  <Field
                                    type="radio"
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.gujarati}
                                  />{" "}
                                  Gujarati
                                </label>
                                <label>
                                  <Field
                                    type="radio"
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.chiniess}
                                  />{" "}
                                  Chiniess
                                </label>
                              </div>

                              <label
                                role="group"
                                aria-labelledby="checkbox-group"
                              >
                                <Field
                                  type="checkbox"
                                  name={`menuItem.${index}.isActive`}
                                />{" "}
                                Available
                              </label>
                            </Flex>
                            <ErrorMessage
                              component="p"
                              name={`menuItem.${index}.foodCategory`}
                              className="!text-red-500"
                            />
                            <div className="flex my-3 gap-3">
                              <div className="flex-1">
                                <Field
                                  placeholder="Item name"
                                  name={`menuItem.${index}.title`}
                                  className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                  type="text"
                                />
                                <ErrorMessage
                                  component="span"
                                  name={`menuItem.${index}.title`}
                                  className="!text-red-500"
                                />
                              </div>
                              <div className="flex-1">
                                <Field
                                  placeholder="Price"
                                  name={`menuItem.${index}.price`}
                                  className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                  type="number"
                                />
                                <ErrorMessage
                                  component="span"
                                  name={`menuItem.${index}.price`}
                                  className="!text-red-500"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Field
                                placeholder="Image url"
                                name={`menuItem.${index}.image`}
                                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                type="text"
                              />
                              <ErrorMessage
                                component="span"
                                name={`menuItem.${index}.image`}
                                className="!text-red-500"
                              />
                            </div>
                            <div className="flex-1 mt-3">
                              <Field
                                placeholder="Description"
                                name={`menuItem.${index}.description`}
                                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                as="textarea"
                              />
                              <ErrorMessage
                                component="span"
                                name={`menuItem.${index}.description`}
                                className="!text-red-500"
                              />
                            </div>
                            <button
                              type="button"
                              className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    <button
                      type="button"
                      className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                      onClick={() => {
                        push({
                          foodCategory: [],
                          title: "",
                          isActive: ``,
                          id: uuidv4(),
                          price: "",
                          description: "",
                        });
                      }}
                    >
                      Add to menu
                    </button>
                  </>
                )}
              </FieldArray>

              <div className="text-end pr-4">
                <button
                  className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MenuAndTime;
