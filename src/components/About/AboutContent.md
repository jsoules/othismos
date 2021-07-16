# About SpikeForest

## Overview

Extracellular electrical recording is a popular
and affordable method to measure the
simultaneous spiking activity of a large neural
population. The key computational extraction of
distinct neuronal units and firing times is
known as spike sorting. However, there is a
growing number of automated spike sorting codes,
and much uncertainty and folklore about their
accuracy in various experimental conditions.
Several papers report comparisons on a
case-by-case basis, but there is a lack of
standardized measures and validation data.
Furthermore, there is a potential for bias, such
as sub-optimal tuning of competing algorithms,
and a focus on one brain region or probe type.
Without a fair and transparent comparison,
genuine progress in the field remains difficult.

Aiming to address this need, SpikeForest is a
reproducible, continuously updating platform
which benchmarks the performance of spike
sorting codes across a large curated database of
electrophysiological recordings with ground
truth. It consists of this website for
presenting our up-to-date findings, a
[Python package](https://github.com/flatironinstitute/spikeforest2)
which contains the tools for running the
SpikeForest analysis, and an expanding
collection of electrophysiology recordings with
ground-truth spiking information.

We host a variety of experimental paired ground
truth recordings from the community and also
many in silico synthetic recordings. Each sorter
is run on all recordings and the resulting
accuracies for the ground truth units are
updated on a daily basis as needed. Approximate
CPU/GPU run times are also reported.

Visitors may browse all datasets, algorithms,
sorting results, and comparisons, and inspect
the source code used to generate these data. Use
the links on the navbar to learn about
[recordings](/recordings),
[algorithms](/algorithms), and
[metric definitions](/metrics).

## Citation

For a comprehensive discussion of SpikeForest,
please consult the following eLife paper:

Magland, J., Jun, J. J., Lovero, E., Morley, A. J.,
Hurwitz, C. L., Buccino, A. P., Garcia, S., Barnett,
A. H. (2020). SpikeForest, reproducible web-facing
ground-truth validation of automated neural spike
sorters. *eLife, 9.* [doi:10.7554/elife.55167](https://elifesciences.org/articles/55167)

## Running locally (Reproducing)

* For information on reproducing the results reported on the webpage or running
the SpikeForest-wrapped sorters on your own data, see
the [SpikeForest2 Python package](https://github.com/flatironinstitute/spikeforest2).

## Feedback

There are several ways to provide feedback, report
problems, or contact us with questions:

* You may email us using the [contact form](/contact).
* If you prefer a more graphical/interactive way to
label problems or questions on a particular page,
click on the **Contact Us** tab in the
bottom-right corner of any page.

## Credits

SpikeForest is a project of the
[Flatiron Institute](https://flatironinstitute.org)
involving the
[Center for Computational Mathematics (CCM)](https://www.simonsfoundation.org/flatiron/center-for-computational-mathematics/)
and the
[Scientific Computing Core (SCC)](https://www.simonsfoundation.org/flatiron/scientific-computing-core/).

* Jeremy Magland, CCM (chief infrastructure
developer, backend analysis framework)
* James Jun, CCM (infrastructure, testing, recording
preparation, and algorithm integration)
* Elizabeth Lovero, SCC (site design, web development, visualizations)
* Leslie Greengard, CCM (concept, planning)
* Alex Barnett, CCM (concept, planning, site design, testing)  

&nbsp;

Other key contributors to the project include:

* Alex Morley - Mozilla Fellow, MRC Brain Network
Dynamics Unit, University of Oxford, UK
(infrastructure, testing)
* Witold Wysota - Warsaw, Poland (infrastructure, testing)

&nbsp;

File format conversions and some computations make
use of [SpikeInterface](https://github.com/SpikeInterface/).
Over time we will expand our integration with this
project. It is under development by the following
individuals:

* Cole Hurwitz - The Institute for Adaptive and
Neural Computation (ANC), University of Edinburgh,
Edinburgh, Scotland
* Alessio Paolo Buccino - Center for Inegrative
Neurolasticity (CINPLA), Department of
Biosciences, Physics, and Informatics, University
of Oslo, Oslo, Norway
* Matthias Hennig - The Institute for Adaptive and
Neural Computation (ANC), University of Edinburgh,
Edinburgh, Scotland
* Samuel Garcia - Centre de Recherche en
Neuroscience de Lyon (CRNL), Lyon, France
* Jeremy Magland - Center for Computational
Mathematics, Flatiron Institute, New York, NY

&nbsp;

We are grateful for many collaborators at other
institutions for their vital help and supply of
recordings:

* Frank Lab, UCSF
  * Jason Chung (UCSF)
  * Loren Frank (UCSF)
* Allen Institute for Brian Science
  * Catalin Mitelut (Columbia)
  * Sergey Gratiy (AIBS)
  * Costas Anastassiou (AIBS)
* Buzsaki Lab (NYU)
  * Dan English (Virginia Tech)
  * Anton Sirota (LMU Munich)
  * György Buzsáki (NYU)
* Kampff Lab, UCL
  * André Marques-Smith (UCL)
  * Joana P. Neto (UCL)
  * Adam R. Kampff (UCL)
* Boyden Lab, MIT
  * Ed Boyden (MIT)
  * Brian D. Allen (MIT)
  * Caroline Moore-Kochlacs (MIT)
* Institute de la Vision, CNRS
  * Pierre Yger (CNRS)
  * Giulia LB Spampinato (CNRS)
  * Olivier Marre (CNRS)
* HHMI - Janelia Research Campus (hybrid drift simulation)
  * Jennifer Colonell
  * Marius Pachitariu

## References

[1] F. J. Chaure, H. G. Rey, and R. Quian Quiroga. A
novel and fully automatic spike-sorting
implementation with variable number of
features. Journal of neurophysiology,
120(4): 1859–1871, 2018.
[10.1152/jn.00339.2018](https://doi.org/10.1152/jn.00339.2018)

[2] J. E. Chung, J. F. Magland, A. H. Barnett, et
al. A fully automated approach to
spikesorting. Neuron, 95(6): 1381–1394, 2017.
[10.1016/j.neuron.2017.08.030](https://doi.org/10.1016/j.neuron.2017.08.030)

[3] S. Garcia and C. Pouzat.
[Tridesclous](https://github.com/tridesclous/tridesclous).
https://github.com/tridesclous/tridesclous.

[4] G. Hilgen, M. Sorbaro, S. Pirmoradian, J.-O.
Muthmann, I. E. Kepiro, S. Ullo, C. J. Ramirez, A. P.
Encinas, A. Maccione, L. Berdondini, et al.
Unsupervised spike sort-ing for large-scale,
high-density multielectrode arrays. Cell Reports,
18(10): 2521–2532, 2017.
[10.1016/j.celrep.2017.02.038](https://doi.org/10.1016/j.celrep.2017.02.038)

[5] J. J. Jun, C. Mitelut, C. Lai, S. Gratiy, C.
Anastassiou, and T. D. Harris. Real-time spike
sorting platform for high-density extracellular
probes with ground-truthvalidation and drift
correction. bioRxiv, page 101030, 2017.
[10.1101/101030](https://doi.org/10.1101/101030)

[6] J. J. Jun, N. A. Steinmetz, J. H. Siegle, D. J.
Denman, M. Bauza, B. Barbarits, A. K.Lee, C. A.
Anastassiou, A. Andrei, Ç. Aydın, et al. Fully
integrated silicon probes for high-density recording
of neural activity. Nature, 551(7679): 232-236, 2017.
[10.1038/nature24636](https://doi.org/10.1038/nature24636)

[7] M. Pachitariu, N. A. Steinmetz, and J. Colonell.
[Kilosort2](https://github.com/MouseLand/Kilosort2).
https://github.com/MouseLand/Kilosort2.

[8] R. Q. Quiroga, Z. Nadasdy, and Y. Ben-Shaul.
Unsupervised spike detection and sorting with
wavelets and superparamagnetic clustering. Neural
Computation, 16(8): 1661–1687, 2004.
[10.1162/089976604774201631](https://doi.org/10.1162/089976604774201631)

[9] P. Yger, G. L. Spampinato, E. Esposito, B.
Lefebvre, S. Deny, C. Gardella, M. Stim-berg, F.
Jetter, G. Zeck, S. Picaud, et al. A spike sorting
toolbox for up to thousands of electrodes validated
with ground truth recordings in vitro and in
vivo. Elife, 7: e34518, 2018.
[10.7554/eLife.34518](https://doi.org/10.7554/eLife.34518)

[10] M. J. Zaki and W. Meira Jr. *Data mining and
analysis: fundamental concepts and algorithms.*
Cambridge University Press, New York, NY, 2014.12
[ISBN: 978-0521766333](https://dataminingbook.info/first_edition/)

## Background and related projects (Background)

This project is the fruition of a long-term goal
within the spike sorting effort of CCM, starting in
2014 at what was then SCDA (the Simons Center for
Data Analysis). The original spike sorting effort
comprised Jeremy Magland, Alex Barnett, and Leslie
Greengard, and collaborators in Loren Frank's lab.

Design principles were outlined in our
[white paper](https://github.com/flatironinstitute/spikesortercomparison)
of May 2018. This was inspired in part by a
community discussion on validation at the Janelia
spike sorting workshop of 3/22/18.

We were influenced (in terms of concept, features,
and site design) by many neuroscience and
non-neuroscience algorithm validation websites,
including:

* [ClustEval website](https://clusteval.sdu.dk/)
for comparing clustering algorithms, including
parameter optimizations. Their publication is:
Wiwie, C., Röttger, R. & Baumbach, J. "Comparing
the performance of biomedical clustering methods,"
Nature Methods (2015).
* [NeuroFinder](http://neurofinder.codeneuro.org/)
by Jeremy Freeman, for calcium imaging spatial
neuron extraction comparison.
* [SpikeFinder](http://spikefinder.codeneuro.org), by P. Berens,
for extracting spikes from calcium
imaging fluorescence curves.
* [G-Node](http://spike.g-node.org). A now-defunct 2011-2012 project
where the user
uploads sorted data, which is compared against a
hidden ground truth sorting and optionally
published.
* [cortexlab](http://phy.cortexlab.net/data/sortingComparison), by
N. Steinmetz. Comparison of several algorithms on hybrid data.
* [Spikesortingtest](http://www.spikesortingtest.com) by C. Mitelut.
* [SpikeSortingSoftware](http://simonster.github.io/SpikeSortingSoftware)
Older list of spike sorting codes and their features.

## Future plans

We have many future plans, and welcome your
suggestions. Some of our future plans include:

1. Expanding the set of test recordings
1. Parameter settings: more explicit control of
parameters for sorting algorithms, with possible
optimization.
1. Hybrid recordings: incorporate a new recording
class to complement the current *in vivo*,
*ex vivo*, and simulated recordings.
1. Expansion of SNR to other surrogate quality
metrics: display noise overlap, isolation, etc, as
used in MountainView.
1. Stability-based quality metrics: run sorters
multiple times to measure stability, as in our
work "Validation of neural spike sorting
algorithms without ground-truth information," A.
H. Barnett, J. F. Magland, and L. Greengard, J.
Neurosci. Meth., 264, 65--77 (2016)
[doi: 10.1016/j.jneumeth.2016.02.022](https://doi.org/10.1016/j.jneumeth.2016.02.022).
1. Further integration with SpikeInterface.
