import React, { FC } from "react";
import sketch from "sketch/circle";
import Canvas from "canvas/canvas";

const App: FC = () => (
  <div>
    <div>Hello world!</div>
    <Canvas sketch={sketch} />
    <textarea></textarea>
  </div>
);

export default App;
