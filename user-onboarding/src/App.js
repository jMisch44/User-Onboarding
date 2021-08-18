import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
import schema from "./validation/FormSchema";
import axios from "axios";
import { validate } from "@babel/types";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  TOS: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
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
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const formSubmit = () => {
    console.log(formValues);
    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      TOS: formValues.TOS,
    };
    postNewUser([...users, newUser]);
  };
  //validate inputs
  // const validate = () => {
  //   return;
  // }

  const formChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    getUsers();
  }, []);
  // disabled button changing
  // useEffect(() => {

  // }, [formValues]);

  return (
    <div className="App">
      <h1> hi </h1>
      {/* <Form values={users} submit={formSubmit} change={formChange} disabled={disabled} error={error} /> */}
    </div>
  );
}

export default App;
