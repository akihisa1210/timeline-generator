import React, { FC } from "react";
import p5 from "p5";
import Sketch from "react-p5";
import yaml from "js-yaml";
import { TimelineItem, TimelineSort, TimelineState } from "timeline";

type Props = {
  timelineState: TimelineState;
};

const sortTimeline = (
  timelineItems: TimelineItem[],
  option: TimelineSort
): TimelineItem[] => {
  switch (option) {
    case "start ASC":
      return timelineItems.sort((a, b) => (a.start <= b.start ? -1 : 1));
    case "start DESC":
      return timelineItems.sort((a, b) => (a.start <= b.start ? 1 : -1));
    case "end ASC":
      return timelineItems.sort((a, b) => (a.end <= b.end ? -1 : 1));
    case "end DESC":
      return timelineItems.sort((a, b) => (a.end <= b.end ? 1 : -1));
    case "default":
      return timelineItems;
    default:
      return timelineItems;
  }
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
