import { configure, render, screen } from '@testing-library/react';
// import { render as erender } from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import { expandingHeatmapTableSampleHeader as header, expandingHeatmapTableSampleRows as tableRows } from '../sampleData/expandingHeatmapTableTestData';
import ExpandingHeatmapTable from './ExpandingHeatmapTable';

configure({
    testIdAttribute: 'id'
})



test('Renders base expanding heatmap table', () => {
    render(<ExpandingHeatmapTable
            header={header}
            rows={tableRows}
            onCellSelected={(cell) => {return undefined}}
          />, { wrapper: MemoryRouter })
    const columnLabel = screen.getByText(/column 1/i)
    expect(columnLabel).toBeInTheDocument()
    const cell21 = screen.getByText(/cell 1-2/i)
    expect(cell21).toBeInTheDocument()
});

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
