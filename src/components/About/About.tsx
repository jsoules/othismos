import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ReactMarkdown from 'react-markdown'
import Sidebar from "../Shared/Sidebar"
import aboutBackground from './AboutBackground.md'
import aboutCitation from './AboutCitation.md'
import aboutCredits from './AboutCredits.md'
import aboutFeedback from './AboutFeedback.md'
import aboutFuture from './AboutFuture.md'
import AboutGraphicalAbstracts from "./AboutGraphicalAbstracts"
import aboutOverview from './AboutOverview.md'
import aboutReferences from './AboutReferences.md'
import aboutReproducing from './AboutReproducing.md'

interface AboutItem {
    name: string
    value: string
    header: string
    content: JSX.Element | string
}

const About = () => {
    const [overviewMd, setOverviewMd] = useState("")
    const [citationMd, setCitationMd] = useState("")
    const [reproducingMd, setReproducingMd] = useState("")
    const [feedbackMd, setFeedbackMd] = useState("")
    const [creditsMd, setCreditsMd] = useState("")
    const [refsMd, setRefsMd] = useState("")
    const [backgroundMd, setBackgroundMd] = useState("")
    const [futureMd, setFutureMd] = useState("")
    useEffect(() => {
        const easyFetch = ((md: string, set: any) => {
            fetch(md)
            .then((res) => res.text())
            .then((text) => set(text))
        })
        // fetch(aboutOverview)
        // .then((res) => res.text())
        // .then((text) => setOverviewMd(text))
        easyFetch(aboutOverview, setOverviewMd)
        easyFetch(aboutCitation, setCitationMd)
        easyFetch(aboutReproducing, setReproducingMd)
        easyFetch(aboutFeedback, setFeedbackMd)
        easyFetch(aboutCredits, setCreditsMd)
        easyFetch(aboutReferences, setRefsMd)
        easyFetch(aboutBackground, setBackgroundMd)
        easyFetch(aboutFuture, setFutureMd)
    }, [])

    const listItems = [
        { name: "Overview",     value: "overview",    header: "Overview",
            content: <Row><ReactMarkdown children={overviewMd} /><AboutGraphicalAbstracts /></Row> },
        { name: "Citation",     value: "citation",    header: "Citation", 
            content: <ReactMarkdown children={citationMd} /> },
        { name: "Reproducing",  value: "reproducing", header: "Running locally",  
            content: <ReactMarkdown children={reproducingMd} /> },
        { name: "Feedback",     value: "feedback",    header: "Feedback",  
            content: <ReactMarkdown children={feedbackMd} /> },
        { name: "Credits",      value: "credits",     header: "Credits",  
            content: <ReactMarkdown children={creditsMd} /> },
        { name: "References",   value: "references",  header: "References",  
            content: <ReactMarkdown children={refsMd} /> },
        { name: "Background",   value: "background",  header: "Background and related projects",  
            content: <ReactMarkdown children={backgroundMd} /> },
        { name: "Future plans", value: "futureplans", header: "Future plans",  
            content: <ReactMarkdown children={futureMd} /> },
      ];
  

    return(
        <div>
            <Container className="container-sidebar">
                <Row noGutters>
                    <Col xl={2} md={3} sm={12} className="sidebar">
                        <Sidebar listItems={listItems} listTitle={"About"} />
                    </Col>
                    <Col xl={10} md={9} sm={12} className="page__body">
                        <Container className="container__heatmap">
                            <Row className="subcontainer justify-content-md-center">
                                <Col lg={12} sm={12} xl={12}>
                                    <div className="intro">
                                        <p className="big">About SpikeForest</p>
                                    </div>
                                </Col>
                            </Row>
                            {listItems.map(item => <AboutCard {...item} key={item.value} />)}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const AboutCard: FunctionComponent<AboutItem> = (Props: AboutItem) => {
    return (
        <Fragment>
            <div className="finder" id={Props.value} />
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
                                {Props.content}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default About;
