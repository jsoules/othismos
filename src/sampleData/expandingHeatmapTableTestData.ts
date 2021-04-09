import { ExpandingHeatmapTableRowType } from "../components/ExpandingHeatmapTableRow"

export const expandingHeatmapTableSampleHeader: ExpandingHeatmapTableRowType = {
    id: 'header',
    cells: [
        {
            id: 'header-leftcolumn',
            link: '',
            text: '',
            rotate: true,
        },
        ...[1, 2, 3, 4, 5, 6].map(n => ({
            id: `header-cell${n}`,
            link: '/algorithms',
            text: `column ${n}`,
            rotate: true
        }))
    ],
    subrows: [],
    // isSubrow: false,
    // cellSelectionHandler: () => {},
    // index: -1
}

const col1 = 'rgb(138, 191, 221)'

export const expandingHeatmapTableSampleRows: ExpandingHeatmapTableRowType[] = [
    {
        id: 'data1',
        cells: [
            {
                id: '1-0',
                textAlign: 'center',
                text: 'cell 1-0',
                color: 'white',
                bgcolor: 'rgb(8, 53, 115)'
            },
            {
                id: '1-1',
                textAlign: 'center',
                text: 'cell 1-1',
                color: 'white',
                bgcolor: 'rgb(8, 53, 115)'
            },
            {
                id: '1-2',
                textAlign: 'center',
                text: 'cell 1-2',
                color: 'black',
                bgcolor: 'rgb(138, 191, 221)'
            },
            ...[3, 4, 5, 6].map(n => ({
                id: `1-${n}`,
                textAlign: 'center',
                text: `cell 1-${n}`,
                bgcolor: 'rgb(138, 191, 221)'
            }))
        ],
        subrows: []
    },
    {
        id: 'data2',
        cells: [
            {
                id: '2-0',
                text: 'cell 2-0',
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: 'rgb(138, 191, 221)'
            },
            {
                id: '2-1',
                text: 'cell 2-1',
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: 'rgb(138, 191, 221)'
            },
            {
                id: '2-2',
                text: 'cell 2-2',
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: col1
            },
            ...[3, 4, 5, 6].map(n => ({
                id: `2-${n}`,
                textAlign: 'center',
                text: `cell 2-${n}`,
                bgcolor: col1
            }))
        ],
        subrows: [
            {
                id: 'sub1',
                cells: [
                    {
                        id: '2a-1',
                        text: 'cell 2a-0',
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true
                    },
                    {
                        id: '2a-1',
                        text: 'cell 2a-1',
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        color: 'white',
                        bgcolor: 'rgb(8, 53, 115)'
                    },
                    {
                        id: '2a-2',
                        text: 'cell 2a-2',
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        color: 'black',
                        bgcolor: col1
                    },
                    ...[3, 4, 5, 6].map(n => ({
                        id: `2a-${n}`,
                        text: `cell 2a-${n}`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        bgcolor: col1
                    }))
                ],
                subrows: []
            },
            {
                id: 'sub2',
                cells: [
                    ...[1, 2, 3, 4, 5, 6].map(n => ({
                        id: `2b-${n}`,
                        text: `cell 2b-${n}`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        bgcolor: col1
                    }))
                ],
                subrows: []
            },
            ...[3, 4, 5].map(sr => ({
                id: `sub${sr}`,
                cells: [
                    ...[1, 2, 3, 4, 5, 6].map(n => ({
                        id: `${sr}b-${n}`,
                        text: `cell ${sr}b-${n}`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        bgcolor: col1
                    }))
                ],
                subrows: []
            }))
        ]
    },
    ...[3, 4, 5, 6, 7].map(r => ({
        id: `data${r}`,
        cells: [
            {
                id: `${r}-0`,
                text: `cell ${r}-0`,
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: col1
            },
            {
                id: `${r}-1`,
                text: `cell ${r}-1`,
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: col1
            },
            {
                id: `${r}-2`,
                text: `cell ${r}-2`,
                link: '',
                borderRight: true,
                selectable: true,
                bgcolor: col1
            },
            ...[3, 4, 5, 6].map(n => ({
                id: `${r}-${n}`,
                textAlign: 'center',
                text: `cell ${r}-${n}`,
                bgcolor: col1
            }))
        ],
        subrows: [
            {
                id: `${r}-sub1`,
                cells: [
                    {
                        id: `${r}a-0`,
                        text: `cell ${r}a-0`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: false
                    },
                    {
                        id: `${r}a-1`,
                        text: `cell ${r}a-1`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        color: 'white',
                        bgcolor: 'rgb(8, 53, 115)'
                    },
                    {
                        id: `${r}a-2`,
                        text: `cell ${r}a-2`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        color: 'black',
                        bgcolor: 'rgb(138, 191, 221)'
                    },
                    ...[3, 4, 5, 6].map(n => ({
                        id: `${r}a-${n}`,
                        text: `cell ${r}a-${n}`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        bgcolor: col1
                    }))
                ],
                subrows: []
            },
            {
                id: `${r}-sub2`,
                cells: [
                    ...[0, 1, 2, 3, 4, 5, 6].map(n => ({
                        id: `${r}b-${n}`,
                        text: `cell ${r}b-${n}`,
                        link: '',
                        textAlign: 'center',
                        borderRight: true,
                        selectable: true,
                        bgcolor: col1
                    }))
                ],
                subrows: []
            }
        ]
    }))
]