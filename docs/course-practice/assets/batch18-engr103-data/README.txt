ENGR103 Batch18 - ORIGINAL SYNTHETIC PRACTICE INPUTS
Updated 2026-10-13. These files are original practice datasets, not instructor files, historical claims, solutions, or submitted coursework.

Required input-file workflow: Q01, Q02, Q03, Q07, Q08. Download the relevant CSV beside your Python script. Read the file; do not manually enter observations. All CSVs use UTF-8, comma delimiters, one header row, decimal points, and no index column or missing fields. For NumPy loadtxt, skip the single header row. Other correct libraries are allowed.

Formula-generated workflow: Q04, Q05, Q06, Q09, Q10. Generate arrays and compute signals as directed. Q09's angle CSV is OPTIONAL convenience, not a teacher-file requirement. It supplies angles only, no signal values. Q09 and Q10 use three panels: two left, one combined full-height right.

q01_sensor.csv: 41 numeric rows; columns time_s, voltage_V; units s, V. Q01: synthetic voltage observations, first column time and second voltage.
q02_device.csv: 21 numeric rows; columns current_mA, voltage_V; units mA, V. Q02: synthetic current-voltage observations; fit with an intercept.
q03_spring.csv: 13 numeric rows; columns x_cm, F_N; units cm, N. Q03: synthetic displacement-force observations used by the broken program.
q07_chip_counts.csv: 13 numeric rows; columns count, year; units dimensionless count, calendar year. Q07: fictional chip counts; count is deliberately before calendar year.
q08_growth.csv: 17 numeric rows; columns time_min, count; units min, dimensionless count. Q08: synthetic positive observations with variation for a log-space exponential fit.
q09_angles_optional.csv: 33 numeric rows; columns alpha_rad; units rad. Q09 optional convenience only: angle grid; no signal values or plot solutions.

Inputs only: no fitted coefficients, solution code, or finished plots are included. The online questions give all model formulas, fitting conventions and formatting requirements.
