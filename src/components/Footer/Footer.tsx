import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import github from './github-white.svg'


const Footer = () => {
    return (
        <footer className="footer">
          <p className="updated">Spike-front client updated on October 16, 2020 (3:38 PM)</p>
          <div className="outro">
            <p className="footer__description">
              SpikeForest is a website and open source computing framework for evaluating and
              comparing spike sorting algorithms for neurophysiology data analysis. It is a project of
              the Center for Computational Mathematics at the Flatiron Institute.
            </p>
          </div>
  
          <ul className="footer__links x-small">
            <li className="x-small">
              <Link to="/about">
                About
              </Link>
            </li>
            <li className="x-small">
              <a target="_blank" rel="noopener noreferrer" href="https://simonsfoundation.org">
                Simons Foundation
              </a>
            </li>
            <li className="x-small">
              <a target="_blank" rel="noopener noreferrer" href="https://flatironinstitute.org">
                Flatiron Institute
              </a>
            </li>
            <li className="x-small">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/flatironinstitute/spikeforest2"
              >
                SpikeForest Analysis Framework
              </a>
            </li>
            <li className="x-small">
              <Link to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="footer__interwebs">
            <div className="interwebs__outer">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/flatironinstitute/spike-front"
                className="github-logo"
              >
                <img alt="spikeforest logo" src={github} height="24" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/flatironinstitute/spikeforest2"
                className="github-logo"
              >
                <img alt="spikeforest logo" src={github} height="24" />
              </a>
            </div>
          </div>
        </footer>
      );
}

export default Footer
