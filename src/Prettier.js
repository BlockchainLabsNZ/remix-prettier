import React, {useState, useEffect} from "react";
import NumberInput from "./formInputs/NumberInput";
import CheckBox from "./formInputs/CheckBox";
import Select from "./formInputs/Select";
import DownloadConfig from "./formInputs/DownloadConfig";
import PrettierButton from "./formInputs/PrettierButton";
import prettier from "prettier/standalone";
import prettierSolidity from "prettier-plugin-solidity";

const Prettier = ({client}) => {
  const [currentFile, setCurrentFile] = useState("");
  const [printWidth, setPrintWidth] = useState(80);
  const [tabWidth, setTabWidth] = useState(4);
  const [useTabs, setUseTabs] = useState(false);
  // const [singleQuote, setSingleQuote] = useState(false);
  const [bracketSpacing, setBracketSpacing] = useState(false);
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
  }, [client]);

  const prettify = async () => {
    const content = await client.fileManager.getFile(currentFile);
    const prettified = prettier.format(content, {
      parser: "solidity-parse",
      plugins: [prettierSolidity],
      printWidth,
      tabWidth,
      useTabs,
      bracketSpacing,
      explicitTypes,
      spacedExp
    });
    client.fileManager.setFile(currentFile, prettified);
  };

  return (
    <div className="button-container">
      <form className="form-inline">
        <ul className="list-group list-group-flush">
          <NumberInput
            value={printWidth}
            setter={setPrintWidth}
            text="--print-width"
            identifier="printWidth"
            description="The line length where Prettier will try wrap."
          />
          <NumberInput
            value={tabWidth}
            setter={setTabWidth}
            text="--tab-width"
            identifier="tabWidth"
            description="Number of spaces per indentation level."
          />
          <CheckBox
            value={useTabs}
            setter={setUseTabs}
            text="--use-tabs"
            identifier="useTabs"
            description="Indent with tabs instead of spaces."
          />
          <CheckBox
            value={bracketSpacing}
            setter={setBracketSpacing}
            text="--no-bracket-spacing"
            identifier="bracketSpacing"
            description="Do not print spaces between brackets."
            reversed={true}
          />
          <Select
            value={explicitTypes}
            setter={setExplicitTypes}
            text="--explicit-types"
            identifier="explicitTypes"
            description="Change when type aliases are used."
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
          </Select>
          <CheckBox
            value={spacedExp}
            setter={setSpacedExp}
            text="--spaced-exp"
            identifier="spacedExp"
            description="Print spaces arround '**'."
          />
          <DownloadConfig
            printWidth={printWidth}
            tabWidth={tabWidth}
            useTabs={useTabs}
            bracketSpacing={bracketSpacing}
            explicitTypes={explicitTypes}
            spacedExp={spacedExp}
          />
          <PrettierButton
            currentFileSelected={currentFile.length > 0}
            currentFile={currentFile}
            prettify={prettify}
          />
        </ul>
      </form>
    </div>
  );
};

export default Prettier;
