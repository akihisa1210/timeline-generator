import React, { FC } from "react";
import p5 from "p5";
import Sketch from "react-p5";
import yaml from "js-yaml";
import { TimelineItem, TimelineState, sortTimeline } from "util/timeline";

type Props = {
  timelineState: TimelineState;
};

const Canvas: FC<Props> = ({ timelineState }) => {
  if (!timelineState.isInputValid) {
    return <div></div>;
  }
  const width = 640;
  const height = 640;

  const timeline = yaml.load(timelineState.timelineInput) as TimelineItem[];
  console.log(timeline); // debug

  const setup = (p: p5, canvasParentRef: Element) => {
    p.createCanvas(width, height).parent(canvasParentRef);
    p.smooth();
  };

  const draw = (p: p5) => {
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

    p.clear();
    p.background(240);

    const sortedTimeline = sortTimeline(timeline, timelineState.sort);

    sortedTimeline.forEach((item, index) => {
      const y = 30 + index * 30;
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
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
