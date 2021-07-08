import { useEffect, useState } from 'react'
import MarkdownRenderKatex from './MarkdownRenderKatex'
import mdPath from './MetricsDescription.md'


const MetricsDescription = () => {
    const [md, setMd] = useState('')
    useEffect(() => {
        fetch(mdPath)
        .then((res) => res.text())
        .then((text) => setMd(text))
    })

    return(
        <MarkdownRenderKatex children={md} />
    )
}

export default MetricsDescription