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
      <div className="left-form-container">
        <h2>Login-in Form</h2>
      </div>
      <div className="right-form-container">
        <label>
          <div className="input-label">User Name</div>
          <input
            type="text"
            value={values.userName}
            name="userName"
            onChange={onChange}
          />
        </label>
        <label>
          <div className="input-label">First Name</div>
          <input
            type="text"
            value={values["first_name"]}
            name="first_name"
            onChange={onChange}
          />
        </label>
        <label>
          <div className="input-label">Last Name</div>
          <input
            type="text"
            value={values["last_name"]}
            name="last_name"
            onChange={onChange}
          />
        </label>
        <label>
          <div className="input-label">Email</div>
          <input
            type="text"
            value={values.email}
            name="email"
            onChange={onChange}
          />
        </label>
        <label>
          <div className="input-label">Password</div>
          <input
            type="text"
            value={values.password}
            name="password"
            onChange={onChange}
          />
        </label>
        <label>
          <div className="input-label"> Role</div>
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
