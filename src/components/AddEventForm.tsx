// Base Imports
import React from "react";

//Other Imports
import { Formik } from "formik";
import { addEventFormConfig, addEventFormValidationSchema, addEventFormInitialValues } from "./config/addEventFormConfig";


const AddEventForm = () => {

    const handleSubmitForm = (values: any) => {
      console.log(values);
      // Add your form submission logic here
    };

  return (
    <div>
      <Formik
        initialValues={addEventFormInitialValues}
        validationSchema={addEventFormValidationSchema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
      >
        {(context) => {
          const {
            values,
            errors,
            handleSubmit,
            handleBlur,
            touched,
            handleChange,
            setFieldValue,
          }: any = context;

          return (
            <form
              onSubmit={handleSubmit}
              className="sm:my-10 w-full lg:w-[40vw] bg-white rounded-lg p-4"
            >
              {addEventFormConfig?.map((field, idx) => (
                <div key={idx} className="mb-4">
                  {field?.type === "textarea" ? (
                    <textarea
                      placeholder={field?.placeholder}
                      name={field?.name}
                      value={values[field?.name]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 overflow-y-auto rounded-sm focus:outline-none focus:border-themeRed"
                    />
                  ) : (
                    <input
                      type={field?.type}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      value={values[field?.name]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-themeRed"
                    />
                  )}
                  {errors[field?.name] && touched[field?.name] && (
                    <p className="text-sm text-themeRed">
                      {errors[field?.name]}
                    </p>
                  )}
                </div>
              ))}

              <button type="submit" className="btn-red">
                Add Event
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEventForm;
