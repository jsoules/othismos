import { useEffect, useState } from 'react'
// import ReactMarkdown from 'react-markdown'
// import MathJax from 'react-mathjax'
// import RemarkMathPlugin from 'remark-math'
import MarkdownRenderKatex from './MarkdownRenderKatex'
import mdPath from './MetricsDescription.md'


const MetricsDescription = () => {
    const [md, setMd] = useState('')
    useEffect(() => {
        fetch(mdPath)
        .then((res) => res.text())
        .then((text) =>  {
            console.log(`Got text ${text}`)
            setMd(text)
        })
    })

    // const rmdConfig = {
    //     plugins: [ RemarkMathPlugin ],
    //     renderers: {
    //         math: (props: any) => <MathJax.Node formula={props.value}/>,
    //         inlineMath: (props: any) => <MathJax.Node inline formula={props.value} />
    //     },
    //     children: md
    // }
    return(
        <div>
            {/* <div>
                <p>Raw output from ReactMarkdown between the rules:</p>
                <hr />
                    <ReactMarkdown {...rmdConfig} />
                <hr />
            </div> */}
            <MarkdownRenderKatex children={md} />
        </div>
    )
}

export default MetricsDescription