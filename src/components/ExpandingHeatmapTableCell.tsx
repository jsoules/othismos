import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { Link } from "react-router-dom";

export interface CellType {
    id: string,
    link?: string,
    text: string | any,
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
    hide_content: boolean
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
    const classList: string[] = useMemo(() => {
        const list: string[] = []
        // find a neater way to do this?
        if (Props.selected)           { list.push("selected")     }
        if (Props.rotate)             { list.push("rotate")       }
        if (Props.border_right)       { list.push("border_right") }
        if (Props.border_top)         { list.push("border_top")   }
        if (Props.selectable)         { list.push("selectable")   }
        if (Props.spacer)             { list.push("spacer")       }
        if (Props.expand_id_on_click) { list.push("expandable")   }
        if (Props.cell_wrap)          { list.push("cell-wrap")    }
        return list
    }, [Props])

    // TODO: Look up how to do this more elegantly
    const cellStyling: CSSProperties = useMemo(() => ({
        color:            Props.color      || "black",
        backgroundColor:  Props.bgcolor    || "white",
        textAlign:        Props.text_align || "left"
    }), [Props.color, Props.bgcolor, Props.text_align])

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
