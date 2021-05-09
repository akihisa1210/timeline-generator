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
  isInputValid: boolean;
  sort: TimelineSort;
};

export const sortTimeline = (
  timelineItems: TimelineItem[],
  option: TimelineSort
): TimelineItem[] => {
  switch (option) {
    case "start ASC":
      return timelineItems.sort((a, b) => (a.start < b.start ? -1 : 1));
    case "start DESC":
      return timelineItems.sort((a, b) => (a.start <= b.start ? 1 : -1));
    case "end ASC":
      return timelineItems.sort((a, b) => (a.end < b.end ? -1 : 1));
    case "end DESC":
      return timelineItems.sort((a, b) => (a.end <= b.end ? 1 : -1));
    case "default":
      return timelineItems;
    default:
      return timelineItems;
  }
};
