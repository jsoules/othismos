import synthMagland_base from '../../data/studyanalysisresults-synth-magland.json'
import studysets_base from '../../data/studysets.json'
import { StudyAnalysisResultSet, StudySet } from './jsonTypes'

const studysets: StudySet[] = studysets_base as any as StudySet[]
const synthMagland: StudyAnalysisResultSet = synthMagland_base as any as StudyAnalysisResultSet

test('minimal JSON consistency check', () => {
    expect(studysets[0]._id).toEqual('5e795ef5d4f81c62f9a1aa45')
    expect(synthMagland.studySetName).toEqual('SYNTH_MAGLAND')
})
