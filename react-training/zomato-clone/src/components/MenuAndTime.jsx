import { ErrorMessage, Field, FieldArray, Form, Formik, insert } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";

const MenuAndTime = () => {
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
    timing: Yup.array().of(
      Yup.object().shape({
        startTime: Yup.string().required("This field is required!"),
        endTime: Yup.string().required("This field is required"),
      })
    ),
  });
  return (
    <div className="w-full">
      <h1 className="text-3xl">Restaurant Menu & timing</h1>
      <div>
        <Formik
          initialValues={{
            timing: [
              {
                startTime: "",
                endTime: "",
              },
            ],
            menuItem: [
              {
                foodCategory: "",
                title: "",
                price: "",
                image: "",
                description: "",
              },
            ],
          }}
          onSubmit={(values) => {
            let regiData = getRegistratonData();
            let data = { ...values };
            localStorage.setItem("complatedTap", 2);
            console.log("data: ", data);
            if (regiData.menuInformation.menuItem) {
              regiData.menuInformation.menuItem = [
                ...regiData.menuInformation.menuItem,
                ...data.menuItem,
              ];
            } else regiData = { ...regiData, ...data.menuItem };
            localStorage.setItem("registrationData", JSON.stringify(regiData));

            // setActiveId(3);
          }}
          validationSchema={formSchema}
        >
          {({ values }) => (
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
                            <div
                              role="group"
                              aria-labelledby="checkbox-group"
                              className="flex items-center gap-2"
                            >
                              <label>
                                <Field
                                  type="radio"
                                  name={`menuItem.${index}.foodCategory`}
                                  value="panjabi"
                                />{" "}
                                Panjabi
                              </label>
                              <label className="">
                                <Field
                                  type="radio"
                                  name={`menuItem.${index}.foodCategory`}
                                  value="gujarati"
                                />{" "}
                                Gujarati
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name={`menuItem.${index}.foodCategory`}
                                  value="chiniess"
                                />{" "}
                                Chiniess
                              </label>
                            </div>
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
                        console.log(values);

                        push({
                          foodCategory: [],
                          title: "",
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
              <hr className="mt-3" />
              <FieldArray name="timing">
                {({ remove, push }) => (
                  <>
                    <p>Add you timing</p>
                    {values.timing.length > 0 &&
                      values.timing.map((item, index) => (
                        <div
                          className="bg-white p-3 rounded-xl shadow my-3"
                          key={index}
                        >
                          <div className="flex my-3 gap-3">
                            <div className="flex-1">
                              <Field
                                name={`timing.${index}.startTime`}
                                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                type="time"
                              />
                              <ErrorMessage
                                component="span"
                                name={`timing.${index}.startTime`}
                                className="!text-red-500"
                              />
                            </div>
                            <div className="flex-1">
                              <Field
                                name={`timing.${index}.endTime`}
                                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                type="time"
                              />
                              <ErrorMessage
                                component="span"
                                name={`timing.${index}.endTime`}
                                className="!text-red-500"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                      onClick={() => {
                        console.log(values);

                        push({
                          startTime: "",
                          endTime: "",
                        });
                      }}
                    >
                      Add time
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
