import React from "react";
import packageInfo from "../package.json";

const PackageDetailView = () => (
  <form className="section-container package-detail-view bg-dark text-light">
    <div className="container package-container">
      <div className="row">
        <div className="package-card col-lg-8">
          <div className="body">
            <h4 className="card-name">
              <a id="package-name">{packageInfo.name}</a>
              <span className="font-weight-light pl-2" id="package-version">
                <span className="value">{packageInfo.version}</span>
              </span>
            </h4>
            <span className="package-description">
              {packageInfo.description}
            </span>
            <div className="package-message"></div>
          </div>
          <div className="meta">
            <div className="meta-user">
              <a href="https://atom.io/users/prettier">
                <img
                  className="avatar"
                  src="file:///Users/klaushottvidal/Library/Application Support/Atom/Cache/settings-view/prettier-1559992242149"
                />
              </a>
              <a className="author" href="https://atom.io/users/prettier">
                prettier
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className="link icon icon-repo repo-link">prettier/prettier-atom</p>
    <div className="btn-wrap-group">
      <button className="btn btn-sm btn-info icon icon-bug">
        Report Issue
      </button>
      <button className="btn btn-sm btn-outline-secondary icon icon-squirrel">
        CHANGELOG
      </button>
      <button className="btn btn-sm btn-default icon icon-law">LICENSE</button>
      <button className="btn btn-sm btn-default icon icon-link-external">
        View Code
      </button>
    </div>
  </form>
);

export default PackageDetailView;
