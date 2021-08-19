import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
import schema from "./validation/FormSchema";
import axios from "axios";
import * as yup from "yup";
import User from "./components/User";

const initialFormValues = {
  userName: "",
  email: "",
  password: "",
  Terms: false,
};

const initialFormErrors = {
  userName: "",
  email: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = false;

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState(initialUsers);
  const [formError, setFormError] = useState(initialFormErrors);
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
      .then(() => setFormError({ ...formError, [name]: "" }))
      .catch((err) => setFormError({ ...formError, [name]: err.errors[0] }));
  };

  const formChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmit = () => {
    const newUser = {
      userName: formValues.userName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      Terms: formValues.Terms,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid)); //
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>Login Page</h1>
      </header>

      <Form
        values={formValues}
        submit={formSubmit}
        change={formChange}
        disabled={disabled}
        error={formError}
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
