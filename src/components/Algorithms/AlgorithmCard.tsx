// Replaces former ListCard

import { FunctionComponent } from "react"
import { Col } from "react-bootstrap"
import ReactMarkdown from 'react-markdown'
import { isEmpty } from "../util"
import { AlgorithmEntry } from "./Algorithms"

const parseDescription = (rawMarkdown: string) => {
    // Assume markdown is a single string, with a name or something, followed
    // by a heading ## Description, followed by some more markdown,
    // ending in a ## References section we don't care about.
    // Return only the part between the ## Description header and the start of the
    // ## References header.
    // This is brittle but works well enough for now.
    const description = rawMarkdown.split("Description")[1]
    const before_references = description.split("## References")[0]
    return before_references
  }

const AlgorithmCard: FunctionComponent<AlgorithmEntry> = (Props: AlgorithmEntry) => {
    return (
        <Col lg={12} sm={12} xl={12}>
            <div className="finder" id={Props?.label || "undefined-algorithm"} />
            <div className="listcard">
                {isEmpty(Props) ? //TODO: is this still needed/possible?
                <h3>...</h3> :
                <div className="listcard-content">
                    <div className="listcard-section">
                        <div className="listcard-top">
                            <a href={Props.website}>
                                <p className="listcard-title">
                                    {Props.label}
                                </p>
                            </a>
                            {/* Probably don't need the following check */}
                            {Props.dockerfile ? (
                                <a
                                    className="listcard-env"
                                    href={Props.dockerfile}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    View Docker
                                </a>
                            ) : (
                                <span className="listcard-env">
                                    {Props.env_name} {/*SHOULD BE UNREACHABLE?*/}
                                </span>
                            )}
                        </div>
                        <p className="listcard-authors">
                            <span>By</span> {Props.authors}
                        </p>
                    </div>
                    <div className="listcard-section">
                        <div className="listcard-copy">
                            <ReactMarkdown children={parseDescription(Props.markdown)} linkTarget="_blank"/>
                        </div>
                    </div>
                    <div className="listcard-section__bottom">
                        <a className="listcard-env" href={Props.wrapper} target="_blank" rel="noreferrer noopener">
                            View Wrapper
                        </a>
                        <a className="listcard-env" href={Props.website} target="_blank" rel="noreferrer noopener">
                            View Algorithm Website
                        </a>
                    </div>
                </div>}
            </div>
        </Col>
    )
}

export default AlgorithmCard
