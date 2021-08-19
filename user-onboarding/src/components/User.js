import React from "react";

function User(props) {
  const { details } = props;

  if (!details) {
    return <h3>Working on getting the users</h3>;
  }

  return (
    <div className="user-card container">
      <h2>{details.userName ? details.userName : details["first_name"]}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Role: {details.role}</p>
    </div>
  );
}

export default User;
