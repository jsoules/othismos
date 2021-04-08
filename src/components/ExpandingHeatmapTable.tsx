import React from "react";
import ExpandingHeatmapTableRow, { ExpandingHeatmapTableRowType } from "./ExpandingHeatmapTableRow";

interface Cell {
    selected?: boolean,
    id: string,
    link?: string,
    text: string | any,
    expand_id_on_click?: string,
    selectable?: boolean,
    rotate?: boolean,
    border_right?: boolean,
    border_top?: boolean,
    spacer?: boolean,
    // all these type stuffs should be much better done -- look at work from CanvasWidget package-to-be
    color?: string,
    bgcolor?: string,
    text_align?: any // can't seem to find the actual definition anywhere
}

interface MyProps {
    header: any,
    rows: ExpandingHeatmapTableRowType[],
    onCellSelected: (cell: Cell) => void
}

interface MyState {
    expandedRowIds: { [key: string]: any },
    selectedCellId: string | null
}

class ExpandingHeatmapTable extends React.Component<MyProps, MyState> {
    // props are rows and header
    constructor(props: MyProps) {
        super(props);

        let selectedCellId = null;
        props.rows.forEach(row => {
            row.cells.forEach(c => {
                if (c.selected) {
                    selectedCellId = c.id;
                }
            });
        });

        this.state = {
            expandedRowIds: {},
            selectedCellId: selectedCellId
        };
    }

    handleCellSelected(cell: Cell) {
        if (!cell.selectable) return;
        this.setState({
            selectedCellId: cell["id"]
        });
        if (this.props.onCellSelected) {
            this.props.onCellSelected(cell);
        }
    }

    render() {
        return (
            <div className="expandingheatmaptable-container">
                <table className="expandingheatmaptable">
                    <thead key="head">
                        <ExpandingHeatmapTableRow
                            id={this.props.header.id}
                            cells={this.props.header.cells}
                            subrows={this.props.header.subrows}
                            isSubrow={false}
                            cellSelectionHandler={this.handleCellSelected}
                        />
                    </thead>
                    <tbody key="body">
                        {this.props.rows.map((row) => {
                            return (<ExpandingHeatmapTableRow
                                id={row.id}
                                cells={row.cells}
                                subrows={row.subrows}
                                isSubrow={false}
                                cellSelectionHandler={this.handleCellSelected}
                            />)
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default ExpandingHeatmapTable;
