import { ErrorMessage, Field, FieldArray, Form, Formik, insert } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";

const RestaurantTiming = () => {
  const [initialValues, setInitialValue] = useState({
    timing: [
      {
        startTime: "",
        endTime: "",
      },
    ],
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.timing) {
      setInitialValue({ ...regiData.timing });
    }

    return () => {};
  }, []);

  const { setActiveId } = useContext(AddRestaurantContext);
  const formSchema = Yup.object().shape({
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
          enableReinitialize
          initialValues={{
            timing: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          }}
          onSubmit={(values) => {
            let regiData = getRegistratonData();

            let data = { ...values };
            localStorage.setItem("complatedTap", 2);

            if (regiData.timing) {
              regiData = {
                ...regiData,
                timing: [...data.timing],
              };
            } else regiData = { ...regiData, ...data };
            localStorage.setItem("registrationData", JSON.stringify(regiData));

            setActiveId(4);
          }}
          validationSchema={formSchema}
        >
          {({ values }) => (
            <Form>
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
                              <label>Start time</label>
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
                              <label>End time</label>

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

export default RestaurantTiming;
