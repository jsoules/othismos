import { render, screen } from '@testing-library/react'
import MetricCard from './MetricCard'

describe('Basic rendering tests', () => {
    test("Default values render correctly", () => {
        render(
            <MetricCard
                metric={'accuracy'}
                onImputeMissingValuesChange={(value) => {}}
                onMetricChange={() => {}}
            />
        )
        const accText = screen.getByText(/balances precision/)
        expect(accText).toBeInTheDocument()
    })
    test("Imputation state is wired correctly", () => {
        render(
            <MetricCard
                metric={'accuracy'}
                imputeMissingValues={true}
                onImputeMissingValuesChange={(value) => {}}
                onMetricChange={() => {}}
            />
        )
        // Can't seem to find the checkbox element by role...
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement
        expect(checkbox.checked).toEqual(true)
    })
    test("Column format styles applied when flagged on", () => {
        const { container } = render(
            <MetricCard
                metric={'accuracy'}
                useColumnFormat={true}
                onImputeMissingValuesChange={(value) => {}}
                onMetricChange={() => {}}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std-col', {exact: true})
    })
    test("Column format styles not applied when flagged off", () => {
        const { container } = render(
            <MetricCard
                metric={'accuracy'}
                onImputeMissingValuesChange={(value) => {}}
                onMetricChange={() => {}}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std', {exact: true})
    })
})

// onImputeMissingValuesChange: (value: boolean) => void
// onMetricChange: () => void
