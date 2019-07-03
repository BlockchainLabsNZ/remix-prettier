import React from "react";
import packageInfo from "../package.json";
// import packagePrettierInfo from "../node_modules/prettier-plugin-solidity/package.json";
// import packageRemixInfo from "../node_modules/remix-plugin/package.json";

const PackageDetailView = () => (
  <div className="jumbotron py-3 mb-0">
    <h1 className="h5">
      {packageInfo.name} <small>{packageInfo.version}</small>
    </h1>
    <p className="lead small">{packageInfo.description}</p>
    {
      //<hr className="my-4" />
      // <h2 className="h6">Dependencies</h2>
      // <h3 className="h6">
      //   {packagePrettierInfo.name} <small>{packagePrettierInfo.version}</small>
      // </h3>
      // <h3 className="h6">
      //   {packageRemixInfo.name} <small>{packageRemixInfo.version}</small>
      // </h3>
    }
  </div>
);

export default PackageDetailView;
