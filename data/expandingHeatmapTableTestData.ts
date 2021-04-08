export const expandingHeatmapTableSampleHeader = {
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

export const expandingHeatmapTableSampleRows = [
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