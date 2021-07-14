import 'katex/dist/katex.min.css'
import { FunctionComponent } from "react"
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import gfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface Props {
    children: string
}

const MarkdownRenderKatex: FunctionComponent<Props> = (props: Props) => {
    const propsWithPlugins = {
        ...props,
        remarkPlugins: [remarkMath, gfm],
        rehypePlugins: [rehypeKatex]
    }

    return (
        <ReactMarkdown {...propsWithPlugins} />
    )
}

export default MarkdownRenderKatex