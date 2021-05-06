import React, { FunctionComponent } from "react"
import Slider from "react-rangeslider"
import { toTitleCase } from '../util'
import { FormatType, MetricType, SliderProps } from './ConfigurationTypes'

const getSliderCopy = (format: FormatType, metric: MetricType) => {
    switch (format) {
        case 'average':
            return "Minimum SNR"
        case 'count':
            return `Minimum ${toTitleCase(metric)}`
        case 'cpu':
            return "Maximum CPU Time"
        default:
            throw new Error('Unsupported slider format in getSliderCopy().')
    }
}

const getSliderStep = (format: FormatType) => {
    switch (format) {
        case 'average':
            return 1
        case 'count':
            return 0.05
        case 'cpu':
            return 5
        default:
            throw new Error('Unsupported slider format in getSliderStep().')
    }
}

const getSliderMax = (format: FormatType) => {
    switch (format) {
        case 'average':
            return 50
        case 'count':
            return 1
        case 'cpu':
            return 1000
        default:
            throw new Error('Unsupported slider format in getSliderMax().')
    }
}

const getRoundedValue = (step: number, value: number) => {
    const quantizedToStepSize = Math.round(value / step) * step
    return Math.round(quantizedToStepSize * 100) / 100
}


const SliderCard: FunctionComponent<SliderProps> = (Props: SliderProps) => {
    const extraClass = Props.useColumnFormat ? 'card__std-col' : 'card__std'
    const step = getSliderStep(Props.format)
    return (
        <div className={`card ${extraClass}`}>
            <div className="content">
                <div className="card__label">
                    <p>
                        {getSliderCopy(Props.format, Props.metric)}: <strong>{Props.value}</strong>
                    </p>
                </div>
                <div className="card__footer">
                    <hr />
                    <div className="slider__horizontal">
                        <Slider 
                            min={0}
                            max={getSliderMax(Props.format)}
                            value={getRoundedValue(step, Props.value)}
                            step={getSliderStep(Props.format)}
                            orientation="horizontal"
                            onChangeComplete={Props.onValueChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderCard;

