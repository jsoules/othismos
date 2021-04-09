import React, { CSSProperties, FunctionComponent } from 'react';
import { Link } from "react-router-dom";

export interface CellType {
    id: string,
    link?: string,
    text: string | any,
    rotate?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    selectable?: boolean,
    spacer?: boolean,
    idToExpandOnClick?: string,
    cellWrap?: boolean
    color?: string,
    bgcolor?: string,
    textAlign?: any, // can't seem to find the actual definition anywhere
}

type CellProps = CellType & {
    hideContent: boolean
    selected?: boolean
    handleCellSelected: (cell: CellType) => void
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
    if (Props.selected)          { classList.push("selected")     }
    if (Props.rotate)            { classList.push("rotate")       }
    if (Props.borderRight)       { classList.push("borderRight")  }
    if (Props.borderTop)         { classList.push("border_top")   } // this might not exist
    if (Props.selectable)        { classList.push("selectable")   }
    if (Props.spacer)            { classList.push("spacer")       }
    if (Props.idToExpandOnClick) { classList.push("expandable")   }
    if (Props.cellWrap)          { classList.push("cellWrap")     }

    // TODO: Look up how to do this more elegantly
    const cellStyling: CSSProperties = {
        color:            Props.color      || "black",
        backgroundColor:  Props.bgcolor    || "white",
        textAlign:        Props.textAlign  || "left"
    }

    return (
        <td
            onClick={() => Props.handleCellSelected(Props)}
            className={classList.join(" ")}
            style = {Props.hideContent ? {} : cellStyling}
            key={Props.id}
        >
            <div>
                { Props.hideContent ? <span /> : contentSpan }
            </div>
        </td>
    )
}

export default ExpandingHeatmapTableCell
