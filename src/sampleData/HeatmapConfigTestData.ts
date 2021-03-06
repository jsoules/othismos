import { HeatmapConfiguration } from "../components/ConfigurationCards/ConfigurationTypes"

export const basicConfig: HeatmapConfiguration = {
    format: 'average',
    metric: 'accuracy',
    cutoffValue: 8,
    onFormatChange: (e: string) => {},
    onMetricChange: () => {},
    onValueChange: () => {},
    onImputeMissingValuesChange: (value: boolean) => {}
}