/** Map design-spec slug → arco.design/react/components/<segment> URL segment. */
const DOC_SEGMENT: Record<string, string> = {
  "data-display-number": "statistic",
  datepicker: "date-picker",
  timepicker: "time-picker",
  pageheader: "page-header",
  treeselect: "tree-select",
  pincode: "verification-code",
  "input-range": "slider",
  "input-adornment": "input",
  "input-ip": "input",
};

export function arcoDocSegment(slug: string): string {
  return DOC_SEGMENT[slug] ?? slug;
}

export function arcoDocUrl(slug: string): string {
  return `https://arco.design/react/components/${arcoDocSegment(slug)}`;
}
