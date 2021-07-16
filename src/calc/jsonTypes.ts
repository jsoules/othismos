
export interface Recording {
    _id: string,
    name: string,
    studyName: string,
    studySetName: string,
    directory: string,
    firingsTrue: string,
    sampleRateHz: number,
    numChannels: number,
    durationSec: number,
    numTrueUnits: number,
    spikeSign: 1 | -1
}

export interface Study {
    recordings: Recording[],
    _id: string,
    name: string,
    studySetName: string
}

export interface StudySet {
    _id: string,
    name: string,
    description: string,
    studies: Study[],
    __v?: number
}

export type Nullable<T> = T extends null | undefined ? never: T

export interface SortingResult {
    accuracies:         Nullable<number>[],
    precisions:         Nullable<number>[],
    recalls:            Nullable<number>[],
    numMatches:         Nullable<number>[],
    numFalsePositives:  Nullable<number>[],
    numFalseNegatives:  Nullable<number>[],
    cpuTimesSec:        number[],
    _id:                string,
    sorterName:         string
}

// is this better as a validation method rather than a type guard??
export const isSortingResult = (x: any): x is SortingResult => {
    if (typeof(x) !== 'object') return false


    // all lists (except cpu times) must be of same cardinality
    const listLength = x.accuracies.length
    const lengths = [x.precisions.length, x.recalls.length, x.numMatches.length, x.numFalsePositives.length, x.numFalseNegatives.length]
    if ( !lengths.every(item => item === listLength) ) return false

    // accuracy, precision, recall must all be null or values in range 0-1
    for (const list of [x.accuracies, x.precisions, x.recalls]) {
        if ( !list.every((item: number | null) => item === null || (item >= 0 && item <= 1))) return false
    }

    // numMatches, numFalsePositives, numFalseNegatives must all be non-negative integers
    for (const list of [x.numMatches, x.numFalsePositives, x.numFalseNegatives]) {
        if ( !list.every((item: number | null) => item === null || (item >= 0 && Number.isInteger(item)))) return false
    }

    // And cputimesSec should be non-negative reals.
    if (!x.cpuTimesSec.every((item: number) => item >= 0)) return false

    return true
}

export interface StudyAnalysisResult {
    recordingNames: string[],
    trueSnrs: number[],
    trueFiringRates: number[],
    trueNumEvents: number[],
    trueRecordingIndices: number[],
    trueUnitIds: number[],
    _id: string,
    studyName: string,
    studySetName: string,
    sortingResults: SortingResult[]
    __v: number
}

export interface StudyAnalysisResultSet {
    studyAnalysisResults: StudyAnalysisResult[],
    studySetName: string
}