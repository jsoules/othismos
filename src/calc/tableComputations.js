


// buildVizData()
// get the names from the set
// if we're grouping by sets, then group the PAIRED_, SYNTH_, HYBRID_, and MANUAL_ sets together. (goes in 'sortedStudySets')
// 'studyAnalysisResults' is a prop; its values are filtered into the 'studyAnalysisResultsByStudyName' variable. by their name.

// next, assemble table rows. This is really display-oriented code. The question we actually have to ask is whether we collapse
// study set groups, or look at each study individually. Deal with this later. It's l. 86 - 145.
// Then do some generic business to add the header rows


// Right now this is just notes from the computeTableRowCellsFromStudyAnalysisResult function.
// See https://github.com/flatironinstitute/spike-front/blob/d7aa711cce1bfaa9d9ecb06f953d7c610e79c4d9/client/src/components/Heatmap/HeatmapViz.js l. 388 ff.

// Tables can display either a Study or a StudySet, which consists of multiple studies.
// In the event of a StudySet, then multiple studies' results will be aggregated.

// Depends on which metric is selected (from UI, these are accuracy, precision, or recall)
// Depends on threshold

// QUERY: Why do the numbers not add up for http://spikeforest.flatironinstitute.org/studyresults/synth_magland_noise20_K10_C8?
// If I do SNR 8, Accuracy, impute; collapsed, Klusta shows .82, but averaging the values gives .81-bar.


export {}
