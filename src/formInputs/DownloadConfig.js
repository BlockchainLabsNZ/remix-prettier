import React from "react";
import prettier from "prettier/standalone";
import prettierJavascript from "prettier/parser-babylon";

const DownloadConfig = ({
  printWidth,
  tabWidth,
  useTabs,
  bracketSpacing,
  explicitTypes,
  spacedExp
}) => (
  <div className="list-group-item form-group">
    <a
      title="To use in your projects."
      className="btn btn-primary btn-block"
      href={URL.createObjectURL(
        new Blob(
          [
            prettier.format(
              `// https://prettier.io/docs/en/configuration.html
  module.exports = {
  // Global configuration
  printWidth: ${JSON.stringify(printWidth)},
  tabWidth: ${JSON.stringify(tabWidth)},
  useTabs: ${JSON.stringify(useTabs)},
  // Common configuration
  bracketSpacing: ${JSON.stringify(bracketSpacing)},
  // Solidity configuration
  explicitTypes: ${JSON.stringify(explicitTypes)},
  spacedExp: ${JSON.stringify(spacedExp)}
  }`,
              {parser: "babel", plugins: [prettierJavascript]}
            )
          ],
          {
            type: "application/javascript"
          }
        )
      )}
      download="prettier.config.js"
    >
      <span>Download configuration</span>
    </a>
  </div>
);

export default DownloadConfig;
