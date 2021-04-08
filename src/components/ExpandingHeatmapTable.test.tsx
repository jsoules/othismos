import { configure, render, screen } from '@testing-library/react';
// import { render as erender } from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import ExpandingHeatmapTable from './ExpandingHeatmapTable';

configure({
    testIdAttribute: 'id'
})

const header = {
    id: 'header',
    cells: [
        {
            id: 'header-leftcolumn',
            link: '',
            text: '',
            rotate: true,
        },
        {
            id: 'header-cell1',
            link: '/algorithms',
            text: 'column 1',
            rotate: true
        },
        {
            id: 'header-cell2',
            link: '/algorithms',
            text: 'column 2',
            rotate: true
        }
    ],
    subrows: [],
    isSubrow: false,
    cellSelectionHandler: () => {},
    index: -1
}

const tableRows = [
    {
        id: 'data1',
        cells: [
            {
                id: '1-1',
                text_align: 'center',
                text: 'cell 1-1',
                color: 'white',
                bgcolor: 'rgb(8, 53, 115)'
            },
            {
                id: '1-2',
                text_align: 'center',
                text: 'cell 1-2',
                color: 'black',
                bgcolor: 'rgb(138, 191, 221)'
            },
            {
                id: '1-3',
                text_align: 'center',
                text: 'cell 1-3'
            }
        ],
        subrows: []
    },
    {
        id: 'data2',
        cells: [
            {
                id: '2-1',
                text: 'cell 2-1',
                link: '',
                border_right: true,
                selectable: true
            },
            {
                id: '2-2',
                text: 'cell 2-2',
                link: '',
                border_right: true,
                selectable: true
            },
            {
                id: '2-3',
                text: 'cell 2-3',
                link: '',
                border_right: true,
                selectable: true
            }
        ],
        subrows: [
            {
                id: 'sub1',
                cells: [
                    {
                        id: '2a-1',
                        text: 'cell 2a-1',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true,
                        color: 'white',
                        bgcolor: 'rgb(8, 53, 115)'
                            },
                    {
                        id: '2a-2',
                        text: 'cell 2a-2',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true,
                        color: 'black',
                        bgcolor: 'rgb(138, 191, 221)'
                    },
                    {
                        id: '2a-3',
                        text: 'cell 2a-3',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true
                    }
                ],
                subrows: []
            },
            {
                id: 'sub2',
                cells: [
                    {
                        id: '2b-1',
                        text: 'cell 2b-1',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true,
                        color: 'white',
                        bgcolor: 'rgb(8, 53, 115)'
                    },
                    {
                        id: '2b-2',
                        text: 'cell 2b-2',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true,
                        color: 'black',
                        bgcolor: 'rgb(138, 191, 221)'
                    },
                    {
                        id: '2b-3',
                        text: 'cell 2b-3',
                        link: '',
                        text_align: 'center',
                        border_right: true,
                        selectable: true
                    }
                ],
                subrows: []
            }
        ]
    }
]

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
