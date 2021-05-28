import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import logo from "./logo-animation.gif";
import "./preloader.css";

interface PreloaderProps {
    message?: string,
    fetchFailure?: boolean
}

const Preloader: FunctionComponent<PreloaderProps> = (Props: PreloaderProps) => {
    const copy = Props.message
        ? Props.message
        : Props.fetchFailure
            ? "Unable to fetch data. Please refresh the page and try again."
            : "Loading"
    const subcopy = (!Props.message && Props.fetchFailure)
        ? (
            <div>
                <br />
                <p>
                    If you see this message repeatedly, please check your
                    internet connection, as you may have insufficient
                    bandwidth to load this site.
                </p>
            </div>
        ) : ( // QUERY: Why this?
            <span><span>.</span><span>.</span><span>.</span></span>
        )
    return (
        <Container className="preloader">
            <h4 className="preloader__header">
                {copy}
                {subcopy}
            </h4>
            <img src={logo} className="preloader__image" alt="spinning logo" />
        </Container>
    )
}

export default Preloader