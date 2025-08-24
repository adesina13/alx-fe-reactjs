import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formik Submitted:", values);

    // Simulate API call
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => console.log("API response:", data));

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-3 max-w-md mx-auto">
        <h2 className="text-xl font-bold">Formik Form</h2>

        <Field
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
        />
        <ErrorMessage name="username" component="p" className="text-red-500" />

        <Field
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <ErrorMessage name="email" component="p" className="text-red-500" />

        <Field
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <ErrorMessage name="password" component="p" className="text-red-500" />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </Form>
    </Formik>
  );
}
