import React, {useState, useEffect} from "react";
import classNames from "classnames";
import {createIframeClient, remixApi} from "remix-plugin";
import "./prettier/style.css";
import prettier from "prettier/standalone";
import prettierSolidity from "prettier-plugin-solidity";
// import Header from "./Header";
import PackageDetailView from "./PackageDetailView";

const client = createIframeClient({
  customApi: remixApi,
  devMode: {port: 8080}
});

const App = () => {
  const [currentFile, setCurrentFile] = useState("");
  const [printWidth, setPrintWidth] = useState(80);
  const [tabWidth, setTabWidth] = useState(4);
  const [useTabs, setUseTabs] = useState(false);
  const [singleQuote, setSingleQuote] = useState(false);
  const [explicitTypes, setExplicitTypes] = useState("always");
  const [spacedExp, setSpacedExp] = useState(false);

  useEffect(() => {
    const subscribeToCurrentFile = async () => {
      await client.onload(() => {
        client.fileManager.on("currentFileChanged", fileName =>
          setCurrentFile(fileName)
        );
      });
    };
    subscribeToCurrentFile();
  }, []);

  const onClick = async () => {
    const content = await client.call("fileManager", "getFile", currentFile);
    const prettified = prettier.format(content, {
      parser: "solidity-parse",
      plugins: [prettierSolidity],
      printWidth,
      tabWidth,
      useTabs,
      singleQuote,
      explicitTypes,
      spacedExp
    });
    client.fileManager.setFile(currentFile, prettified);
  };

  return (
    <div className="panels-item">
      <section className="section">
        <PackageDetailView />
      </section>
      <section className="section settings-panel p-2">
        <div className="button-container">
          <form className="form-inline">
            <ul className="list-group list-group-flush">
              <div className="list-group-item form-group">
                <label
                  className="mr-1"
                  htmlFor="printWidth"
                  title="The line length where Prettier will try wrap."
                >
                  --print-width
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="printWidth"
                  value={printWidth}
                  onChange={e => setPrintWidth(parseInt(e.target.value))}
                />
              </div>
              <div className="list-group-item form-group">
                <label
                  className="mr-1"
                  htmlFor="tabWidth"
                  title="Number of spaces per indentation level."
                >
                  --tab-width
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="tabWidth"
                  value={tabWidth}
                  onChange={e => setTabWidth(parseInt(e.target.value))}
                />
              </div>
              <div className="list-group-item form-group">
                <div className="checkbox">
                  <label
                    className="form-check-label"
                    title="Indent with tabs instead of spaces."
                  >
                    <input
                      type="checkbox"
                      id="useTabs"
                      className="form-check-input"
                      checked={useTabs}
                      onChange={() => setUseTabs(!useTabs)}
                    />
                    --use-tabs
                  </label>
                </div>
              </div>
              <div className="list-group-item form-group">
                <div className="checkbox">
                  <label
                    className="form-check-label"
                    title="Use single quotes instead of double quotes."
                  >
                    <input
                      type="checkbox"
                      id="singleQuote"
                      className="form-check-input"
                      checked={singleQuote}
                      onChange={() => setSingleQuote(!singleQuote)}
                    />
                    --single-quote
                  </label>
                </div>
              </div>
              <div className="list-group-item form-group">
                <label
                  for="explicitTypes"
                  title="Change when type aliases are used."
                >
                  --explicit-types
                </label>
                <select
                  class="form-control"
                  id="explicitTypes"
                  value={explicitTypes}
                  onChange={e => setExplicitTypes(e.target.value)}
                >
                  <option
                    value="always"
                    title="Prefer the explicit types `uint256`, `int256`, and `bytes1`."
                  >
                    Always
                  </option>
                  <option
                    value="never"
                    title="Prefer the type aliases `uint`, `int`, and `byte`."
                  >
                    Never
                  </option>
                  <option
                    value="preserve"
                    title="Respect the type used by the developer."
                  >
                    Preserve
                  </option>
                </select>
              </div>
              <div className="list-group-item form-group">
                <div className="checkbox">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      id="spacedExp"
                      className="form-check-input"
                      checked={spacedExp}
                      onChange={() => setSpacedExp(!spacedExp)}
                    />
                    --spaced-exp
                  </label>
                </div>
              </div>
              <div className="list-group-item form-group">
                <button
                  title="Prettify"
                  className={classNames("btn", "btn-primary", "btn-block", {
                    disabled: currentFile.length === 0
                  })}
                  onClick={event => {
                    event.preventDefault();
                    onClick();
                  }}
                  disabled={currentFile.length === 0}
                >
                  <span>
                    <span className="icon-prettier" /> Prettify{" "}
                    {currentFile.length ? currentFile : "<no file selected>"}
                  </span>
                </button>
              </div>
            </ul>
          </form>
        </div>
      </section>
    </div>
  );
};

export default App;
