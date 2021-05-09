import { sortTimeline } from "util/timeline";

describe("sortTimeline", () => {
  it("doesn't sort by default", () => {
    const timeline = [
      { label: "A", start: 5, end: 10 },
      { label: "B", start: 10, end: 15 },
      { label: "C", start: 7, end: 12 },
    ];
    const sortedTimeline = sortTimeline(timeline, "default");
    expect(sortedTimeline[0].label).toEqual("A");
    expect(sortedTimeline[1].label).toEqual("B");
    expect(sortedTimeline[2].label).toEqual("C");
  });

  it("sorts by start ASC", () => {
    const timeline = [
      { label: "A", start: 5, end: 10 },
      { label: "B", start: 10, end: 15 },
      { label: "C", start: 7, end: 12 },
    ];
    const sortedTimeline = sortTimeline(timeline, "start ASC");
    expect(sortedTimeline[0].label).toEqual("A");
    expect(sortedTimeline[1].label).toEqual("C");
    expect(sortedTimeline[2].label).toEqual("B");
  });

  it("sorts by start DESC", () => {
    const timeline = [
      { label: "A", start: 5, end: 10 },
      { label: "B", start: 10, end: 15 },
      { label: "C", start: 7, end: 12 },
    ];
    const sortedTimeline = sortTimeline(timeline, "start DESC");
    expect(sortedTimeline[0].label).toEqual("B");
    expect(sortedTimeline[1].label).toEqual("C");
    expect(sortedTimeline[2].label).toEqual("A");
  });

  it("sorts by end ASC", () => {
    const timeline = [
      { label: "A", start: 5, end: 17 },
      { label: "B", start: 10, end: 15 },
      { label: "C", start: 7, end: 12 },
    ];
    const sortedTimeline = sortTimeline(timeline, "end ASC");
    expect(sortedTimeline[0].label).toEqual("C");
    expect(sortedTimeline[1].label).toEqual("B");
    expect(sortedTimeline[2].label).toEqual("A");
  });

  it("sorts by end DESC", () => {
    const timeline = [
      { label: "A", start: 5, end: 17 },
      { label: "B", start: 10, end: 15 },
      { label: "C", start: 7, end: 12 },
    ];
    const sortedTimeline = sortTimeline(timeline, "end DESC");
    expect(sortedTimeline[0].label).toEqual("A");
    expect(sortedTimeline[1].label).toEqual("B");
    expect(sortedTimeline[2].label).toEqual("C");
  });

  it("is stable", () => {
    const timeline = [
      { label: "A", start: 5, end: 6 },
      { label: "B", start: 5, end: 6 },
    ];
    const defaultTimeline = sortTimeline(timeline, "default");
    expect(defaultTimeline[0].label).toEqual("A");
    const startAscTimeline = sortTimeline(timeline, "start ASC");
    expect(startAscTimeline[0].label).toEqual("A");
    const startDescTimeline = sortTimeline(timeline, "start DESC");
    expect(startDescTimeline[0].label).toEqual("A");
    const endAscTimeline = sortTimeline(timeline, "end ASC");
    expect(endAscTimeline[0].label).toEqual("A");
    const endDescTimeline = sortTimeline(timeline, "end DESC");
    expect(endDescTimeline[0].label).toEqual("A");
  });
});
