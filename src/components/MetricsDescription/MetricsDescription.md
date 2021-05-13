# Metrics

## Matching of firing events

We first describe how labeled firing events output by a sorter are matched
to a given list of ground truth events, with firing times $s_i$, labeled by the
index $i = 1, \dots, n_{GT}$. Consider the sorted unit labeled $k$.
Let $t_j^k, j=1,\dots,n_k$ be the set of firing times of this unit output by
the sorter. Let $\Delta t$ be an acceptable firing time error, which we assume
is shorter than half the refactory period of a true neuron.

The number of matches of unit $k$ to the ground truth is defined by
$$
n^k_{match} := \left\{ i: \vert t^k_j - s_i \vert \lt \Delta t \textrm{ for some }  j \right\}
$$

Note that even if more than one sorted event falls within $\pm \Delta t$ of a true event, at most one
is matched. The reverse situation, where more than one ground truth event from the same neuron
could match to a given sorted event, cannot happen, by our assumption about the refractory period.

Given the above, the number of missed events is then
$$
n^k_{miss}:= n_{GT} - n^k_{match}
$$

The number of false positive events is
$$
n^k_{fp}:= n_{k} - n^k_{match}
$$

Translated to the notation of Jun et al. 2017 \[1\], these three metrics are
$$
$$

In the code implementation, the above matching of sorted events to ground truth events uses the
[sortingcomparison.py](https://github.com/SpikeInterface/spiketoolkit/blob/master/spiketoolkit/comparison/sortingcomparison.py)
 routine from spiketoolkit. In this routine, the default
$\Delta t$ is set as `delta_frames` in sample units. Note that the time in milliseconds
thus depends on the sample rate. We use $\Delta t =$ 30 samples (frames), corresponding
to 1.5 ms at 20 kHz, or 1 ms at 30 kHz.

## Accuracy metrics

## Best matching unit

## Other per-unit metrics

## Filtering

## References


