---
layout: default
title: "Wind Tunnel Test Campaign: Stability and Control in One-Engine-Inoperative Conditions"
---

[← Back to portfolio](../)

# Wind Tunnel Test Campaign: Stability and Control in One-Engine-Inoperative Conditions

*Group project (team of four), AE4115 Experimental Simulations, TU Delft, 2024. Tested in the Low-Turbulence Tunnel (LTT).*

**Experimental aerodynamics:** propeller-airframe integration · one-engine-inoperative (OEI) · directional stability · rudder effectiveness · wind tunnel boundary corrections · Reynolds number effects · propeller noise

**Test engineering:** test matrix design · response surface method · six-component balance measurements · near-field microphone measurements · thrust estimation · blockage and lift-interference corrections · data reduction (MATLAB) · test reporting

## Overview

Failure of one engine on a twin-propeller aircraft produces asymmetric thrust and a yawing moment that the vertical tail and rudder have to balance. This campaign quantified the effect of the one-engine-inoperative (OEI) condition on a scaled aircraft model with propellers mounted on the horizontal tailplane. The objectives were to determine:

- the directional stability of the model,
- the rudder effectiveness,
- the lift and drag in trimmed flight,
- the near-field propeller noise.

The influence of the wind tunnel boundary corrections and of the Reynolds number on these quantities was assessed as well.

**My role:** member of a four-person team. Contributed to the design of the test matrix, the balance and microphone measurements, the data reduction and the final report.

## Experimental Setup

### Facility and model

- **Facility:** Low-Turbulence Tunnel (LTT), TU Delft. Closed octagonal test section, 1.80 m × 1.25 m, with a cross-sectional area of 2.07 m².
- **Model:** aircraft model with two six-bladed propellers of 0.2032 m diameter mounted on the horizontal tailplane. Wing span 1.397 m, mean aerodynamic chord 0.165 m.
- **Installation:** the model is mounted inverted on three struts connected to the external balance above the test section. The aft strut sets the angle of attack. The sideslip angle is set by rotating the balance together with the turntable.
- **Transition:** boundary-layer transition is forced with trip strips on the wing, tailplanes, fuselage and nacelles.

![The Low-Turbulence Tunnel at TU Delft. Photo: TU Delft, AE4115 course material](../images/oei-ltt-facility.jpg)

![The aircraft model installed inverted in the LTT test section, front view. Photo: Reynard de Vries, TU Delft](../images/oei-model-in-test-section.jpg)

![Side view of the model and the tailplane-mounted propeller. Photos: Nando van Arnhem, TU Delft](../images/oei-model-side-and-propeller.jpg)

![Technical drawing of the wind tunnel model and its position in the test section. Source: AE4115 lab manual, TU Delft](../images/oei-model-geometry.jpg)

### Instrumentation

- **External balance:** six-component balance for the aerodynamic forces and moments. Wind-off zero measurements remove the model weight and cable tension from the readings.
- **Near-field microphones:** six microphones flush-mounted in the fuselage, at axial directivity angles from 60° to 105°, where 90° is the propeller plane.

![Positions of the near-field microphones in the rear fuselage. Source: AE4115 lab manual, TU Delft](../images/oei-microphone-positions.jpg)

### Test matrix

- **Propeller configurations:** both propellers fixed (reference for the thrust estimation), both propellers operating (normal cruise) and left propeller operating only (right engine failed).
- **Freestream velocity:** 20 and 30 m/s, corresponding to Reynolds numbers of 2.30 × 10⁵ and 3.46 × 10⁵.
- **Advance ratio:** J = 1.75 with both propellers operating, selected from the cruise condition in which thrust equals drag. J = 1.6 for the OEI case, in which one propeller delivers the full cruise thrust, and J = 1.2 as a higher-thrust OEI case.
- **Attitude and control:** angle of attack 0°, 2° and 4°. Sideslip angle 0°, 5° and 10°. Rudder deflection 0°, 7° and 14°.
- **Size:** 105 measurement points in a 180-minute tunnel slot. Each block covers five points in the plane of angle of attack and sideslip, and a response surface model is fitted to the data afterwards.

## Method

- **Thrust estimation:** the model has no thrust sensor. The propeller thrust is obtained from the difference between the balance data with the propellers operating and with the propellers fixed, at the same flow condition.
- **Response surface modelling:** for each of the six operating conditions, the force and moment coefficients are modelled as functions of angle of attack, sideslip angle and rudder deflection, using 15 measurement points per condition. The lift coefficient is fitted with a linear model and the other coefficients with a second-order model.
- **Boundary corrections:** solid blockage calculated per model component (total blockage factor 0.0064), wake blockage with Maskell's method, propeller slipstream blockage, and lift-interference corrections to the angle of attack and the drag coefficient.

## Key Results

### 1. Effect of the boundary corrections

The corrections reduce the lift-curve slope and lower the drag coefficient. The lift-interference correction shifts the angle of attack.

![Lift and drag coefficients with and without boundary corrections, OEI at J = 1.2 and Re = 2.30 × 10⁵](../images/oei-boundary-corrections.jpg)

### 2. Propeller thrust

The thrust coefficient is nearly independent of angle of attack and sideslip angle in the tested range, and slightly higher at 30 m/s than at 20 m/s. It is about 0.27 to 0.31 with both propellers operating at J = 1.75, about 0.36 to 0.43 for OEI at J = 1.6, and about 0.74 to 0.82 for OEI at J = 1.2.

![Thrust coefficient against angle of attack and sideslip angle for all operating conditions](../images/oei-thrust-coefficient.jpg)

### 3. Directional stability

The slope of the yawing moment against sideslip angle is nearly the same for all three propeller conditions, so the directional stability of the airframe is largely unaffected by the OEI condition. The asymmetric thrust offsets the total yawing-moment curve, which increases the sideslip angle at which the model is trimmed. The slope is steeper at the higher Reynolds number.

![Yawing moment coefficient against sideslip angle at the low and high Reynolds number. Solid lines: airframe only. Dashed lines: including thrust](../images/oei-directional-stability.jpg)

### 4. Rudder effectiveness

The slope of the yawing moment against rudder deflection is similar for all propeller conditions, so the rudder effectiveness is retained in the OEI condition. With the rudder at 5°, the model trims at a sideslip angle of about 0.5° for OEI at J = 1.6 and about 2° for OEI at J = 1.2.

![Yawing moment coefficient against rudder deflection at the low and high Reynolds number](../images/oei-rudder-effectiveness.jpg)

### 5. Trimmed lift and drag

The lift coefficient is nearly unaffected by the propeller condition. The drag coefficient is highest for OEI at J = 1.2, where the model trims at the largest sideslip angle. The lift-to-drag ratio increases with Reynolds number.

![Lift coefficient, drag coefficient, lift-to-drag ratio and drag polar in trimmed conditions](../images/oei-lift-drag-performance.jpg)

### 6. Propeller noise

The spectra show a tone at the blade-passing frequency, six times the shaft frequency. At 30 m/s this tone is about 90 dB with both propellers operating and about 75 dB for OEI at J = 1.6, and the broadband level is higher with both propellers operating. With both propellers operating, tones also appear at every multiple of the shaft frequency, which is attributed to vibration of the starboard motor.

![Sound pressure level spectra with both propellers operating and in the OEI condition at 30 m/s, frequency normalised by the shaft frequency](../images/oei-noise-both-vs-oei.jpg)

In the OEI condition, reducing the advance ratio from 1.6 to 1.2 raises the blade-passing tone from about 75 dB to about 85 dB, with little change in the broadband level.

![Sound pressure level spectra for OEI at J = 1.2 and J = 1.6, 30 m/s](../images/oei-noise-advance-ratio.jpg)

Increasing the velocity from 20 to 30 m/s at J = 1.2 raises the broadband level by about 5 dB and the blade-passing tone from about 74 dB to about 85 dB. The broadband level follows the background noise of the tunnel.

![Sound pressure level spectra for OEI at J = 1.2 at 20 and 30 m/s, with the background noise](../images/oei-noise-velocity.jpg)

## Limitations

- **Thrust:** the thrust is not measured directly. It is derived from the difference between two balance measurements.
- **Tail-off data:** the tail could not be removed during the test, so the corrections use tail-off data from an earlier test of the same model.
- **Correction factors:** the factors for the octagonal test section are approximated with data for rectangular and elliptic sections.
- **Acoustics:** the test section is hard-walled and not acoustically treated, so the spectra include reflections. Three of the six fuselage microphones gave unusable data, and the analysis is based on the microphone at 60°.

[← Back to portfolio](../)
