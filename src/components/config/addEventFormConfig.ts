// Other Imports
import * as Yup from 'yup';

export const addEventFormConfig = [
  {
    type: "text",
    placeholder: "Enter event name",
    name: "event",
    label: "Event Name",
  },
  {
    type: "datetime-local",
    placeholder: "Select date",
    name: "date",
    label: "Date",
  },
  {
    type: "text",
    placeholder: "Enter location",
    name: "location",
    label: "Location",
  },
  {
    type: "textarea",
    placeholder: "Enter Description",
    name: "description",
    label: "Description",
  },
  {
    type: "number",
    placeholder: "Enter Capacity",
    name: "capacity",
    label: "Capacity",
  },
];

export const addEventFormValidationSchema = Yup.object({
  event: Yup.string()
    .max(100, 'Event name is too long')
    .required('Event name is required'),

  date: Yup.date()
    .required('Date is required')
    .nullable(),

  location: Yup.string()
    .required('Location is required'),

  description: Yup.string()
    .min(10, 'Description is too short')
    .max(500, 'Description is too long')
    .required('Description is required'),

  capacity: Yup.number()
    .positive('Capacity must be a positive number')
    .integer('Capacity must be an integer')
    .required('Capacity is required'),
});
