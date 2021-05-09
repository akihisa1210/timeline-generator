import React, { FC, useState, ChangeEvent } from "react";
import Canvas from "components/Canvas";
import yaml from "js-yaml";
import Ajv from "ajv";
import { TimelineState } from "timeline";

const App: FC = () => {
  const [value, setValue] = useState<TimelineState>({
    timelineInput: `- label: アン（スチュアート朝）
  start: 1707
  end: 1714
- label: ジョージ1世（ハノーヴァー朝）
  start: 1714
  end: 1727
- label: ジョージ2世（ハノーヴァー朝）
  start: 1727
  end: 1760
- label: ジョージ3世（ハノーヴァー朝）
  start: 1760
  end: 1820
- label: ジョージ4世（ハノーヴァー朝）
  start: 1820
  end: 1830
- label: ウィリアム4世（ハノーヴァー朝）
  start: 1830
  end: 1837
- label: ヴィクトリア（ハノーヴァー朝）
  start: 1837
  end: 1901`,
  });

  const handleCange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ timelineInput: event.target.value });
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

  if (isYamlValid(value.timelineInput)) {
    return (
      <>
        <nav id="header" className="bg-gray-800">
          <div className="text-gray-100 font-bold text-xl pl-10 py-2">
            Timeline Generator
          </div>
        </nav>
        <div className="container w-full mx-auto">
          <div className="flex">
            <div className="w-1/2">
              <textarea
                value={value.timelineInput}
                onChange={handleCange}
                className="font-mono h-full w-full"
              ></textarea>
            </div>
            <div className="w-1/2">
              <Canvas text={value.timelineInput} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex">
        <div className="w-1/2">
          <textarea
            value={value.timelineInput}
            onChange={handleCange}
            className="font-mono h-60 w-60"
          ></textarea>
        </div>
        <div className="w-1/2"></div>
      </div>
    );
  }
};

export default App;
