import { ExpandingHeatmapTableRowType } from "../components/ExpandingHeatmapTableRow"
import * as d3 from "d3"
import mockStudies from "./mockStudies"

const sorters = [
  "HerdingSpikes2",
  "IronClust",
  "JRClust",
  "Kilosort",
  "Kilosort2",
  "Klusta",
  "MountainSort4",
  "SpykingCircus",
  "Tridesclous",
  "Waveclus"
]

const computeBackgroundColor = (
  val: number | undefined,
  format: "count" | "average" | "cpu"
) => {
  if (val === undefined) return "white"
  let square = Math.pow(val, 2)
  if (format === "count") return d3.interpolateGreens(square)
  else if (format === "average") return d3.interpolateBlues(square)
  else if (format === "cpu") return d3.interpolateYlOrRd(square)
  else return "white"
}

const computeForegroundColor = (val: number | undefined) => {
  if (val === undefined) return "black"
  return val < 0.7 ? "black" : "white"
}

export const expandingHeatmapTableSampleHeader: ExpandingHeatmapTableRowType = {
  id: "header",
  cells: [
    {
      id: "header-leftcolumn",
      link: "",
      text: "",
      rotate: true
    },
    ...sorters.map((algName) => ({
      id: `header-cell-${algName}`,
      link: "/algorithms",
      text: `${algName}`,
      rotate: true
    }))
  ],
  subrows: []
  // isSubrow: false,
  // cellSelectionHandler: () => {},
  // index: -1
}

const col1 = "rgb(138, 191, 221)"

export const expandingHeatmapTableSampleRows: ExpandingHeatmapTableRowType[] = [
  ...mockStudies.map((STUDY) => ({
    id: STUDY.name,
    cells: [
      {
        id: "left",
        textAlign: "right",
        text: STUDY.name,
        color: "black",
        bgcolor: "white"
      },
      ...STUDY.results.map((num, ii) => ({
        id: "result-" + ii,
        textAlign: "center",
        text: num !== undefined ? `${num}` : "",
        color: computeForegroundColor(num),
        bgcolor: computeBackgroundColor(num, "average")
      }))
    ],
    subrows: STUDY.subRows.map((sr) => ({
      id: sr.name,
      cells: [
        {
          id: "left",
          textAlign: "right",
          text: sr.name,
          color: "black",
          bgcolor: "white"
        },
        ...sr.results.map((num, ii) => ({
          id: "result-" + ii,
          textAlign: "center",
          text: num !== undefined ? `${num}` : "",
          color: computeForegroundColor(num),
          bgcolor: computeBackgroundColor(num, "average")
        }))
      ],
      subrows: []
    }))
  }))
]
