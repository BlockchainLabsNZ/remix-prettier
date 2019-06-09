import React, { useState, useEffect } from "react";
import { Hook, Console, Decode } from "console-feed";
import { createIframeClient, remixApi, AppManagerApi } from "remix-plugin";
import Header from "./Header";
import PackageDetailView from "./PackageDetailView";

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    Hook(window.console, log => {
      setLogs(logs => [...logs, Decode(log)]);
    });
  }, []);

  useEffect(() => {
    const devMode = { port: 8080 };
    let client = createIframeClient({ customApi: remixApi, devMode });

    client.onload(() => {
      console.log(client);
      console.log(AppManagerApi);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="panels-item">
        <section className="section">
          <PackageDetailView />
        </section>
        <section className="section settings-panel">
          <div className="section-container">
            <div className="block section-heading icon icon-gear">Settings</div>
            <div className="section-body">
              <div className="control-group">
                <div className="controls">
                  <div className="checkbox">
                    <label>
                      <input
                        id="prettier-atom.useEslint"
                        type="checkbox"
                        className="input-checkbox"
                        data-original-title=""
                        title=""
                      />
                      <div className="setting-title">ESLint Integration</div>
                    </label>
                    <div className="setting-description">
                      Use
                      <a href="https://github.com/prettier/prettier-eslint">
                        prettier-eslint
                      </a>
                      to infer your Prettier settings based on your ESLint
                      config and run eslint --fix after prettier formats the
                      document. If we cannot infer a Prettier setting from your
                      ESLint config (or if there is none in the current
                      project), we will fallback to using your settings in the
                      <em>Prettier Options</em> section.
                      <br />
                      <br />
                      <strong>Note:</strong>
                      If you enable <em>Format on Save</em>, we recommend
                      disabling ESlint's auto-fix to prevent fixing your code
                      twice.
                    </div>
                  </div>
                </div>
              </div>
              <div className="control-group">
                <div className="controls">
                  <div className="checkbox">
                    <label>
                      <input
                        id="prettier-atom.useStylelint"
                        type="checkbox"
                        className="input-checkbox"
                        data-original-title=""
                        title=""
                      />
                      <div className="setting-title">Stylelint Integration</div>
                    </label>
                    <div className="setting-description">
                      Use
                      <a href="https://github.com/hugomrdias/prettier-stylelint">
                        prettier-stylelint
                      </a>
                      to infer your Prettier settings based on your Stylelint
                      config. If we cannot infer a Prettier setting from your
                      Stylelint config (or if there is none in the current
                      project), we will fallback to using your settings in the
                      <em>Prettier Options</em> section.
                    </div>
                  </div>
                </div>
              </div>
              <div className="control-group">
                <div className="controls">
                  <section className="sub-section">
                    <h3 className="sub-section-heading has-items">
                      Format on Save
                    </h3>
                    <div className="setting-description"></div>
                    <div className="sub-section-body">
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.enabled"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Format Files on Save
                              </div>
                            </label>
                            <div className="setting-description">
                              Automatically format entire file when saving.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.respectEslintignore"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Ignore Files in `.eslintignore`
                              </div>
                            </label>
                            <div className="setting-description">
                              Works regardless of whether
                              <em>ESLint Integration</em> is enabled or not.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.showInStatusBar"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Show in Status Bar
                              </div>
                            </label>
                            <div className="setting-description">
                              Show in status bar if <em>Format on Save</em> is
                              enabled or not.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <label className="control-label">
                            <div className="setting-title">
                              Exclude (list of globs)
                            </div>
                            <div className="setting-description">
                              A list of
                              <a href="https://git-scm.com/docs/gitignore">
                                .gitignore style
                              </a>
                              file globs to exclude from formatting on save
                              (takes precedence over scopes). Use commas to
                              separate each glob.
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <label className="control-label">
                            <div className="setting-title">
                              Include (list of globs)
                            </div>
                            <div className="setting-description">
                              A list of
                              <a href="https://git-scm.com/docs/gitignore">
                                .gitignore style
                              </a>
                              file globs to always format on save (takes
                              precedence over scopes and excluded globs). Use
                              commas to separate each glob.
                              <br />
                              <br />
                              <strong>Note:</strong>
                              If there are globs in this list, files not
                              matching the globs will not be formatted on save,
                              regardless of other options.
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.isDisabledIfNotInPackageJson"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Only format if Prettier is found in your
                                project's dependencies
                              </div>
                            </label>
                            <div className="setting-description">
                              Only format on save when <code>prettier</code> (or
                              <code>prettier-eslint</code>/
                              <code>prettier-eslint-cli</code>
                              if using <em>ESLint integration</em>) is in your
                              project's <code>package.json</code> (dependencies
                              or devDependencies)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.isDisabledIfNoConfigFile"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Only format if a Prettier config is found
                              </div>
                            </label>
                            <div className="setting-description">
                              Only format on save if we find a
                              <code>.prettierrc</code> file (written in YAML or
                              JSON), a <code>prettier.config.js</code> file that
                              exports an object, or a 'prettier' key in your
                              <code>package.json</code> file.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.formatOnSaveOptions.ignoreNodeModules"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Ignore Files in `node_modules`
                              </div>
                            </label>
                            <div className="setting-description">
                              Ignores Files in <code>node_modules</code> from
                              format on save.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="control-group">
                <div className="controls">
                  <section className="sub-section">
                    <h3 className="sub-section-heading has-items">
                      prettier-eslint options
                    </h3>
                    <div className="setting-description"></div>
                    <div className="sub-section-body">
                      <div className="control-group">
                        <div className="controls">
                          <div className="checkbox">
                            <label>
                              <input
                                id="prettier-atom.prettierEslintOptions.prettierLast"
                                type="checkbox"
                                className="input-checkbox"
                                data-original-title=""
                                title=""
                              />
                              <div className="setting-title">
                                Run Prettier Last
                              </div>
                            </label>
                            <div className="setting-description">
                              Run <code>eslint =&gt; prettier</code> instead of
                              <code>prettier =&gt; eslint</code>.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="section-heading icon icon-keyboard">Keybindings</div>
          <div className="checkbox">
            <label>
              <input
                id="toggleKeybindings"
                className="input-checkbox"
                type="checkbox"
              />
              <div className="setting-title">Enable</div>
            </label>
            <div className="setting-description">
              Disable this if you want to bind your own keystrokes for this
              package's commands in your keymap.
            </div>
          </div>
          <table
            className="package-keymap-table table native-key-bindings text"
            tabindex="-1"
          >
            <thead>
              <tr>
                <th>Keystroke</th>
                <th>Command</th>
                <th>Selector</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-selector="atom-text-editor"
                data-keystrokes="ctrl-alt-f"
                data-command="prettier:format"
              >
                <td>
                  <span className="icon icon-clippy copy-icon"></span>
                  <span>ctrl-alt-f</span>
                </td>
                <td>prettier:format</td>
                <td>atom-text-editor</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <div style={{ backgroundColor: "#242424" }}>
        <Console logs={logs} variant="dark" />
      </div>
    </>
  );
};

export default App;
