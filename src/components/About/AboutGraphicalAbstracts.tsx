import React, { FunctionComponent } from "react"
import { Col, Row } from "react-bootstrap"
import ModalImage from "react-modal-image"
import long from "./SpikeForest_Long.jpg"
import short from "./SpikeForest_Short.jpg"

const AboutGraphicalAbstracts: FunctionComponent = () => {
    return (
        <Col lg={6} md={6} sm={12}>
            <p>
                <i>Click to expand graphical abstracts</i>
            </p>
            <Row>
                {" "}
                <Col lg={6} md={6} sm={12}>
                    {" "}
                    <ModalImage
                        small={short}
                        large={short}
                        className="graphic-abstract"
                        alt="SpikeForest Graphical Abstract"
                    />
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <ModalImage
                        small={long}
                        large={long}
                        className="graphic-abstract"
                        alt="Spike Sorting Graphical Abstract"
                    />
                </Col>
            </Row>
        </Col>
    )
}

export default AboutGraphicalAbstracts