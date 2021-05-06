export type FormatType = 'average' | 'count' | 'cpu'

export type MetricType = 'accuracy' | 'precision' | 'recall'

export interface SliderProps {
    format: FormatType
    metric: MetricType
    value: number
    useColumnFormat?: boolean
    onValueChange: () => void
}

export interface MetricProps {
}

export interface ModeProps {
    useColumnFormat?: boolean
    showCPU?: boolean
    format: FormatType
    onFormatChange: (e: string) => void
}