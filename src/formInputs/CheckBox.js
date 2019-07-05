import React from "react";

const CheckBox = ({
  value,
  setter,
  text,
  identifier,
  description,
  reversed = false
}) => (
  <div className="list-group-item form-group">
    <div className="checkbox">
      <label className="form-check-label" title={description}>
        <input
          type="checkbox"
          id={identifier}
          className="form-check-input"
          checked={reversed ? !value : value}
          onChange={() => setter(!value)}
        />
        {text}
      </label>
    </div>
  </div>
);

export default CheckBox;
