import { render, screen } from '@testing-library/react'
import SliderCard from './SliderCard'

describe('Basic rendering tests', () => {
    test("Default values render correctly", () => {
        render(
            <SliderCard
                format={'average'}
                metric={'accuracy'}
                cutoffValue={8}
                onValueChange={() => {}}
            />
        )
        const accuracyText = screen.getByText(/SNR/)
        expect(accuracyText).toBeInTheDocument()
        const threshold = screen.getByText(/8/)
        expect(threshold).toBeInTheDocument()
    })
    
    it("Properly title-cases metric name", () => {
        render(
            <SliderCard
                format={'count'}
                metric={'accuracy'}
                cutoffValue={8}
                onValueChange={() => {}}
            />
        )
        const accuracyText = screen.getByText(/Accuracy/)
        expect(accuracyText).toBeInTheDocument()
    })

    test("Column format styles applied when flagged on", () => {
        const { container } = render(
            <SliderCard
                format={'count'}
                metric={'accuracy'}
                cutoffValue={8}
                useColumnFormat={true}
                onValueChange={() => {}}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std-col', {exact: true})
    })

    test("Column format styles not applied when flagged off", () => {
        const { container } = render(
            <SliderCard
                format={'count'}
                metric={'accuracy'}
                cutoffValue={8}
                onValueChange={() => {}}
            />
        )
        expect(container.firstChild).toHaveClass('card card__std', {exact: true})
    })
})

// TODO: Figure out how to use React Testing Library to confirm that
// things happen as expected when you move the slider

