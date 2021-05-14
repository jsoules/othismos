# Metrics

## Matching of firing events

We first describe how labeled firing events output by a sorter are matched
to a given list of ground truth events, with firing times $s_i$, labeled by the
index $i = 1, \dotsc, n_{\rm GT}$. Consider the sorted unit labeled $k$.
Let $t_j^k, j=1,\dotsc,n_k$, be the set of firing times of this unit output by
the sorter. Let $\Delta t$ be an acceptable firing time error, which we assume
is shorter than half the refactory period of a true neuron.

The number of matches of unit $k$ to the ground truth is defined by
$$
n^k_{\rm match} := \left\{ i: \vert t^k_j - s_i \vert \lt \Delta t \textrm{ for some }  j \right\}
$$

Note that even if more than one sorted event falls within $\pm \Delta t$ of a true event, at most one
is matched. The reverse situation, where more than one ground truth event from the same neuron
could match to a given sorted event, cannot happen, by our assumption about the refractory period.

Given the above, the number of missed (false negative) events is then
$$
n^k_{\rm miss}:= n_{\rm GT} - n^k_{\rm match}
$$

The number of false positive events is
$$
n^k_{\rm fp}:= n_{k} - n^k_{\rm match}
$$

Translated to the notation of Jun et al. 2017 \[1\], these three metrics are
$$
\begin{array}{lll}
n_1 = n^k_{\rm miss}, & n_2 = n^k_{\rm match}, & n_3=n^k_{\rm fp}\cr
\end{array}
$$

In the code implementation, the above matching of sorted events to ground truth events uses the
[sortingcomparison.py routine from spiketoolkit](https://github.com/SpikeInterface/spiketoolkit/blob/master/spiketoolkit/comparison/sortingcomparison.py) (BROKEN LINK).
In this routine, the default
$\Delta t$ is set as `delta_frames` in sample units. Note that the time in milliseconds
thus depends on the sample rate. We use $\Delta t =$ 30 samples (frames), corresponding
to 1.5 ms at 20 kHz, or 1 ms at 30 kHz.

## Accuracy metrics

The main page of SpikeForest allows ground truth unit counts to be filtered by one of three metrics: precision,
recall, and overall accuracy. For a given ground truth unit, and sorted unit $k$,
these metrics are as follows, in terms of the above counts:

$$
\begin{align*}
\textrm{Precision:}\quad& p_k := \frac{n^k_{\rm match}}{n^k_{\rm match} + n^k_{\rm fp}} = \frac{n^k_{\rm match}}{n^k} = \frac{n_2}{n_2 + n_3}\\
\\
\textrm{Recall:}\quad& r_k := \frac{n^k_{\rm match}}{n^k_{\rm miss}+ n^k_{\rm match}} = \frac{n^k_{\rm match}}{n_{\rm GT}} = \frac{n_2}{n_1 + n_2}\\
\\
\textrm{Accuracy:}\quad&  a_k := \frac{n^k_{\rm match}}{n^k_{\rm miss}+n^k_{\rm match} + n^k_{\rm fp}} = \frac{n^k_{\rm match}}{n^k + n_{\rm GT} - n_{\rm match}} = \frac{n_2}{n_1 + n_2 + n_3}\\
\\
\end{align*}
$$
Notes:

- Precision = 1 - (false positive rate)
- Recall = 1 - (false negative rate)
- Accuracy balances precision and recall. This accuracy metric is similar, but not identical, to the clustering metric called the [$F_1$ score](https://en.wikipedia.org/wiki/F1_score)

See the `SortingComparison` class in [compare_sortings_with_truth.py](https://github.com/flatironinstitute/spikeforest2/blob/master/spikeforest2_utils/_sortingcomparison.py) for code implementation.

## Best matching unit

For each ground truth unit, the best matching unit $k$ to the ground truth firing time
list $s_i$ is defined as the one with the highest accuracy $a_k$, as defined above.

Only results (accuracy, precision, recall) for this unit are reported.

## Other per-unit metrics

SNR (signal-to-noise ratio) is a property of a single neural unit, either a ground
truth unit or a unit as output by a sorter. To compute it, the filtered
recording $y_m\left(t\right)$, where
$m = 1,\dotsc,M$ is the channel index and $t$ the time point, is needed,
and the list of firing times. See below for a description of filtering.

Firstly, the mean waveforms $w^k_m\left(t\right)$ are extracted for each unit
label $k$. Here the time index is in the sample range $1\leq t \leq T$.

Then,
$$
\textrm{SNR}_k := \frac{\max_{m=1,\cdots,M,\,t=1,\cdots,T}\vert w_m^k\left(t\right)\vert}{\sigma_m}
$$
where a robust estimate of the (Gaussian-standardized) standard deviation for the $m$th
channel is
$$
\sigma_m = \frac{\textrm{MAD}_m}{0.6745}
$$
where, for each channel $m$, the median absolute deviation MAD of the filtered data is
defined by
$$
\textrm{MAD}_m = \textrm{median}\,\vert y_m\left(t\right) - \overline{y_m} \vert
$$

where $\overline{y_m} := \frac{1}{T}\sum_{t=1}^{T}y_m\left(t\right)$
is the average of that channel.

In large datasets, the above are estimated by stochastic sampling.

[See here](https://github.com/flatironinstitute/spikeforest2) for the scaling factor of
the [MAD](https://en.wikipedia.org/wiki/Median_absolute_deviation).

Find the code we use for computing SNR in
[compute_units_info.py](https://github.com/flatironinstitute/spikeforest2).

## Filtering

Filtering of recording signals is done throughout SpikeForest using a bandpass filter
from 300 to 6000 Hz. This is implemented via convolution using FFTs, allowing an
arbitrary function of frequency to be used as a filter. We use erf (the error function)
to create smooth roll-offs at the low and high ends of the band. The widths of the low-end
roll-off is 100 Hz and the high-end roll-off 1000 Hz. The point of the smoothness here is to
create rapid decay in impulse response in the time domain.

## References

\[1\] James Jaeyoon Jun, Catalin Mitelut, Chongxi Lai, Sergey Gratiy, Costas Anastassiou
and Timothy D Harris,
*[Real-time spike sorting platform for high-density extracellular probes with ground truth validation and drift correction](https://www.biorxiv.org/content/10.1101/101030v2)*.
bioRxiv 101030 (2017), doi: [https://doi.org/10.1101/101030](https://doi.org/10.1101/101030).