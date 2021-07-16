import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import { Study, StudySet } from '../../calc/jsonTypes'
import Preloader from "../Shared/Preloader"
import Sidebar from "../Shared/Sidebar"
import { Copy, getCanonicalSectionTag, parseMarkdownToContentCards, Section, toTitleCase } from "../util"
import pageContent from './RecordingPageContent.md'


type Studies = { Studies: Study[] }
type StudySets = { Sets: StudySet[] }
type EnhancedCopy = Copy & { Loading: boolean, StudySets: StudySets }

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
    const loading = !(Props.Sets && Props.Sets.length > 0)
    const content: Copy = parseMarkdownToContentCards(copyMd)
    const studySetSidebarEntries: Section[] = Props.Sets.map((ss) => {
        const name = getCanonicalStudySetName(ss.name)
        return {
            header: '',
            content: '',
            label: name,
            tag: getCanonicalSectionTag(ss.name),
        }
    })

    return (
        <Container className="container-sidebar">
            <Row noGutters>
                <PageSidebar
                    title={content.title}
                    sections={[...content.sections, ...studySetSidebarEntries]} />
                <PageCopy 
                    title={content.title}
                    sections={content.sections}
                    Loading={loading}
                    StudySets={Props} />
            </Row>
        </Container>
    )
}

const PageSidebar: FunctionComponent<Copy> = (Props: Copy) => {
    const sidebarItems = Props.sections.map(
        (section) => {
            return {
                name: section.label,
                value: section.tag
            }
        })
    return (
        <Col xl={2} md={3} sm={12} className="sidebar">
            <Sidebar listItems={sidebarItems} listTitle={Props.title} />
        </Col>
    )
}

const PageCopy: FunctionComponent<EnhancedCopy> = (Props: EnhancedCopy) => {
    return (
        <Col xl={10} md={9} sm={12} className="page__body">
            <Container className="container__heatmap">
                <Row className="subcontainer justify-content-md-center">
                    <Col lg={12} sm={12} xl={12}>
                        <div className="intro">
                            <p className="big">{Props.title}</p>
                        </div>
                    </Col>
                </Row>
                { Props.sections.map((section) => (<StaticCard {...section} />)) }
                { Props.Loading 
                    ? <PreloaderCard />
                    : <div>
                        { Props.StudySets.Sets.map((studyset) => (<StudySetCard {...studyset} />))}
                      </div>
                }
                <div style={{ margin: "8rem 0" }} />
            </Container>
        </Col>
    )
}

const StaticCard: FunctionComponent<Section> = (Props: Section) => {
    return (
        <Fragment>
            <div className="finder" id={Props.tag} />
            <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                        <div className="content">
                            <div className="card__label">
                                <p>
                                    <strong>{Props.header}</strong>
                                </p>
                            </div>
                            <div className="card__footer">
                                <hr />
                                <ReactMarkdown children={Props.content} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
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

// class OldRecordings extends Component {
//   render() {
//     let loading = isEmpty(this.props.studySets);
//     let sidebarItems = [];
//     if (this.props.studySets) {
//       sidebarItems = this.props.studySets.map(item => ({
//         name: toTitleCase(item.name.replace(/_/g, " ").toLowerCase()),
//         value: item.name
//       }));
//     }
//     sidebarItems.unshift(
//       { name: "Recording Organization", value: "recordingorganization" },
//       { name: "Recording Types", value: "recordingtypes" }
//     );
//     return (
//       <Container className="container-sidebar">
//         <Row noGutters>
//           <Col xl={2} md={3} sm={12} className="sidebar">
//             <Sidebar listItems={sidebarItems} listTitle={"Recordings"} />
//           </Col>
//           <Col xl={10} md={9} sm={12} className="page__body">
//             <Container className="container__heatmap">
//               <Row className="subcontainer justify-content-md-center">
//                 <Col lg={12} sm={12} xl={12}>
//                   <div className="intro">
//                     <p className="big">Recordings</p>
//                   </div>
//                 </Col>
//               </Row>
//               <div className="finder" id="recordingorganization" />
//               <Row className="subcontainer justify-content-md-center">
//                 <Col lg={12} sm={12} xl={12}>
//                   <div className="card card__std">
//                     <div className="content">
//                       <div className="card__label">
//                         <p>
//                           <strong>Recording Organization</strong>
//                         </p>
//                       </div>
//                       <div className="card__footer">
//                         <hr />
//                         <p>
//                           Recordings are grouped into "studies". Each study
//                           contains a set of real or synthesized recordings
//                           sharing a common source (probe and brain region, or
//                           simulation code settings). It is appropriate to
//                           aggregate the statistics from all recordings within a
//                           particular study.
//                         </p>
//                         <p>
//                           In turn, studies are grouped into "study sets". Each
//                           study set is a collection of studies which have
//                           different parameters but share some common features.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//               <div className="finder" id="recordingtypes" />
//               <Row className="subcontainer justify-content-md-center">
//                 <Col lg={12} sm={12} xl={12}>
//                   <div className="card card__std">
//                     <div className="content">
//                       <div className="card__label">
//                         <p>
//                           <strong>Recording Types</strong>
//                         </p>
//                       </div>
//                       <div className="card__footer">
//                         <hr />
//                         <p>
//                           Our hosted recordings include many popular probe
//                           geometries and types, and fall into three categories:
//                         </p>
//                         <div className="list__section">
//                           <span className="list__heading">
//                             1. Paired (<i>in vivo</i> or <i>in vitro</i>)
//                           </span>
//                           <span className="list__body">
//                             Recordings from various laboratories where an
//                             independent intra- or juxta-cellular probe provides
//                             reliable ground truth firing events, usually for one
//                             neuron per recording.
//                           </span>
//                         </div>
//                         <div className="list__section">
//                           <span className="list__heading">
//                             2. Simulated (in silico)
//                           </span>
//                           <span className="list__body">
//                             Recordings from neural simulator codes with various
//                             degrees of fidelity, with known firing events for
//                             large numbers of neurons.
//                           </span>
//                         </div>
//                         <div className="list__section">
//                           <span className="list__heading">
//                             3. Human-curated
//                           </span>
//                           <span className="list__body">
//                             We also host a small set of expert human-curated
//                             sorting results.
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//               {loading ? (
//                 <Row className="subcontainer justify-content-md-center">
//                   <Col lg={12} sm={12} xl={12}>
//                     <div className="card card__std">
//                       <div className="content">
//                         <Preloader />
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               ) : (
//                 <div>
//                   {this.props.studySets.map(studySet => (
//                     <div key={`study-set-${studySet.name}`}>
//                       <Row className="subcontainer justify-content-md-center">
//                         <Col lg={12} sm={12} xl={12}>
//                           <div className="finder" id={studySet.name} />
//                           <div className="listcard listcard-recording">
//                             <div className="listcard-content">
//                               <div className="listcard-section">
//                                 <Link
//                                   to={`/studyset/${studySet.name}`}
//                                   className="listcard-title"
//                                 >
//                                   {studySet.name}
//                                 </Link>
//                               </div>
//                               <div className="listcard-section">
//                                 <Table striped bordered size="sm">
//                                   <thead>
//                                     <tr>
//                                       <th key="col1">Study name</th>
//                                       <th key="col2">Number recordings</th>
//                                       <th key="col3"> </th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {studySet.studies.map(study => (
//                                       <tr key={`study-${study.name}`}>
//                                         <td key="col1">{study.name}</td>
//                                         <td key="col2">
//                                           {study.recordings.length}
//                                         </td>
//                                         <td
//                                           key="col3"
//                                           className="listcard-link"
//                                         >
//                                           <Link
//                                             to={`/study/${study.name}`}
//                                             className="listcard-env"
//                                           >
//                                             View study details
//                                           </Link>
//                                         </td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </Table>{" "}
//                               </div>
//                             </div>
//                           </div>
//                         </Col>
//                       </Row>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <div style={{ margin: "8rem 0" }} />
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

export default Recordings;
