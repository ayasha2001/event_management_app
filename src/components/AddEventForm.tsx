// Base Imports
import React, { useState } from "react";

// Package Imports
import axios from "axios";
import { Formik, Field } from "formik";

// Component Imports
import LoadingDots from "../utility/LoadingDots/LoadingDots";

//Other Imports
import {
  addEventFormConfig,
  addEventFormValidationSchema,
} from "./config/addEventFormConfig";
import { FB_BASE_URL, FB_UPDATE_URL } from "../utility/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../store/eventSlice";
import { ADD_EVENT_TITLE_TEXT } from "../utility/textVariables";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  textEditorFormats,
  textEditorModules,
} from "./config/textEditorConfig";

const addEventFormInitialValues = {
  event: "",
  date: "",
  location: "",
  description: "",
  capacity: "",
};

const AddEventForm = ({ fetchEvents }: any) => {
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state: any) => state.events);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    try {
      let response;
      const url = selectedEvent
        ? `${FB_UPDATE_URL}/${selectedEvent?.id}.json` // URL for updating an existing event
        : FB_BASE_URL; // URL for creating a new event

      const method = selectedEvent ? "PUT" : "POST";

      response = await axios({
        method,
        url,
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setSelectedEvent(null));
      resetForm(); // Clears the form
      fetchEvents();
    } catch (error) {
      console.error(
        `${selectedEvent ? "Error updating event" : "Error adding event"}:`,
        error
      );
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={selectedEvent || addEventFormInitialValues}
        validationSchema={addEventFormValidationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
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
      
          const handleEditorChange = (content: string, name: string) => {
            setFieldValue(name, content);
          };

          return (
            <form
              onSubmit={handleSubmit}
              className="sm:my-10 w-full lg:w-[40vw] bg-white rounded-lg p-4 border-gray-500 shadow-md"
            >
              <h2 className="font-bold text-xl text-center uppercase my-4">
                {ADD_EVENT_TITLE_TEXT}
              </h2>
              {addEventFormConfig?.map((field, idx) => (
                <div key={idx} className="mb-4">
                  {field?.type === "textarea" ? (
                    <ReactQuill
                      theme="snow"
                      placeholder={field?.placeholder}
                      onChange={(content) =>
                        handleEditorChange(content, field?.name || "")
                      }
                      value={values[field?.name]}
                      modules={textEditorModules}
                      formats={textEditorFormats}
                      className="w-full px-3 py-2 border border-gray-300 overflow-y-auto rounded-sm focus:outline-none focus:border-[1px]"
                    />
                  ) : (
                    <input
                      type={field?.type}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      value={values[field?.name]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[1px]"
                    />
                  )}
                  {errors[field?.name] && touched[field?.name] && (
                    <p className="text-sm text-red-900">
                      {errors[field?.name]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting} // Disable button during submission
                className={`w-full rounded h-10 uppercase font-bold my-4 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-300 hover:opacity-85"
                }`}
              >
                {isSubmitting ? <LoadingDots /> : "Add Event"}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEventForm;
