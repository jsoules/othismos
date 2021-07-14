import React from "react"
import { Card, Container } from "react-bootstrap"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import About from "./components/About/About"
import Algorithms, { AlgorithmEntry } from "./components/Algorithms/Algorithms"
// import ConfigPanelWrapper from "./components/ConfigPanelWrapper"
import ExpandingHeatmapTable from "./components/ExpandingHeatmapTable"
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Preloader from "./components/Shared/Preloader"
// import MetricsDescription from "./components/MetricsDescription/MetricsDescription"
import "./index.css"
import algosJson from "./sampleData/algos.json"
import {
    expandingHeatmapTableSampleHeader as header,
    expandingHeatmapTableSampleRows as tableRows
} from "./sampleData/expandingHeatmapTableTestData"


// import { basicConfig } from "./sampleData/HeatmapConfigTestData"

function App() {
  // const columnConfig = {...basicConfig, useColumnFormat: true}
  // const cpuConfig = {...basicConfig, format: 'cpu' as FormatType, showCPU: true }
  return (
    <BrowserRouter>
        <div className="wrapper">
            <Header />
            <div className="page__body page__body--alert">
                <div style={{ padding: 25 }}>
                    <ExpandingHeatmapTable
                        header={header}
                        rows={tableRows}
                        onCellSelected={(cell) => {
                            alert(`Selected cell ${cell.id}`)
                        }}
                    />
                </div>
                <div>learn react or the default test will be sad at you</div>
            </div>
        </div>
        <div className="wrapper">
            {/* <div>
                <hr />
                <ConfigPanelWrapper />
                <hr />
            </div> */}
            <hr />
                <About />
            <hr />
            <div>
                <p>This is what a fetch failure should look like:</p>
                <div className="page__body">
                    <Container className="container__heatmap">
                        <Card>
                            <Card.Body>
                                <Preloader fetchFailure={true} />
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
            <hr />
            <p>This is the Algorithms section:</p>
            <Algorithms algorithms={algosJson.algorithms as AlgorithmEntry[]} />
            {/* <div>
                <hr />
                <p>Row configuration</p>
                <ConfigurationPanel {...basicConfig}/>
            </div>
            <div>
                <hr />
                <p>CPU Row config</p>
                <ConfigurationPanel {...cpuConfig}/>
            </div>
            <div>
                <hr />
                <p>Column config</p>
                <ConfigurationPanel {...columnConfig}/>
            </div> */}
            {/* <MetricsDescription /> */}
            <Footer />
        </div>
    </BrowserRouter>
  )
}

export default App
