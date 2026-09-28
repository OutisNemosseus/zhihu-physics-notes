"""ENGR 103 ICA 1-5: estimate time since death using Newton's cooling law."""

from math import log


NORMAL_BODY_TEMP_F = 98.6
MINUTES_PER_DAY = 24 * 60


def clock_to_minutes(clock_time):
    """Convert 24-hour HH:MM notation to minutes after midnight."""
    pieces = clock_time.strip().split(":")
    if len(pieces) != 2 or not all(piece.isdigit() for piece in pieces):
        raise ValueError("Time must be written in 24-hour HH:MM format.")
    hour, minute = (int(piece) for piece in pieces)
    if not 0 <= hour < 24 or not 0 <= minute < 60:
        raise ValueError("Hours must be 0-23 and minutes must be 0-59.")
    return 60 * hour + minute


t1_minutes = clock_to_minutes(input("First measurement time (HH:MM): "))
temperature1_f = float(input("First body temperature (F): "))
t2_minutes = clock_to_minutes(input("Second measurement time (HH:MM): "))
temperature2_f = float(input("Second body temperature (F): "))
surroundings_f = float(input("Surrounding temperature (F): "))

# A second clock time earlier than the first means the next calendar day.
elapsed_minutes = (t2_minutes - t1_minutes) % MINUTES_PER_DAY
if elapsed_minutes == 0:
    raise ValueError("The measurement times must be different.")
if not surroundings_f < temperature2_f < temperature1_f < NORMAL_BODY_TEMP_F:
    raise ValueError("For cooling, require Ts < T2 < T1 < 98.6 F.")

k_per_min = -log(
    (temperature2_f - surroundings_f) / (temperature1_f - surroundings_f)
) / elapsed_minutes
minutes_before_first = log(
    (NORMAL_BODY_TEMP_F - surroundings_f) / (temperature1_f - surroundings_f)
) / k_per_min
death_clock_minutes = (t1_minutes - round(minutes_before_first)) % MINUTES_PER_DAY
death_hour, death_minute = divmod(death_clock_minutes, 60)

print(f"Time between measurements: {elapsed_minutes} min")
print(f"Cooling constant k: {k_per_min:.5f} per min")
print(f"Time from death to first measurement: {minutes_before_first:.0f} min")
print(f"Estimated clock time of death: {death_hour:02d}:{death_minute:02d}")
