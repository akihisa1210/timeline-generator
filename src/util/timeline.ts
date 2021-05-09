import yaml from "js-yaml";
import Ajv from "ajv";

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

const timelineItemSchema = {
  type: "object",
  properties: {
    label: { type: "string" },
    start: { type: "number" },
    end: { type: "number" },
  },
  required: ["label", "start", "end"],
  additionalProperties: false,
};

const timelineSchema = {
  type: "array",
  items: timelineItemSchema,
};

export const isYamlValid = (value: string): boolean => {
  const ajv = new Ajv();

  let inputYaml;
  try {
    inputYaml = yaml.load(value);
  } catch (e) {
    console.error(e);
    return false;
  }
  const validate = ajv.compile(timelineSchema);
  const valid = validate(inputYaml);
  if (!valid) {
    console.error(validate.errors);
    return false;
  }
  return true;
};
