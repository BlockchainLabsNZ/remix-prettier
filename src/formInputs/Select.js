import React from "react";

const Select = ({value, setter, text, identifier, description, children}) => (
  <div className="list-group-item form-group">
    <label htmlFor={identifier} title={description}>
      {text}
    </label>
    <select
      className="form-control"
      id={identifier}
      value={value}
      onChange={e => setter(e.target.value)}
    >
      {children}
    </select>
  </div>
);

export default Select;
