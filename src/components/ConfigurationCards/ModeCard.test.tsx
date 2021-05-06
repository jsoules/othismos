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
})

// test usecolumnformat, showcpu
// useColumnFormat?: boolean
// showCPU?: boolean
// format: FormatType
// onFormatChange: (e: string) => void