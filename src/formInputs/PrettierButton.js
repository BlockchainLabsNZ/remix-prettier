import React from "react";
import classNames from "classnames";
import "../prettier/style.css";

const PrettierButton = ({currentFileSelected, currentFile, prettify}) => (
  <div className="list-group-item form-group">
    <button
      title="Prettify"
      className={classNames("btn", "btn-primary", "btn-block", {
        disabled: !currentFileSelected
      })}
      onClick={event => {
        event.preventDefault();
        prettify();
      }}
      disabled={!currentFileSelected}
    >
      <span>
        <span className="icon-prettier" /> Prettify{" "}
        {currentFileSelected ? currentFile : "<no file selected>"}
      </span>
    </button>
  </div>
);

export default PrettierButton;
