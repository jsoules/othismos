import { FunctionComponent, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import ReactMarkdown from 'react-markdown'
import { Copy, PageCopy, PageSidebar, parseMarkdownToContentCards, Section } from '../Shared/MarkdownHandling'
import aboutMd from './AboutContent.md'
import AboutGraphicalAbstracts from "./AboutGraphicalAbstracts"

const About = () => {
    const [copyMd, setCopyMd] = useState("")
    useEffect(() => {
        fetch(aboutMd)
        .then((res) => res.text())
        .then((text) => setCopyMd(text))
    })

    const content: Copy = parseMarkdownToContentCards(copyMd)
    // This is hacky, ought to find a better way to handle it in future
    if (content.Sections[0]) content.Sections[0].Flavor = "special"

    return(
        <div>
            <Container className="container-sidebar">
                <Row noGutters>
                    <PageSidebar Title={"About"} Sections={content.Sections} />
                    <PageCopy Copy={content} ContentHook={CardHook} />
                </Row>
            </Container>
        </div>
    )
}

const CardHook = (Props: Section) => {
    return (
        Props.Flavor === 'special'
            ? <OverviewCardWithImages {...Props} />
            : undefined
    )
}

const OverviewCardWithImages: FunctionComponent<Section> = (Props: Section) => {
    return (
        <Row>
            <ReactMarkdown children={Props.Content} />
            <AboutGraphicalAbstracts />
        </Row>
    )
}

export default About;
