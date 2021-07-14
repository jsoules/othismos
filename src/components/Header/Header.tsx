import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo-no-icon.svg";


// const debounce = (fn: Function, ms: number = 1000) => {
//     let timer: ReturnType<typeof setTimeout>
//     return function (this: any, ...args: any[]) {
//         clearTimeout(timer)
//         timer = setTimeout(() => fn.apply(this, args), ms)
//     }
// }

const Header = () => {
    // NOTE: Code equivalent to this existed in the old spikeforest.
    // However, it doesn't seem to have actually done anything...
    // const [dimensions, setDimensions] = useState({
    //     // height: window.innerHeight,
    //     // width: window.innerWidth
    //     height: 1500,
    //     width: 341
    // })
    // useEffect(() => {
    //     const debouncedUpdateDimensions = debounce(() => {
    //         // console.log(`Dims were ${JSON.stringify(dimensions)}`)
    //         const newDim = window.innerWidth < 500
    //             ? { width: 450, height: 102 }
    //             : {
    //                 width: window.innerWidth - 100,
    //                 height: Math.round((window.innerWidth - 100) / 4.4)
    //             }
    //         setDimensions(newDim)
    //         // console.log(`Dims now ${JSON.stringify(newDim)}`)
    //     }, 500)
    //     window.addEventListener('resize', debouncedUpdateDimensions)

    //     return () => { window.removeEventListener('resize', debouncedUpdateDimensions) }
    // })

    return (
        <div className="navbar__container">
            <Nav className="navbar__white">
                <LinkContainer exact to="/">
                    <Navbar.Brand className="navbar__left">
                        <img
                        alt="spikeforest logo"
                        src={logo}
                        height="48"
                        className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </LinkContainer>
                    <Nav className="navbar__right">
                        <LinkContainer exact to="/">
                            <Nav.Link eventKey="/">Heatmap</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/recordings">
                            <Nav.Link eventKey="/recordings">Recordings</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/algorithms">
                            <Nav.Link eventKey="/algorithms">Algorithms</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/metrics">
                            <Nav.Link eventKey="/metrics">Metrics</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/archive">
                            <Nav.Link eventKey="/archive">Archive</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link eventKey="/about">About</Nav.Link>
                        </LinkContainer>
                    </Nav>
            </Nav>
      </div>
    )
}

export default Header;
