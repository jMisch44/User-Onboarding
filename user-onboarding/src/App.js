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
  TOS: false,
};

const initialFormErrors = {
  userName: "",
  email: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = false;

function App() {
  //error, formValues, and disabled aren't necessary here
  const [formValues, setFormValues] = useState(initialFormValues); //slice of state to keep track of the form changes
  const [users, setUsers] = useState(initialUsers); //slice of state for getting user data from database
  const [formError, setFormError] = useState(initialFormErrors); //slice of state to keep track of errors
  const [disabled, setDisabled] = useState(initialDisabled); //keep track of submit button with slice of state

  const getUsers = () => {
    //getting data from database and setting to users
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const postNewUser = (newUser) => {
    //posting user info to the database. resetting formvalues to be empty again
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => console.error(err));

    setFormValues(initialFormValues);
  };

  const validate = (name, value) => {
    yup //library
      .reach(schema, name) //reach into schema to compare name to the template (name = name of form values)
      .validate(value) //validate with the values being typed in compared to schema
      .then(() => setFormError({ ...formError, [name]: "" })) //setting error message blank, spread so you check all fields
      .catch((err) => setFormError({ ...formError, [name]: err.errors[0] })); //errors is a property in the error object
  };

  const formChange = (name, value) => {
    //checking if a new character is input. It's passed as prop. this gets called inside the event handler for the onChange in form. OnChange raises the event, handleChange handles the event. Inside of handleChange we call input change
    validate(name, value); //same as above
    setFormValues({ ...formValues, [name]: value }); //same as error but for formvalues
  };

  const formSubmit = () => {
    //want to account for all fields most likely. onSumbit this will all be transferred to the server, which connects to the database
    //creating the new item
    const newUser = {
      userName: formValues.userName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      TOS: true,
    };
    postNewUser(newUser); //invoking postNewUser (the post request), with the newUser as argument
  };

  useEffect(() => {
    //when app first mounts this gets called. this will only run the first time App gets mounted. the useEffect is exclusive to the component it is called in.
    getUsers(); //the  actual calling of getUsers happens here. we are calling the getUsers function that is getting all users from the for the database and setting them. only happens once
  }, []);

  useEffect(() => {
    //being run on each character input and if the value is valid then set disabled to opposite boolean
    schema.isValid(formValues).then((valid) => setDisabled(!valid)); //
  }, [formValues]); //every time formValues is changed

  //what shows on the page. map over so you can go through the array of users to display, pass details prop for userinfo. Shows components on the page
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
