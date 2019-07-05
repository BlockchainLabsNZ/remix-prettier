import React from "react";

const NumberInput = ({value, setter, text, identifier, description}) => (
  <div className="list-group-item form-group">
    <label className="mr-1" htmlFor={identifier} title={description}>
      {text}
    </label>
    <input
      type="number"
      className="form-control"
      id={identifier}
      value={value}
      onChange={e => setter(parseInt(e.target.value))}
    />
  </div>
);

export default NumberInput;
