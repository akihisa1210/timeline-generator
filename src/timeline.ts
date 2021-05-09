export type TimelineItem = {
  label: string;
  start: number;
  end: number;
};

export type TimelineSort =
  | "default"
  | "start ASC"
  | "start DESC"
  | "end ASC"
  | "end DESC";

export type TimelineState = {
  timelineInput: string;
  sort: TimelineSort;
};
