// import TeX from '@matejmazur/react-katex'
// import 'katex/dist/katex.min.css'
import { FunctionComponent } from "react"
// import { BlockMath, InlineMath } from 'react-katex'
import ReactMarkdown from 'react-markdown'
import MathJax from 'react-mathjax'
import gfm from 'remark-gfm'
import RemarkMathPlugin from 'remark-math'

interface Props {
    children: string
}

const MarkdownRenderFailed: FunctionComponent<Props> = (props: Props) => {
    const propsWithPlugins = {
        ...props,
        plugins: [
            gfm,
            RemarkMathPlugin,
        ]
    }

    return (
        <MathJax.Provider>
            <div>
                <p>
                    BASIC TEST:
                    <MathJax.Node inline formula={"s_i"} />
                    <MathJax.Node formula={"s_b"} />
                </p>
            </div>
            <ReactMarkdown {...propsWithPlugins} />
        </MathJax.Provider>
    )
}

export default MarkdownRenderFailed