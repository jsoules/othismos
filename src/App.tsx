import React from "react"
import { Card, Container } from "react-bootstrap"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { StudySet } from './calc/jsonTypes'
import About from "./components/About/About"
import Algorithms, { AlgorithmEntry } from "./components/Algorithms/Algorithms"
// import ConfigPanelWrapper from "./components/ConfigPanelWrapper"
import ExpandingHeatmapTable from "./components/ExpandingHeatmapTable"
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Recordings from './components/Recordings/RecordingsPage'
import Preloader from "./components/Shared/Preloader"
// import MetricsDescription from "./components/MetricsDescription/MetricsDescription"
import "./index.css"
import algosJson from "./sampleData/algos.json"
import {
    expandingHeatmapTableSampleHeader as header,
    expandingHeatmapTableSampleRows as tableRows
} from "./sampleData/expandingHeatmapTableTestData"
import studysetsjson from './sampleData/studysets-from-api.json'


// import { basicConfig } from "./sampleData/HeatmapConfigTestData"

function App() {
  // const columnConfig = {...basicConfig, useColumnFormat: true}
  // const cpuConfig = {...basicConfig, format: 'cpu' as FormatType, showCPU: true }

  // NOTE: this is for testing, the data will actually need to be pulled from an API
  const studysets: StudySet[] = studysetsjson.map((s) => { return {
        _id: s._id,
        name: s.name,
        description: s.description,
        studies: s.studies.map((study) => {
            return {
                recordings: study.recordings.map((recording) => {return {
                    _id: recording._id,
                    name: recording.name,
                    studyName: recording.studyName,
                    studySetName: recording.studySetName,
                    directory: recording.directory,
                    firingsTrue: recording.firingsTrue,
                    sampleRateHz: recording.sampleRateHz,
                    numChannels: recording.numChannels,
                    durationSec: recording.durationSec,
                    numTrueUnits: recording.numTrueUnits,
                    spikeSign: recording.spikeSign > 0 ? 1 : -1
                }}),
                _id: study._id,
                name: study.name,
                studySetName: study.studySetName
            }
        })
      }
    })

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
            <hr />
                <Recordings Sets={studysets} />
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
