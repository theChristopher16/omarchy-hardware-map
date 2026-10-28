# iPad mini 2 J85 touchscreen: two RAM boots

This owner-run report concerns one iPad mini 2 Wi-Fi (A1489/J85) on
experimental Linux RAM boots. The [draft bring-up report](https://github.com/OrchardLinux/hardware/pull/5)
contains the wider device context.

On the earlier touch4 boot, the owner confirmed aligned one- and two-finger
input after calibration. That demonstration does not prove automatic startup,
suspend/resume behavior or touch support on a different kernel.

On 27 October 2026, a read-only inventory of the later runtime9 GPU diagnostic
boot showed only a physical-button input device. The matching touch module was
present but not loaded, and its two required private inputs were not staged in
the RAM firmware directory. No touch driver was activated and no touchscreen
hardware operation was performed for this inventory. Absence of the driver or
logs does not prove a cold hardware state. Repeatable startup, safe ownership
and cleanup, and a physical touch check on this boot remain open.

An isolated source change removes periodic worker wakeups while the touch
scanner is inactive, while leaving active polling unchanged. Host concurrency
and fault tests passed; the change has not been built for the target kernel or
run on the iPad, so no battery-life or touch improvement is claimed.

An offline on-screen keyboard candidate rejects invalid font characters before
replacing the keyboard and checks compositor visibility after a failed-theme
rollback. Twenty-three process and state tests passed on macOS and isolated
x86_64 Linux using simulated compositor and process behavior. A single-file
overlay is pinned to a previously verified R11 RAM desktop image; no updated
full image has been built and neither the overlay nor physical typing has
been tested on the iPad.

No recovered firmware, calibration, private logs, credentials, network
addresses or personal device identifiers are included here.
