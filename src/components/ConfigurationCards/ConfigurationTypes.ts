export type SliderFormat = 'average' | 'count' | 'cpu'

export type MetricType = 'accuracy' | 'precision' | 'recall'

export interface SliderProps {
    format: SliderFormat
    metric: MetricType
    value: number
    useColumnFormat?: boolean
    onValueChange: () => void
}

export interface MetricProps {
}

export interface ModeProps {
}