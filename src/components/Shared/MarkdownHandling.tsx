import { Fragment, FunctionComponent } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Sidebar from './Sidebar'

export type Copy = {
    Title: string           // overall heading for the page content
    Sections: Section[]     // set of section cards
}

// TODO: Not super happy about this 'flavor' thing...
export type Section = {
    Header: string          // heading for the section
    Content: string         // markdown content
    Label: string           // How the section should appear in the sidebar ("Recording Types")
    Tag: string             // text ID to use for sidebar identification ("recordingtypes")
    // distinguish Cards, ListCards, others that need special treatment
    Flavor?: 'static' | 'list' | 'preloader' | 'special'
}

export type ContentHook = (Section: Section) => JSX.Element | undefined

export type CopyHook = { Copy: Copy, ContentHook: ContentHook, AdditionalContent?: JSX.Element }

export type SectionHook = { Section: Section, ContentHook: ContentHook }

export const getCanonicalSectionTag = (raw: string): string => {
    return raw.toLowerCase().replace(/\s+/g, '')
}

export const parseMarkdownToContentCards = (rawMd: string): Copy => {
    // Expect input to be well-formatted markdown with a single top-level
    // header (# xxxxx) and several sections consisting of a second-level
    // header (## yyyy) on their own line, followed by chunks of well-formed
    // markdown only.
    let copy: Copy = { Title: 'Parse error', Sections: [] }

    // Regex matches a line that begins with '# ' and captures the rest
    // of its content, then skips any whitespace and returns the balance
    // of the markdown as the next capture group. So match[1] has the
    // intended overall title and match[2] has the rest of the file.
    const titleParser = /^# (.+)$\s*([\S\s]*)/m
    const match = rawMd.match(titleParser)
    if (!match || match.length < 3) return copy // match failed or empty file--abort

    // Splits the 'rest of file'. Regex matches all second-level header lines ('## ...')
    // and any following whitespace, while capturing the H2 text to use as the section header.
    // The first element (in the markdown, anything between the H1 line and the
    // first H2 line) *should* be empty--we're definitely going to ignore it!
    let sections = match[2].split(/^## (.+)$/m)

    // if match failed, there wasn't at least one section, or there's an odd number of
    // 'good' sections
    if (!sections || sections.length < 3 || (sections.length - 1) % 2 !== 0) return copy
    sections.shift()
    // Now we have a list of pairs of header and content. Let's pair them up:
    let pairs = sections
        .map((element, i, sections) => {
            return [element, (i+1 < sections.length) ? sections[i+1] : null]
        })
        .filter((element, i) => !(i%2))
    // pairs is now an array of two-element string arrays, where the first element is
    // the header and the second element is the (Markdown) section content.

    // So finally let's build some Sections. We'll use any parenthesized content
    // in the section header as the sidebar label; if none, we'll use the exact header.
    // The corresponding item ID for the tag system should be the sidebar label,
    // normalized to lowercase and with spaces removed.
    pairs.forEach((pair) => {
        if (pair.length > 2 || !pair[0] || !pair[1]){
            console.log(`Error in pair: ${pair}. Skipping...`)
            return
        }
        let header = (pair[0] ?? '').replace(/\s+$/g, '')
        let m = (header).match(/^(.+)\s+\((.*)\)$/)
        copy.Sections.push({
            Header: m ? m[1] : pair[0],
            Content: pair[1],
            Label: m ? m[2] : pair[0],
            Tag: getCanonicalSectionTag(m ? m[1] : pair[0]),
            Flavor: 'static'
        })
    })
    copy.Title = match[1]

    return copy
}

export const PageSidebar: FunctionComponent<Copy> = (Props: Copy) => {
    const sidebarItems = Props.Sections.map(
        (section) => {
            return {
                name: section.Label,
                value: section.Tag
            }
        }
    )
    return (
        <Col xl={2} md={3} sm={12} className="sidebar">
            <Sidebar listItems={sidebarItems} listTitle={Props.Title} />
        </Col>
    )    
}

export const PageCopy: FunctionComponent<CopyHook> = (Props: CopyHook) => {
    return (
        <Col xl={10} md={9} sm={12} className="page__body">
            <Container className="container__heatmap">
                <Row className="subcontainer justify-content-md-center">
                    <Col lg={12} sm={12} xl={12}>
                        <div className="intro">
                            <p className="big">{Props.Copy.Title}</p>
                        </div>
                    </Col>
                </Row>
                { Props.Copy.Sections.map(item => PageCard({Section: item, ContentHook: Props.ContentHook})) }
                { Props.AdditionalContent }
            </Container>
        </Col>
    )
}

const PageCard: FunctionComponent<SectionHook> = (Props: SectionHook) => {
    const customElement = Props.ContentHook(Props.Section) ?? <ReactMarkdown children={Props.Section.Content} />
    return (
        <Fragment>
            <div className="finder" id={Props.Section.Tag} />
            <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                        <div className="content">
                            <div className="card__label">
                                <p>
                                    <strong>{Props.Section.Header}</strong>
                                </p>
                            </div>
                            <div className="card__footer">
                                <hr />
                                {customElement}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>    
    )
}
