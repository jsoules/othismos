import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ExpandingHeatmapTable from './components/ExpandingHeatmapTable';
import './index.css';
import { expandingHeatmapTableSampleHeader as header, expandingHeatmapTableSampleRows as tableRows } from './sampleData/expandingHeatmapTableTestData';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ExpandingHeatmapTable
          header={header}
          rows={tableRows}
          onCellSelected={(cell) => {alert (`Selected cell ${cell.id}`)}}
        />
      </BrowserRouter>
      <div>learn react or the default test will be sad at you</div>
    </React.Fragment>
  );
}

export default App;
