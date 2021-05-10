import { FunctionComponent, useState } from 'react'
import { Form } from 'react-bootstrap'
import ConfigurationPanel from './ConfigurationCards/ConfigurationPanel'
import { FormatType, MetricType } from './ConfigurationCards/ConfigurationTypes'

interface MyProps {
}

type CutoffList = {[key in FormatType]: number}

const defaultCutoffs = {
    'average': 8,
    'count': 0.25,
    'cpu': 250
}

const ConfigPanelWrapper: FunctionComponent<MyProps> = (Props: MyProps) => {
    const [format, setFormat] = useState<FormatType>("average")
    const [metric, setMetric] = useState<MetricType>("accuracy")
    const [cutoffValue, setCutoffValue] = useState<number>(8)
    const [imputeMissingValues, setImputeMissingValues] = useState<boolean>(true)
    const [cutoffs, setCutoffs] = useState<CutoffList>(defaultCutoffs)
    const [useColumnFormat, setUseColumnFormat] = useState<boolean>(false)

    const handleFormatChange = (newFormat: string) => {
        const newCutoffs = {...cutoffs}
        newCutoffs[format] = cutoffValue
        const newCutoffValue = cutoffs[newFormat as FormatType]
        setCutoffs(newCutoffs)
        setCutoffValue(newCutoffValue)
        setFormat(newFormat as FormatType)
    }

    return (
        <div>
            <Form.Check
                type="checkbox"
                id="column-row-control"
                inline
                className="card-label-form"
            >
                <Form.Check.Input
                    type="checkbox"
                    checked={useColumnFormat}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUseColumnFormat(e.target.checked)}
                />
                <Form.Check.Label className="input__label">
                    Use column format
                </Form.Check.Label>
            </Form.Check>
            <ConfigurationPanel
                format={format}
                metric={metric}
                cutoffValue={cutoffValue}
                showCPU={true}
                useColumnFormat={useColumnFormat}
                imputeMissingValues={imputeMissingValues}
                onFormatChange={(e: string) => {handleFormatChange(e)}}
                onMetricChange={(e: string) => {setMetric(e as MetricType)}}
                onValueChange={setCutoffValue}
                onImputeMissingValuesChange={setImputeMissingValues}
            />
        </div>
    )
}

export default ConfigPanelWrapper