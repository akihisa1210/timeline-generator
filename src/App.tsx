import React, { FC, useState, ChangeEvent } from "react";
import Canvas from "components/Canvas";

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
};

export default App;
