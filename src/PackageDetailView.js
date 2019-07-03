import React from "react";
import packageInfo from "../package.json";

const PackageDetailView = () => (
  <>
    <div className="jumbotron">
      <h1 className="h6">
        {packageInfo.name} <small>{packageInfo.version}</small>
      </h1>
      <p className="lead small">{packageInfo.description}</p>
      <hr className="my-4" />
      <a
        className="btn btn-primary btn-lg"
        href={packageInfo.bugs.url}
        target="_blank"
        role="button"
      >
        Issues
      </a>
    </div>
    <form className="section-container package-detail-view bg-dark text-light">
      <div className="container package-container">
        <div className="row">
          <div className="package-card col-lg-8">
            <div className="meta">
              <div className="meta-user">
                <a href="https://atom.io/users/prettier">
                  <img className="avatar" src="/logo.png" alt="logo" />
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
        <button className="btn btn-sm btn-default icon icon-law">
          LICENSE
        </button>
        <button className="btn btn-sm btn-default icon icon-link-external">
          View Code
        </button>
      </div>
    </form>
  </>
);

export default PackageDetailView;
