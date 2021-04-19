import { ExpandingHeatmapTableRowType } from "../components/ExpandingHeatmapTableRow";

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
];

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
};

const col1 = "rgb(138, 191, 221)";

const STUDIES: {
  name: string;
  results: (number | undefined)[];
  subRows: {
    name: string;
    results: (number | undefined)[];
  }[];
}[] = [
  {
    name: "PAIRED_BOYDEN",
    results: [
      undefined,
      0.53,
      0.58,
      0.34,
      0.65,
      0.32,
      0.53,
      0.64,
      0.33,
      undefined
    ],
    subRows: [
      {
        name: "paired_boyden32c",
        results: [
          undefined,
          0.53,
          0.58,
          0.34,
          0.65,
          0.32,
          0.53,
          0.64,
          0.33,
          undefined
        ]
      }
    ]
  },
  {
    name: "PAIRED_CRCNS_HC1",
    results: [
      undefined,
      0.75,
      0.64,
      0.5,
      0.75,
      0.67,
      0.76,
      0.78,
      0.73,
      undefined
    ],
    subRows: [
      {
        name: "paired_crcns",
        results: [
          undefined,
          0.75,
          0.64,
          0.5,
          0.75,
          0.67,
          0.76,
          0.78,
          0.73,
          undefined
        ]
      }
    ]
  },
  {
    name: "SYNTH_BIONET",
    results: [
      undefined,
      0.86,
      0.74,
      0.81,
      0.77,
      undefined,
      0.73,
      0.68,
      0.54,
      undefined
    ],
    subRows: [
      {
        name: "synth_bionet_static",
        results: [
          undefined,
          0.87,
          0.85,
          0.83,
          0.8,
          undefined,
          0.77,
          0.75,
          0.58,
          undefined
        ]
      },
      {
        name: "synth_bionet_drift",
        results: [
          undefined,
          0.86,
          0.68,
          0.79,
          0.79,
          undefined,
          0.71,
          0.65,
          0.52,
          undefined
        ]
      },
      {
        name: "synth_bionet_shuffle",
        results: [
          undefined,
          0.84,
          0.69,
          0.8,
          0.72,
          undefined,
          0.72,
          0.6,
          0.52,
          undefined
        ]
      }
    ]
  }
];

export const expandingHeatmapTableSampleRows: ExpandingHeatmapTableRowType[] = [
  ...STUDIES.map((STUDY) => ({
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
        color: "black",
        bgcolor: "white"
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
          color: "black",
          bgcolor: "white"
        }))
      ],
      subrows: []
    }))
  }))
];
