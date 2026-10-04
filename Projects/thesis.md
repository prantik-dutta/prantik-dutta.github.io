---
layout: default
title: "MSc Thesis: Unsteady Surface Pressure in a Propeller Slipstream"
---

[← Back to portfolio](../)

# MSc Thesis: Unsteady Surface Pressure in a Propeller Slipstream

*MSc thesis, TU Delft, Aerodynamics & Wind Energy, 2025. Full title: "Quantifying Unsteady Surface Pressure Fluctuations Induced by a Propeller Slipstream Using a Flexible PCB Measurement Device". [Read the full thesis](https://resolver.tudelft.nl/uuid:d76e911a-a6f4-4718-b5b9-d69512647b58).*

**Experimental aerodynamics:** propeller slipstream · negative thrust · unsteady surface pressure · laminar separation bubble · tip vortex · phase-locked averaging · oil-flow visualisation · wind tunnel testing

**Test engineering:** test planning · test matrix design · test execution · root cause analysis · troubleshooting · fault diagnosis · sensor calibration and validation · instrumentation · multichannel data acquisition · signal processing (MATLAB, Python) · spectral analysis · test reporting

## Overview

In a propeller aircraft, the wing and other bodies downstream of the propeller operate in the slipstream and are subject to periodic impingement of blade-tip vortices and blade wakes. This interaction alters the unsteady surface loading, the location of boundary-layer transition and the radiated noise. Published unsteady surface-pressure data for this interaction are limited, particularly for propellers operating in negative thrust, the regime relevant to regenerative braking. This thesis addresses that gap experimentally for an airfoil immersed in a propeller slipstream.

The measurements were acquired with a flexible printed circuit board (PCB) carrying 18 MEMS microphones and 6 absolute pressure sensors. The board is mounted around the leading edge of the model, which avoids pressure taps and any modification of the model itself. It is a prototype of a larger device under development for flight testing on a Cessna Skymaster, and its measurement accuracy had to be established in a wind tunnel before it could be used for that purpose. The work was therefore carried out in two campaigns:

1. **Validation.** Assessment of the microphone and pressure-sensor measurements against reference measurements.
2. **Propeller-airfoil interaction.** Measurement of the unsteady surface pressure on a NACA 63₃-018 airfoil in a propeller slipstream, under positive and negative thrust.

**My role:** defined the test matrices for both campaigns (validation cases in the M-Tunnel and 12 propeller-airfoil configurations in the SLT), validated and benchmarked the device against reference measurements, conducted both wind tunnel campaigns including the oil-flow visualisation, and processed and analysed the data in MATLAB and Python.

## Experimental Setup

### The sensor board

- 18 Knowles SPW0690LM4H-1 MEMS microphones and 6 Bosch BMP390 absolute pressure sensors on a 350 × 150 mm board.
- Rigid sensor strips 0.6 mm thick, joined by Kapton flex so the board bends around a leading edge.
- An FPGA reads every channel at 1.11 MHz and records the propeller shaft encoder on the same clock.

![The flexible sensor board laid flat, with its FPGA box](../images/thesis-sensor-board.jpg)

### Campaign 1: validation in the M-Tunnel

- **Facility:** M-Tunnel, Low-Speed Wind Tunnel Laboratory, TU Delft. Open-jet configuration, 400 × 400 mm test section.
- **Model:** aluminium NACA 63₃-018, 200 mm chord, with 27 pressure taps.
- **Microphone checks:** a 500 Hz tone, a GRAS pistonphone calibration (1 kHz, 114 dB), and the vortex shedding from a 19.05 mm cylinder placed 267 mm upstream, at 5 to 20 m/s.
- **Pressure sensor check:** board readings against the pressure taps and XFOIL.

![The M-Tunnel at TU Delft](../images/thesis-mtunnel.jpg)

![The sensor board wrapped around the leading edge of the airfoil model](../images/thesis-model-with-board.jpg)

### Campaign 2: propeller slipstream in the Small Low-Turbulence Tunnel

- **Facility:** Small Low-Turbulence Tunnel (SLT), 600 × 900 mm test section, 20 m/s.
- **Model:** The same airfoil, 600 mm span, mounted vertically on rotating sideplates to set the angle of attack (0° and 6° for the main cases, 9° for two extra cases).
- **Propeller:** TUD-XPROP-S, 6 blades, 203.2 mm diameter, on a sting one propeller diameter upstream of the airfoil.
- **Operating points:** advance ratio J = 0.8 (high positive thrust, 123 rev/s) and J = 1.8 (54.7 rev/s). At J = 1.8, the propeller with 45° blade pitch gives positive thrust, and the one with 30° gives negative thrust, so the two regimes are compared at the same J. Nacelle-only runs give the baseline.
- **Spanwise coverage:** the board stays fixed, and the sting is moved vertically, so each run samples a different spanwise position.
- **Flow visualisation:** fluorescent oil under UV light for each case.

![The three TUD XPROP-S propellers available for the campaign, with 45°, 30° and 53° blade pitch. Results use the 30° and 45° ones](../images/thesis-propellers.jpg)

![Test section of the SLT with the nacelle, airfoil model and sensor board](../images/thesis-slt-setup.jpg)

![Left: the propeller mounted on the nacelle upstream of the airfoil with the sensor board. Right: the same setup during an oil-flow run under UV light](../images/thesis-propeller-setup-pair.jpg)

*Left: the propeller on its nacelle, upstream of the airfoil with the sensor board. Right: the same setup during an oil-flow run, with the airfoil coated in fluorescent oil under UV light.*

## Method

- **Spectral analysis:** power spectral density estimated with Welch's method, using a Hanning window and 50% segment overlap.
- **Pressure fluctuation maps:** root-mean-square of the pressure fluctuations at each microphone and spanwise station, assembled into contour maps over the chordwise and spanwise coordinates.
- **Phase-locked averaging:** the microphone signals are segmented into individual revolutions using the once-per-revolution encoder trigger and ensemble-averaged over all revolutions. This isolates the periodic component of the pressure signal associated with the blade passage from the stochastic (non-periodic) fluctuations.

## Key Results

### 1. Validation of the microphone measurements

A 500 Hz reference tone was measured at 499.6 Hz. In the cylinder wake at 20 m/s, the spectrum shows a vortex-shedding peak at 210.4 Hz, corresponding to a Strouhal number of 0.2003. This agrees with the expected value of approximately 0.2 for a circular cylinder at subcritical Reynolds numbers. At freestream velocities of 5, 10, 15 and 20 m/s, the shedding frequency scaled linearly with velocity (52, 107, 161 and 210 Hz), with the Strouhal number remaining between 0.199 and 0.204.

![Power spectral density of the microphone signal in the cylinder wake at 20 m/s, with the vortex-shedding peak at 210 Hz](../images/thesis-psd-cylinder.png)

### 2. Pressure-sensor discrepancy: root cause and correction

In the validation campaign, the pressure sensors on the board measured consistently higher suction than the pressure taps and the XFOIL prediction, at all four mounting positions of the board. The discrepancy was traced to the sensor geometry: the sensors protrude 0.75 mm above the board surface, and the local flow acceleration over the protrusion reduces the measured static pressure.

![Before correction (M-Tunnel, α = 5.5°): pressure coefficient from the board at four mounting positions, compared with the pressure taps and XFOIL](../images/thesis-cp-before-fix.png)

For the second campaign, a strip of Kapton tape was applied adjacent to the sensors to raise the surrounding surface to sensor height and remove the step. With this correction, the board measurements agreed with the pressure taps and XFOIL.

![Kapton tape strip applied adjacent to the pressure sensors](../images/thesis-kapton-tape.jpg)

![After correction (SLT, nacelle only, α = 9°): pressure coefficient from the board, the pressure taps and XFOIL](../images/thesis-cp-after-fix.png)

The correction introduced a secondary effect: the tape disturbed the flow over the middle and lower microphone rows, so the unsteady analysis is based on the upper row. Both effects are documented in the thesis as limitations of the device.

### 3. Detection of the laminar separation bubble

In the nacelle-only configuration, a band of elevated pressure fluctuations coincides with the separated shear layer of the laminar separation bubble. Increasing the angle of attack from 0° to 6° shifts this band upstream, consistent with the oil-flow visualisation.

![Maps of RMS pressure fluctuation for the nacelle-only cases at α = 0° and 6°](../images/thesis-prms-bubble.png)

### 4. Positive thrust: tip-vortex-dominated pressure fluctuations

At J = 0.8, the laminar separation bubble is no longer present in the region washed by the slipstream, and the highest pressure fluctuations follow the tip-vortex trajectory along the chord at y/R = 0.91.

![Map of RMS pressure fluctuation at J = 0.8, with the tip-vortex trajectory near y/R = 0.9](../images/thesis-prms-tip-vortex.png)

The phase-averaged pressure at this spanwise station shows six distinct pressure minima per revolution, one per blade passage. Further inboard, in the blade-wake region, the minima are weaker, and outside the slipstream the periodic component is negligible. The spectra show the corresponding tonal peaks at the blade-passing frequency and its harmonics, consistent with the literature.

![Phase-averaged pressure at three spanwise stations for J = 0.8](../images/thesis-phase-tip-vortex.png)

### 5. Negative thrust: weaker tip vortex and broadband-dominated spectra

At J = 1.8 and α = 0°, the positive-thrust case retains a distinct pressure minimum at each blade passage. In negative thrust, the minima are shallower and distributed over a wider range of phase angles. The tonal components at the blade-passing frequency decay and the spectrum becomes dominated by broadband fluctuations. This is consistent with the blade loading distribution in negative thrust, where the lightly loaded blade tips produce a weaker tip vortex.

![Phase-averaged pressure on the tip-vortex trajectory: positive thrust (black) and negative thrust (grey)](../images/thesis-phase-thrust.png)

Two further observations:

- The influence of the slipstream on the airfoil extends beyond the slipstream boundary, across the full measured span.
- In negative thrust, the highest pressure fluctuations do not occur on the tip-vortex trajectory. They occur in the region where the slipstream interacts with the shear layer of the laminar separation bubble.

![Oil-flow visualisation on the suction side: nacelle only (left), positive thrust (centre) and negative thrust (right)](../images/thesis-oilflow.jpg)

## Limitations

- **Sensor protrusion.** The 0.75 mm sensor height requires a flush sleeve around the sensors. The tape correction resolves the pressure-sensor error but disturbs the adjacent microphones.
- **Recording length.** The acquisition time was set to 30 s, but less than 10 s of data was stored in most cases.
- **Spatial resolution.** The sensor layout is inherited from the Skymaster design, with three chordwise microphone stations per side and the first at 16.5% chord. The leading-edge region is therefore not resolved.

[← Back to portfolio](../)
