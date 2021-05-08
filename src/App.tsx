import React, { FC, useState, ChangeEvent } from "react";
import Canvas from "canvas/canvas";

const App: FC = () => {
  const [value, setValue] = useState("Hello world!");

  const handleCange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div>Hello world!</div>
      <Canvas text={value} />
      <textarea value={value} onChange={handleCange}></textarea>
    </div>
  );
};

export default App;
