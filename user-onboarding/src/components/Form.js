export default function Form(props) {
  const { values, submit, change, disabled, error } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Login-in Form</h2>
      <label>
        Name
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="please type your name"
          onChange={onChange}
        />
      </label>
      <div>{error.name}</div>
      <label>
        Email
        <input
          type="text"
          value={values.email}
          name="email"
          placeholder="please type your email"
          onChange={onChange}
        />
      </label>
      <div>{error.email}</div>
      <label>
        Password
        <input
          type="text"
          value={values.password}
          name="password"
          placeholder="please type your password"
          onChange={onChange}
        />
      </label>
      <div>{error.password}</div>
      <label>
        Terms of Service
        <input
          type="checkbox"
          name="TOS"
          checked={values.terms}
          onChange={onChange}
        />
      </label>
      <div>{error.TOS}</div>
      <button disabled={disabled}>Submit</button>
    </form>
  );
}
