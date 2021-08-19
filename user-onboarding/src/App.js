import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
import schema from "./validation/FormSchema";
import axios from "axios";
import * as yup from "yup";
import User from "./components/User";

const initialFormValues = {
  userName: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
  TOS: false,
};

const initialFormErrors = {
  userName: "",
  email: "",
  password: "",
  role: "",
};
const initialUsers = [];
const initialDisabled = false;

// values, submit, change, disabled, error

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => console.error(err));

    setFormValues(initialFormValues);
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setError({ ...error, [name]: "" }))
      .catch((err) => setError({ ...error, [name]: err.errors[0] }));
  };

  const formChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmit = () => {
    const newUser = {
      userName: formValues.userName.trim(),
      first_name: formValues["first_name"].trim(),
      last_name: formValues["last_name"].trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
      TOS: formValues.TOS,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>Login Page</h1>
      </header>

      <Form
        values={users}
        submit={formSubmit}
        change={formChange}
        disabled={disabled}
        error={error}
      />
      <div className="mapped-users">
        {users.map((user) => {
          return <User key={user.id} details={user} />;
        })}
      </div>
    </div>
  );
}

export default App;
