// import React from 'react';
// import logo from './logo.svg';
import React from 'react';
import { expandingHeatmapTableSampleHeader as header, expandingHeatmapTableSampleRows as tableRows } from '../data/expandingHeatmapTableTestData';
import './App.css';
import ExpandingHeatmapTable from './components/ExpandingHeatmapTable';

function App() {
  return (
    <React.Fragment>
      <ExpandingHeatmapTable
        header={header}
        rows={tableRows}
        onCellSelected={(cell) => {alert (`Selected cell ${cell.id}`)}}
      />
      <div>learn react or the default test will be sad at you</div>
    </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //   </header>
    // </div>
  );
}

export default App;
