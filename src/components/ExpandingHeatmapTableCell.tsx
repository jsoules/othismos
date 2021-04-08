import React, { CSSProperties, FunctionComponent } from 'react';
import { Link } from "react-router-dom";

export interface CellType {
    id: string,
    link?: string,
    text: string | any,
    selected?: boolean,
    rotate?: boolean,
    border_right?: boolean,
    border_top?: boolean,
    selectable?: boolean,
    spacer?: boolean,
    expand_id_on_click?: string,
    cell_wrap?: boolean
    color?: string,
    bgcolor?: string,
    text_align?: any, // can't seem to find the actual definition anywhere
}

type CellProps = CellType & {
    hide_content: boolean,
    handleCellSelected: (cell: CellType) => void, // is this the best way to do this???
}


export interface RowToggleProps {
    id: string,
    toggleIsRequired: boolean,
    rowIsExpanded: boolean,
    handler: (id: string) => void
}
const RowToggleButton: FunctionComponent<RowToggleProps> = (Props: RowToggleProps) => {
    return (
        <div
            onClick={() => Props.handler(Props.id)}
        >
            <span className="expandable-button">{Props.rowIsExpanded ? "-" : "+"}</span>
        </div>
    )
}

export const RowToggleCell: FunctionComponent<RowToggleProps> = (Props: RowToggleProps) => {
    if (!Props.toggleIsRequired) {
        return (
            <td key={"empty-cell-" + Props.id} />
        )
    } else {
        return (
            <td key={`${Props.rowIsExpanded ? "collapse" : "expand "}-button-${Props.id}`}>
                <RowToggleButton
                    id={Props.id}
                    toggleIsRequired={Props.toggleIsRequired}
                    rowIsExpanded={Props.rowIsExpanded}
                    handler={Props.handler}
                />
            </td>
        )
    }
}

const ExpandingHeatmapTableCell: FunctionComponent<CellProps> = (Props: CellProps) => {
    const contentSpan = Props.link  ? <Link to={Props.link}>{Props.text}</Link>
                                    : <span>{Props.text}</span>
    const classList: string[] = []
    // find a neater way to do this?
    if (Props.selected)           { classList.push("selected")     }
    if (Props.rotate)             { classList.push("rotate")       }
    if (Props.border_right)       { classList.push("border_right") }
    if (Props.border_top)         { classList.push("border_top")   }
    if (Props.selectable)         { classList.push("selectable")   }
    if (Props.spacer)             { classList.push("spacer")       }
    if (Props.expand_id_on_click) { classList.push("expandable")   }
    if (Props.cell_wrap)          { classList.push("cell-wrap")    }

    // TODO: Look up how to do this more elegantly
    const cellStyling: CSSProperties = {
        color:            Props.color      || "black",
        backgroundColor:  Props.bgcolor    || "white",
        textAlign:        Props.text_align || "left"
    }

    return (
        <td
            onClick={() => Props.handleCellSelected(Props)}
            className={classList.join(" ")}
            style = {Props.hide_content ? {} : cellStyling}
            key={Props.id}
        >
            <div>
                { Props.hide_content ? <span /> : contentSpan }
            </div>
        </td>
    )
}

export default ExpandingHeatmapTableCell
