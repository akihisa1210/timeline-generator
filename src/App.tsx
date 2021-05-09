import React, { FC, useState } from "react";
import Canvas from "components/Canvas";
import { TimelineState, TimelineSort, isYamlValid } from "util/timeline";
import SortButton from "components/SortButton";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

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
    isInputValid: true,
    sort: "default",
  });

  const handleCange = (newValue: string) => {
    setValue({
      ...value,
      timelineInput: newValue,
      isInputValid: isYamlValid(newValue),
    });
  };

  const handleSort = (option: TimelineSort) => {
    setValue({
      ...value,
      sort: option,
    });
  };

  return (
    <>
      <nav id="header" className="bg-gray-800">
        <div className="text-gray-100 font-logo text-3xl pl-10 py-2">
          Timeline Generator
        </div>
      </nav>
      <SortButton
        label="Default"
        clickHandler={() => handleSort("default")}
      ></SortButton>
      <SortButton
        label="start ASC"
        clickHandler={() => handleSort("start ASC")}
      ></SortButton>
      <SortButton
        label="start DESC"
        clickHandler={() => handleSort("start DESC")}
      ></SortButton>
      <SortButton
        label="end ASC"
        clickHandler={() => handleSort("end ASC")}
      ></SortButton>
      <SortButton
        label="end DESC"
        clickHandler={() => handleSort("end DESC")}
      ></SortButton>
      <div className="container w-full mx-auto">
        <div className="flex">
          <div className="w-1/2">
            <AceEditor
              mode="yaml"
              theme="github"
              value={value.timelineInput}
              onChange={handleCange}
              width="640px"
              height="640px"
              fontSize="14px"
            ></AceEditor>
          </div>
          <div className="w-1/2">
            <Canvas timelineState={value} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
