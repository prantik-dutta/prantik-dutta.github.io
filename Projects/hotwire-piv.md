---
layout: default
title: "Hot-Wire Anemometry and PIV: NACA 0012 Wake"
---

[← Back to portfolio](../)

# Hot-Wire Anemometry and PIV: NACA 0012 Wake

*Flow Measurement Techniques (AE4180), TU Delft, 2024. Group lab exercise with three teammates.*

## Overview

We measured the flow around a NACA 0012 airfoil at 0°, 5° and 15° angle of attack with two techniques that complement each other: a single constant-temperature hot-wire for high-frequency point measurements, and planar particle image velocimetry (PIV) for full-field velocity maps. Both were run in the W-tunnel of the High-Speed Laboratory at 10 m/s, then compared on the same wake.

The aim was to see what each technique resolves well and where it breaks down, especially once the flow separates.

## Experimental Setup

- **Facility:** W-tunnel, closed transparent test section of 0.40 × 0.40 m, free-stream velocity of 10 m/s set against a Pitot-static tube.
- **Model:** Plexiglas NACA 0012 spanning the test section, chord 10 cm, rotated about the quarter-chord point.
- **Hot-wire:** 5 µm platinum-plated tungsten wire on a Dantec 56C17 CTA bridge, read out with an NI data acquisition card through LabVIEW. Wake traverse from −40 to +40 mm in 21 steps, about 20% chord behind the trailing edge.
- **PIV:** water-glycol fog (about 1 µm particles), Quantel Evergreen 200 Nd:YAG laser (8 ns pulses), 1628 × 1236 px CCD camera, acquisition and processing in DaVis, with a self-written MATLAB cross-correlation to compare against. Laser safety procedures were followed throughout.

## Method

### Hot-wire

1. **Overheat ratio.** Measured the cord and probe resistances and set an overheat ratio of 0.5. This keeps the wire sensitive to small velocity changes while leaving margin against burning it out.
2. **Calibration.** Swept the tunnel from 0 to 20 m/s in 2 m/s steps against the Pitot-static reference (5 s at 2 kHz per point) and fitted a fourth-order polynomial from voltage to velocity. The 10 m/s test condition sits in the middle of the calibrated range.
3. **Acquisition time.** The autocorrelation of the voltage signal gave an integral time scale of about 4 ms, which sets a minimum sampling rate near 125 Hz. We sampled at 10 kHz for 3 s so the spectra reach well past the shedding frequencies.

### PIV

1. **Design calculations.** Field of view of 1.5 chords (0.15 m) set the magnification (about 0.048), object and image distances, f-number (5.6) and a depth of focus of about 4 cm, larger than the laser sheet thickness so every illuminated particle is in focus.
2. **Processing.** Masked the airfoil and the two regions where the transparent model refracts the sheet and leaves them dark, subtracted the per-pixel minimum over 10 images to remove background, and cross-correlated with multi-pass interrogation.
3. **Parameter study.** Varied window size (16, 32, 64 px), overlap (0% vs 50%), pulse separation (75 µs vs 6 µs) and number of images (10 vs 100). A 32 px window with 50% overlap and multi-pass gave the best balance of resolution and noise.

## Key Results

### Hot-wire wake profiles

The velocity deficit and RMS fluctuation profiles show the wake widening and strengthening with angle of attack. At 0° the deficit is narrow and centred on the trailing edge. At 5° it shifts upward. At 15° the wake is wide, with strong shear layers on both sides and RMS fluctuations above 3 m/s.

![Hot-wire velocity and RMS profiles at 0, 5 and 15 degrees](../images/hwa-profiles.png)

### Spectra

At 0° the spectrum is dominated by one sharp peak at about 420 Hz with a harmonic near 840 Hz, the signature of regular vortex shedding from the trailing edge. At 5° the energy spreads over a broad band. At 15°, in the shear layer, the energy moves to a low-frequency peak below 100 Hz, which points to much larger vortical structures once the flow separates.

![Power spectral density behind the trailing edge at 0 and 5 degrees, and in the shear layer at 15 degrees](../images/hwa-spectrum.png)

PIV cannot see any of this. Its frame rate is a few hertz, so the highest frequency it can resolve is a few hertz as well, orders of magnitude below the 420 Hz peak.

### PIV flow fields

At 0° the mean flow shows the expected symmetric acceleration around the airfoil and a thin wake. At 15° the flow separates: the mean field shows one large recirculation region above the airfoil with backflow toward the trailing edge, and the instantaneous field shows turbulent structures of many sizes in the shear layer.

![PIV velocity fields at 0 degrees, instantaneous (left) and mean (right)](../images/piv-0deg.png)

![PIV velocity fields at 15 degrees, instantaneous (left) and mean (right)](../images/piv-15deg.png)

### Effect of PIV processing parameters

A 16 px window loses particles between the two frames in the fast flow over the suction side, so the correlation returns near-zero velocities there. A 64 px window is too coarse to resolve the shear layer or the stagnation point. The 32 px window resolves both. A 6 µs pulse separation gave a noisy field because the particle displacement is small compared with the measurement error, and 100 images gave a visibly smoother mean than 10.

![PIV at 15 degrees with 16, 32 and 64 pixel interrogation windows](../images/piv-window-size.png)

### Cross-validation of the two techniques

Plotting both techniques on the same wake gave the clearest comparison. At 0° and 5° the streamwise velocity profiles agree closely, with the hot-wire reading slightly higher, which we attribute to calibration bias and post-processing differences. At 15° they disagree in the separated region: PIV shows negative velocity near the centre of the wake because it resolves the reversed flow, while a single hot-wire reads only velocity magnitude and returns a large positive value there. The RMS profiles agree better at 15° because the sign of the velocity drops out of the fluctuation level.

![Streamwise velocity from PIV and hot-wire at 0, 5 and 15 degrees](../images/hwa-piv-velocity.png)

![Velocity RMS from PIV and hot-wire at 0, 5 and 15 degrees](../images/hwa-piv-rms.png)

## Takeaways

| | Hot-wire | PIV |
|---|---|---|
| Strength | Very high temporal resolution, fast setup and processing | Full-field, non-intrusive, resolves flow direction, no calibration |
| Limit | Needs calibration each run, intrusive, cannot resolve reversed flow, point measurement | Low temporal resolution, needs optical access, more error sources |

The two techniques cover each other's gaps. PIV shows where the flow separates and which way it moves, and the hot-wire shows how fast the wake is oscillating.
