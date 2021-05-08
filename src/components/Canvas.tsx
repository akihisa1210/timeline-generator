import React, { FC } from "react";
import p5 from "p5";
import Sketch from "react-p5";

type Props = {
  text: string;
};

type timelineItem = {
  label: string;
  start: number;
  end: number;
};

const Canvas: FC<Props> = ({ text }) => {
  const width = 1000;
  const height = 640;

  const timeline: timelineItem[] = [
    {
      label: "A",
      start: 1915,
      end: 1980,
    },
    {
      label: "B",
      start: 1926,
      end: 1984,
    },
    {
      label: "C",
      start: 1916,
      end: 1996,
    },
    {
      label: "D",
      start: 1901,
      end: 1981,
    },
    {
      label: "E",
      start: 1930,
      end: 2004,
    },
    {
      label: "F",
      start: 1896,
      end: 1982,
    },
    {
      label: "G",
      start: 1932,
      end: 2016,
    },
  ];

  const setup = (p: p5, canvasParentRef: Element) => {
    p.createCanvas(width, height).parent(canvasParentRef);
    p.background(200);
    p.smooth();

    const minStartItem = timeline.reduce((a, b) => {
      if (a.start <= b.start) {
        return a;
      }
      return b;
    });
    const maxEndItem = timeline.reduce((a, b) => {
      if (a.end <= b.end) {
        return b;
      }
      return a;
    });
    console.log(minStartItem.start, maxEndItem.end); // debug

    timeline.forEach((item, index) => {
      const y = 15 + index * 20;
      const start = p.map(
        item.start,
        minStartItem.start,
        maxEndItem.end,
        50,
        width - 50
      );
      const end = p.map(
        item.end,
        minStartItem.start,
        maxEndItem.end,
        50,
        width - 50
      );
      console.log(item.label, start, end); // debug
      p.text(item.label, start, y - 5);
      p.text(item.start, start, y + 10);
      p.text(item.end, end, y + 10);
      p.line(start, y, end, y);
    });
    p.text(text, 200, 200);
  };

  return <Sketch setup={setup} />;
};

export default Canvas;
