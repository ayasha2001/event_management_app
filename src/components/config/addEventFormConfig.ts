// Other Imports
import * as Yup from 'yup';

export const addEventFormConfig = [
  {
    type: "text",
    placeholder: "Enter event name",
    name: "event name",
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

export const addEventFormInitialValues = {
    event: '',
    date: '',
    location: '',
    description: '',
    capacity: '',
  };
  

export const addEventFormValidationSchema = Yup.object({
  event: Yup.string()
    .min(2, 'Event name is too short')
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



export const events = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-09-15T09:00:00",
      location: "New York, NY",
      description:
        "A conference to discuss the latest in technology trends and innovations.",
      capacity: 200,
    },
    {
      id: 2,
      name: "Art Expo",
      date: "2024-10-05T14:00:00",
      location: "San Francisco, CA",
      description:
        "An exhibition featuring contemporary art from around the world.",
      capacity: 150,
    },
    {
      id: 3,
      name: "Music Festival",
      date: "2024-08-25T18:00:00",
      location: "Austin, TX",
      description:
        "A festival showcasing performances by popular bands and artists.",
      capacity: 500,
    },
    {
      id: 4,
      name: "Startup Pitch Night",
      date: "2024-11-10T19:30:00",
      location: "Seattle, WA",
      description:
        "An evening where startups pitch their ideas to potential investors.",
      capacity: 100,
    },
    {
      id: 5,
      name: "Book Fair",
      date: "2024-12-01T10:00:00",
      location: "Chicago, IL",
      description:
        "A fair featuring book readings, signings, and sales from various authors.",
      capacity: 300,
    },
  ];