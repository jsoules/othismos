import { FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'
import { FormatType, ModeProps } from './ConfigurationTypes'

const modes = {
    'average': 'Average metric above SNR threshold',
    'count': 'Number of units found above metric threshold',
    'cpu': 'Estimated average compute time'
}

const ModeCard: FunctionComponent<ModeProps> = (Props: ModeProps) => {
    const extraClass = Props.useColumnFormat ? 'card__std-col card__std-top' : 'card__std'
    const modesList: Array<FormatType> = ['average', 'count']
    if (Props.showCPU) {
        modesList.push('cpu')
    }

    return (
        <div className={`card ${extraClass}`}>
            <div className="content">
                <div className="card__label">
                    <p>
                        Mode: <strong>{modes[Props.format]}</strong>
                    </p>
                </div>
                <div className="card__footer">
                    <hr />
                    <div className="card__form">
                        <Form.Control
                            as="select"
                            size="lg"
                            value={Props.format}
                            onChange={e => Props.onFormatChange(e.target.value)}
                        >
                            {modesList.map(modekey => (
                                <option key={`${modekey}-1`} value={modekey}>
                                    { modes[modekey] }
                                </option>
                            ))}
                        </Form.Control>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeCard
