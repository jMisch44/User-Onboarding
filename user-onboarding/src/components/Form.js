export default function Form(props) {
  const { values, submit, change, disabled, error } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="whole-form-container" onSubmit={onSubmit}>
      <h2>Login-in Form</h2>
      <div className="form-inputs">
        <label>
          userName
          <input
            type="text"
            value={values.userName}
            name="userName"
            onChange={onChange}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={values["first_name"]}
            name="first_name"
            onChange={onChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={values["last_name"]}
            name="last_name"
            onChange={onChange}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={values.email}
            name="email"
            onChange={onChange}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={values.password}
            name="password"
            onChange={onChange}
          />
        </label>
        <label>
          Role
          <select>
            <option value="">--Select a Role--</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Administrator">Administrator</option>
            <option value="Staff Member">Staff Member</option>
          </select>
        </label>
        <label>
          Terms of Service
          <input
            type="checkbox"
            name="TOS"
            checked={values.TOS}
            onChange={onChange}
          />
        </label>

        <button disabled={disabled}>Submit</button>

        <div>{error.userName}</div>
        <div>{error.email}</div>
        <div>{error.password}</div>
        <div>{error.TOS}</div>
      </div>
    </form>
  );
}
