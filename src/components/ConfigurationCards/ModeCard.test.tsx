import { render, screen } from '@testing-library/react'
import ModeCard from './ModeCard'

describe('Basic rendering tests', () => {
    test("Default values render correctly", () => {
        render(
            <ModeCard
                format={'average'}
                onFormatChange={(e) => {}}
            />
        )
        const desc = screen.getAllByText(/SNR.*threshold/)
        expect(desc[0]).toBeInTheDocument()
    })

    test("CPU option not displayed if toggled off", () => {
        render(
            <ModeCard
                format={'average'}
                onFormatChange={(e) => {}}
            />
        )
        const avgDropdownItem = screen.getByRole("option", { name: /Average.*SNR/ })
        expect(avgDropdownItem).toBeInTheDocument()
        const cpuDropdownItme = screen.queryByRole("option", { name: /compute time/ })
        expect(cpuDropdownItme).toBeNull()
    })

    test("CPU option is displayed if toggled on", () => {
        render(
            <ModeCard
                format={'average'}
                onFormatChange={(e) => {}}
                showCPU={true}
            />
        )
        const cpuDropdownItem = screen.getByRole("option", { name: /compute time/ })
        expect(cpuDropdownItem).toBeInTheDocument()
    })

    test("Column format styles applied when flagged on", () => {
        const { container } = render(
            <ModeCard
                format={'average'}
                onFormatChange={(e) => {}}
                useColumnFormat={true}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std-col card__std-top', {exact: true})
    })
    
    test("Column format styles not applied when flagged off", () => {
        const { container } = render(
            <ModeCard
                format={'average'}
                onFormatChange={(e) => {}}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std', {exact: true})
    })
})
