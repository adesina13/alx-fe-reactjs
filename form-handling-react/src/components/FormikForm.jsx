import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: "User registered successfully!" });
        resetForm();
      }
    } catch (error) {
      setStatus({ error: "Error registering user." });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-bold">Registration Form (Formik)</h2>

          <div>
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 w-full"
            />
            <ErrorMessage name="username" component="p" className="text-red-500" />
          </div>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full"
            />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Register
          </button>

          {status?.success && <p className="text-green-600">{status.success}</p>}
          {status?.error && <p className="text-red-600">{status.error}</p>}
        </Form>
      )}
    </Formik>
  );
}
