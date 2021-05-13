import { BrowserRouter } from "react-router-dom"
import "./App.css"
import ConfigPanelWrapper from "./components/ConfigPanelWrapper"
import ExpandingHeatmapTable from "./components/ExpandingHeatmapTable"
import MetricsDescription from "./components/MetricsDescription/MetricsDescription"
import "./index.css"
import {
  expandingHeatmapTableSampleHeader as header,
  expandingHeatmapTableSampleRows as tableRows
} from "./sampleData/expandingHeatmapTableTestData"
// import { basicConfig } from "./sampleData/HeatmapConfigTestData"

function App() {
  // const columnConfig = {...basicConfig, useColumnFormat: true}
  // const cpuConfig = {...basicConfig, format: 'cpu' as FormatType, showCPU: true }
  return (
    <div className="wrapper">
      <div className="page__body page__body--alert">
        <div style={{ padding: 25 }}>
          <BrowserRouter>
            <ExpandingHeatmapTable
              header={header}
              rows={tableRows}
              onCellSelected={(cell) => {
                alert(`Selected cell ${cell.id}`)
              }}
            />
          </BrowserRouter>
        </div>
        <div>
            <hr />
            <p>Whole Thing</p>
            <ConfigPanelWrapper />
            <hr />
        </div>
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
        <div>learn react or the default test will be sad at you</div>
      </div>
      <hr />
      <MetricsDescription />
    </div>
  )
}

export default App
