import React, { FC } from "react";
import p5 from "p5";
import Sketch from "react-p5";

type Props = {
  text: string;
};

const Canvas: FC<Props> = ({ text }) => {
  const width = 500;
  const height = 300;

  const setup = (p: p5) => {
    p.createCanvas(width, height);
  };

  const draw = (p: p5) => {
    p.ellipse(50, 50, 80, 80);
    p.text(text, 200, 200);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
