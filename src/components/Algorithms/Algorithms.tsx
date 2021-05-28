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
                <Col xl={2} md={3} sm={2} className="sidebar">
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


// class Algorithms extends Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       rows: []
//     };
//     // this.handleClick = this.basename.bind(this); // QUERY: Why this??
//   }

//   // I don't think we need these? QUERY
//   componentDidMount() {
//     if (this.props.algorithms && this.props.algorithms.length) {
//       this.filterActives();
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.algorithms !== prevProps.algorithms) {
//       this.filterActives();
//     }
//   }

//   basename(path) {
//     return path.split("/").reverse()[0];
//   }

  // parseDescription(markdown) {
  //   let par1 = markdown.split("Description")[1];
  //   let useable = par1.split("## References")[0];
  //   return useable;
  // }

  // sortRows(rows) {
  //   let sorted = rows.sort((a, b) => {
  //     if (a.wrapper && !b.wrapper) return -1;
  //     if (!a.wrapper && b.wrapper) return 1;
  //     let textA = a.raw_label.toUpperCase();
  //     let textB = b.raw_label.toUpperCase();
  //     return textA < textB ? -1 : textA > textB ? 1 : 0;
  //   });
  //   return sorted;
  // }

  // Curiously, it's named 'filter' but it never applies any filtering.
  // QUERY: THIS
  // filterActives() {
  //   let rows = this.props.algorithms.map(alg => {
  //     let row = {
  //       raw_label: alg.label,
  //       label: alg.label,
  //       processor_name: alg.processor_name,
  //       authors: alg.authors,
  //       notes: alg.notes,
  //       environment: "",
  //       wrapper: "",
  //       markdown: "",
  //       markdown_link: "",
  //       website: "/",
  //       wrapper_link: "/",
  //       env_name: "tbd",
  //       env_link: "/"
  //     };
  //     if (alg.dockerfile) { // always true
  //       row.environment = `<a href="${
  //         alg.dockerfile
  //       }" target="_blank">${this.basename(alg.dockerfile)}</a>`;
  //       row.env_name = "Docker";
  //       row.env_link = alg.dockerfile;
  //     } else if (alg.environment) { // thus can't happen
  //       row.environment = `<span>${alg.environment}</span>`;
  //       row.env_name = alg.environment;
  //     }
  //     if (alg.wrapper) {
  //       // row.wrapper is never used
  //       row.wrapper = `<a href="${alg.wrapper}" target="_blank">${this.basename(
  //         alg.wrapper
  //       )}</a>`;
  //       row.wrapper_link = alg.wrapper;
  //     }
  //     if (alg.markdown_link) {
  //       row.markdown_link = `<a href="${
  //         alg.markdown_link
  //       }" target="_blank">${this.basename(alg.markdown_link)}</a>`;
  //     }
  //     if (alg.markdown) {
  //       row.markdown = this.parseDescription(alg.markdown);
  //     }
  //     if (alg.website) {
  //       // NOTHING EVER ACTUALLY USES THIS
  //       row.label = `<a href="${alg.website}" target="_blank">${alg.label}</a>`;
  //       row.website = alg.website;
  //     }
  //     return row;
  //   });
  //   let sorted = this.sortRows(rows);
  //   this.setState({ rows: sorted });
  // }

//   render() {
//     // let loading = isEmpty(this.state.rows);
//     // let listCards;
//     // if (this.state.rows) {
//     //   listCards = this.state.rows.map((row, index) => (
//     //     <AlgorithmCard record={row} key={index} />
//     //   ));
//     // }
//     // let sidebarItems = this.state.rows.map(row => ({
//     //   name: toTitleCase(row.raw_label.replace(/_/g, " ").toLowerCase()),
//     //   value: row.raw_label
//     // }));
//     // sidebarItems.unshift({ name: "Overview", value: "overview" });
//     return (
//       <div>foo</div>)
//         {/* {loading ? (
//           <Container className="container__heatmap">
//             <Card>
//               <Card.Body>
//                 <Preloader />
//               </Card.Body>
//             </Card>
//           </Container>
//         ) : (
//           <Container className="container-sidebar">
//             <Row noGutters>
//               <Col xl={2} md={3} sm={2} className="sidebar">
//                 <Sidebar
//                   listItems={sidebarItems}
//                   listTitle={"Algorithms In Use"}
//                 />
//               </Col>
//               <Col xl={10} md={9} sm={12} className="page__body">
//                 <Container className="container__heatmap">
//                   <Row className="subcontainer justify-content-md-center">
//                     <Col lg={12} sm={12} xl={12}>
//                       <div className="intro">
//                         <p className="big">Algorithms</p>
//                       </div>
//                     </Col>
//                   </Row>
//                   <div className="finder" id="overview" />
//                   <Row className="subcontainer justify-content-md-center">
//                     <Col lg={12} sm={12} xl={12}>
//                       <div className="card card__std">
//                         <div className="content">
//                           <div className="card__label">
//                             <p>
//                               <strong>Overview</strong>
//                             </p>
//                           </div>
//                           <div className="card__footer">
//                             <hr />
//                             <p>
//                               {" "}
//                               Generally speaking, a spike sorting algorithm
//                               takes in an unfiltered multi-channel timeseries
//                               (aka, recording) and a dictionary of algorithm
//                               parameters and outputs a list of firing times and
//                               associated integer unit labels. This page lists
//                               the spike sorting codes we run, as well as some
//                               that have yet to be incorporated. Most of the
//                               codes were developed at other institutions; two of
//                               them are in-house.
//                             </p>
//                             <p>
//                               {" "}
//                               SpikeForest uses Python wrappers to implement the
//                               algorithms. Links to those may be found in the
//                               "Wrapper" links above. For the non-MATLAB sorters,
//                               we use singularity containers (similar to docker
//                               containers) in order to ensure a reproducible
//                               compute environment. In those cases, links to the
//                               docker files (environment presciptions) are
//                               provided. We almost always use the default
//                               parameters of the wrappers, but some may be
//                               overriden in the{" "}
//                               <a
//                                 href="https://github.com/flatironinstitute/spikeforest/tree/master/working/main_analysis"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 analysis configuration files
//                               </a>
//                               .
//                             </p>
//                             <p>
//                               Wrappers were created in collaboration with the{" "}
//                               <a
//                                 href="https://github.com/SpikeInterface/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 SpikeInterface
//                               </a>{" "}
//                               project. The goal is to ultimately merge these
//                               with the corresponding wrappers in
//                               SpikeInterface/SpikeToolkit.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </Col>
//                   </Row>
//                   <Row className="subcontainer-final justify-content-md-center">
//                     {listCards}
//                   </Row>
//                 </Container>
//               </Col>
//             </Row>
//           </Container>
//         )}
//       </div>
//     ) */}
//   }
// }

export default Algorithms
