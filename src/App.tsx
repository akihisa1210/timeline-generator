import React, { FC, useState, ChangeEvent } from "react";
import Canvas from "components/Canvas";
import yaml from "js-yaml";
import Ajv from "ajv";

const App: FC = () => {
  const [value, setValue] = useState(`- label: A
  start: 1915
  end: 1980
- label: B
  start: 1926
  end: 1984`);

  const handleCange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const ajv = new Ajv();

  const timelineItemSchema = {
    type: "object",
    properties: {
      label: { type: "string" },
      start: { type: "number" },
      end: { type: "number" },
    },
    required: ["label", "start", "end"],
    additionalProperties: false,
  };

  const timelineSchema = {
    type: "array",
    items: timelineItemSchema,
  };

  const isYamlValid = (value: string): boolean => {
    let inputYaml;
    try {
      inputYaml = yaml.load(value);
    } catch (e) {
      console.error(e);
      return false;
    }
    const validate = ajv.compile(timelineSchema);
    const valid = validate(inputYaml);
    if (!valid) {
      console.error(validate.errors);
      return false;
    }
    return true;
  };

  if (isYamlValid(value)) {
    return (
      <div>
        <div>Hello world!</div>
        <Canvas text={value} />
        <textarea
          value={value}
          onChange={handleCange}
          className="font-mono h-60 w-60"
        ></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <div>YAML is not valid</div>
        <textarea
          value={value}
          onChange={handleCange}
          className="font-mono h-60 w-60"
        ></textarea>
      </div>
    );
  }
};

export default App;
