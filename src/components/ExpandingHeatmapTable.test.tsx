import { configure, render, screen } from "@testing-library/react"
// import { render as erender } from "enzyme";
import { MemoryRouter } from "react-router-dom"
import {
  expandingHeatmapTableSampleHeader as header,
  expandingHeatmapTableSampleRows as tableRows
} from "../sampleData/expandingHeatmapTableTestData"
import ExpandingHeatmapTable from "./ExpandingHeatmapTable"

configure({
  testIdAttribute: "id"
})

test("Renders base expanding heatmap table", () => {
  render(
    <ExpandingHeatmapTable
      header={header}
      rows={tableRows}
      onCellSelected={(cell) => {
        return undefined
      }}
    />,
    { wrapper: MemoryRouter }
  )
  const columnLabel = screen.getByText(/HerdingSpikes2/i)
  expect(columnLabel).toBeInTheDocument()
  const cellPairedBoyden = screen.getByText(/PAIRED_BOYDEN/i)
  expect(cellPairedBoyden).toBeInTheDocument()
})

// Test is currently broken while I figure out how to actually write it
// test('Confirm expand/collapse state', () => {
//     const wrapper = erender(
//     <MemoryRouter>
//         <ExpandingHeatmapTable
//             header={header}
//             rows={tableRows}
//             onCellSelected={(cell) => {return undefined}}
//         />
//     </MemoryRouter>)

//     const firstRow = wrapper.find(<tr>)[1]
//     console.log(firstRow)
//     expect(firstRow).toHaveClass("toprow")
//     // const secondRow = screen.getByTestId(/data2/i)
//     // expect(secondRow).toHaveClass("toprow")
//     // const hiddenRow = screen.queryByTestId(/sub1/i)
//     // expect(hiddenRow).toBeNull()
// });
