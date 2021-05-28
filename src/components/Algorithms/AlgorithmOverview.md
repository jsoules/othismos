Generally speaking, a spike sorting algorithm takes in an unfiltered
multi-channel timeseries (aka, recording) and a dictionary of algorithm
parameters and outputs a list of firing times and associated integer
unit labels. This page lists the spike sorting codes we run, as well as
some that have yet to be incorporated. Most of the codes were developed
at other institutions; two of them are in-house.

SpikeForest uses Python wrappers to implement the algorithms. Links to those
may be found in the "Wrapper" links for each entry. For the non-MATLAB
sorters, we use Singularity containers (similar to Docker containers)
in order to ensure a reproducible compute environment. In those cases,
links to the Docker files (environment prescriptions) are provided. We
almost always use the default parameters of the wrappers, but some may
be overridden in the
[analysis configuration files](https://github.com/flatironinstitute/spikeforest/tree/master/working/main_analysis).

Wrappers were created in collaboration with the
[SpikeInterface](https://github.com/SpikeInterface/)
project. The goal is ultimately to merge these with the corresponding wrappers
in SpikeInterface/SpikeToolkit.
