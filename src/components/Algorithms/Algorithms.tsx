import React, { FunctionComponent, useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import Preloader from "../Shared/Preloader"
import Sidebar from "../Shared/Sidebar"
import { toTitleCase } from "../util"
import AlgorithmCard from "./AlgorithmCard"
import overviewMd from './AlgorithmOverview.md'

// TODO: url stype for dockerfile, wrapper, website, markdown_link?
export interface AlgorithmEntry {
    authors: string,
    dockerfile: string,
    env_name?: string,
    // MORE TBD--TODO: Is it a good idea to list these explicitly? How likely is the set to expand?
    label: "IRONCLUST" | "KILOSORT" | "TRIDESCLOUS" | "HERDING_SPIKES_2" | "JRCLUST" |
            "SPYKING_CIRCUS" | "KILOSORT2" | "KLUSTA" | "Waveclus" | "YASS" | "MOUNTAINSORT4",
    markdown: string
    markdown_link: string,
    website: string,            // link to github repo for the sorter
    wrapper: string,            // wrapper function in SpikeForest for the sorter.
    wrapper_link?: string       // populated with link to SF github for the wrapper.
}

interface AlgorithmsPageProps {
    algorithms: AlgorithmEntry[],
    overviewMd?: string
}

const sortAlgorithmEntries = (entries: AlgorithmEntry[]): AlgorithmEntry[] => {
    const sorted = entries.sort((a, b) => {
        // entries with wrappers sort before those without
        if (a.wrapper && !b.wrapper) return -1
        if (!a.wrapper && b.wrapper) return 1
        // If both entries have wrappers, sort according to label (capitalized)
        const aLabel = a.label.toUpperCase()
        const bLabel = b.label.toUpperCase()
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0
    })
    return sorted
}


// TODO: handleClick handler??
const Algorithms: FunctionComponent<AlgorithmsPageProps> = (Props: AlgorithmsPageProps) => {
    const [md, setMd] = useState('')
    useEffect(() => {
        fetch(overviewMd)
        .then((res) => res.text())
        .then((text) => setMd(text))
    })
    return (
        <div>
            {Props.algorithms.length === 0 || md === '' ? (
                <EmptyAlgorithms {...Props}/>
            ) : (
                <ExtantAlgorithms
                    algorithms={sortAlgorithmEntries(Props.algorithms)}
                    overviewMd={md}/>
            )}
        </div>
    )
}

const EmptyAlgorithms: FunctionComponent<AlgorithmsPageProps> = (Props: AlgorithmsPageProps) => {
    return (
        <div>
            <Container className="container__heatmap">
                <Card>
                    <Card.Body>
                        <Preloader />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

const ExtantAlgorithms: FunctionComponent<AlgorithmsPageProps> = (Props: AlgorithmsPageProps) => {
    const sidebarTitle = "Algorithms In Use"
    const sidebarItems = Props.algorithms.map(item => ({
        name: toTitleCase(item.label.replace(/_/g, " ").toLowerCase()),
        value: item.label
    }))

    return (
        <Container className="container-sidebar">
            <Row noGutters>
                <Col xl={2} md={3} sm={12} className="sidebar">
                    <Sidebar
                        listItems={[{name: "Overview", value: "overview"}, ...sidebarItems]}
                        listTitle={sidebarTitle}
                    />
                </Col>
                <Col xl={10} md={9} sm={12} className="page__body">
                    <Container className="container__heatmap">
                        <Row className="subcontainer justify-content-md-center">
                            <Col lg={12} sm={12} xl={12}>
                                <div className="intro">
                                    <p className="big">Algorithms</p>
                                </div>
                            </Col>
                        </Row>
                        <div className="finder" id="overview" />
                        <Row className="subcontainer justify-content-md-center">
                            <Col lg={12} sm={12} xl={12}>
                                <div className="card card__std">
                                    <div className="content">
                                        <div className="card__label">
                                            <p><strong>Overview</strong></p>
                                        </div>
                                        <div className="card__footer">
                                            <hr />
                                            {/*TODO: This doesn't set rel="noreferrer noopen" properly.
                                            There is a remark extension https://github.com/remarkjs/remark-external-links
                                            that ought to do it, but it doesn't look like it's been fully supported yet,
                                            and the usage is non-obvious anyway. Leaving the linktarget setting for now,
                                            but we might just tell people to right-click if they want a new window.
                                            */}
                                            <ReactMarkdown children={Props.overviewMd || ''} linkTarget="_blank"/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="subcontainer-final justify-content-md-center">
                            {Props.algorithms.map(item => (
                                <AlgorithmCard {...item} key={item.label}/>
                            ))}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Algorithms
