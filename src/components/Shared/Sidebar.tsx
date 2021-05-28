import React, { FunctionComponent } from "react"
import { HashLink } from "react-router-hash-link"
import Scrollspy from "react-scrollspy"

interface SidebarProps {
    listTitle: string,
    listItems: { name: string, value: string }[]
}

const Sidebar: FunctionComponent<SidebarProps> = (Props: SidebarProps) => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const path = window.location.pathname + "#"

    return (
        <div className="card card__sidebar">
        <div className="sidebar-content">
        <h5 className="listcard-title" onClick={scrollToTop}>
            {Props.listTitle}
        </h5>
        <Scrollspy
            items={Props.listItems.map(item => item.value)}
            currentClassName="sidebar-selected"
            className="sidebar-list"
        >
            {Props.listItems.map((item, index) => (
                <li key={index}>
                    <HashLink to={path + item.value} className={"sidebar-link"}>
                        {item.name}
                    </HashLink>
                </li>
            ))}
        </Scrollspy>
        </div>
    </div>
    )
}

export default Sidebar
