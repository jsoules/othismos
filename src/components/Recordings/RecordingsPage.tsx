import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Study, StudySet } from '../../calc/jsonTypes'
import { Copy, getCanonicalSectionTag, PageCopy, PageSidebar, parseMarkdownToContentCards, Section } from "../Shared/MarkdownHandling"
import Preloader from "../Shared/Preloader"
import { toTitleCase } from "../util"
import pageContent from './RecordingPageContent.md'

type Studies = { Studies: Study[] }
type StudySets = { Sets: StudySet[] }

const getCanonicalStudySetName = (rawName: string): string => (
    toTitleCase(rawName.replace(/_/g, " ").toLowerCase())
)

const Recordings: FunctionComponent<StudySets> = (Props: StudySets) => {
    const [copyMd, setCopyMd] = useState('loading...')
    useEffect(() => {
        fetch(pageContent)
        .then((res) => res.text())
        .then((text) => setCopyMd(text))
    })
    const content: Copy = parseMarkdownToContentCards(copyMd)
    const studySetSidebarEntries: Section[] = Props.Sets.map((ss) => {
        const name = getCanonicalStudySetName(ss.name)
        return {
            Header: '',
            Content: '',
            Label: name,
            Tag: getCanonicalSectionTag(ss.name),
        }
    })

    const apiDataNotYetLoaded = (!Props.Sets || Props.Sets.length < 1)
    const studySetDynamicContent = apiDataNotYetLoaded
        ? < PreloaderCard />
        : <Fragment>
                {Props.Sets.map((studyset) => (<StudySetCard {...studyset} />)) }
          </Fragment>

    return (
        <Container className="container-sidebar">
            <Row noGutters>
                <PageSidebar
                    Title={content.Title}
                    Sections={[...content.Sections, ...studySetSidebarEntries]} />
                <PageCopy 
                    Copy={content}
                    ContentHook={() => undefined}
                    AdditionalContent={studySetDynamicContent}
                />
            </Row>
        </Container>
    )
}

const PreloaderCard: FunctionComponent = () => {
    return (
        <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                    <div className="content">
                        <Preloader />
                    </div>
                </div>
            </Col>
        </Row>        
    )
}

const StudySetCard: FunctionComponent<StudySet> = (Props: StudySet) => {
    return (
        // hard-coded 'study-set-' is just arbitrary text--we're only
        // trying to provide a unique key property value for React.
        <div key={`study-set-${Props.name}`}>
            <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                    <div className="finder" id={getCanonicalSectionTag(Props.name)} />
                    <div className="listcard listcard-recording">
                        <div className="listcard-content">
                            <div className="listcard-section">
                                <Link to={`/studyset/${Props.name}`} className="listcard-title">
                                    {Props.name}
                                </Link>
                            </div>
                            <div className="listcard-section">
                                <StudyTable Studies={Props.studies} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const StudyTable: FunctionComponent<Studies> = (Props: Studies) => {
    return (
        <Table striped bordered size="sm">
            <thead>
                <tr>
                    <th key="col1">Study name</th>
                    <th key="col2">Number of recordings</th>
                    <th key="col3"> </th>
                </tr>
            </thead>
            <tbody>
                { Props.Studies.map((study) => (<StudyTableRow {...study} />)) }
            </tbody>
        </Table>
    )
}

const StudyTableRow: FunctionComponent<Study> = (Props: Study) => {
    return (
        <tr key={`study-${Props.name}`}>
            <td key="col1">{Props.name}</td>
            <td key="col2">{Props.recordings.length}</td>
            <td key="col3" className="listcard-link">
                <Link to={`/study/${Props.name}`} className="listcard-env">
                    View study details
                </Link>
            </td>
        </tr>
    )
}

export default Recordings;
