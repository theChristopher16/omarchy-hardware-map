# iPad mini 2 J85 GPU performance-record investigation

This is an owner-run experimental report for one iPad mini 2 Wi-Fi
(A1489/J85, Apple A7), updated 27 October 2026. It is not an OrchardLinux
device profile or installation guide. The [draft J85 bring-up report](https://github.com/OrchardLinux/hardware/pull/5) gives the wider physical
boot, touch, Wi-Fi and GPU-power context.

On a custom Linux RAM boot, a bounded, read-only capture of the boot-populated
device metadata reported seven GPU performance records. It did not read GPU
registers or measure the GPU clock. A later offline analysis of selected
locally recovered A7 instructions found a path that processes sixteen slots
and writes five arrays; the exact units and physical clock domains are still
unverified.

An authored serializer was compared offline with that bounded instruction
fragment using one captured-table fixture with synthetic surrounding data
and 128 randomized synthetic cases. Ten rejected-input and overlap cases
also passed without output writes. Host address/undefined-behavior sanitizer
checks passed, and the authored C compiled to an AArch64 Linux object.
These tests are local and have not exercised the serializer on the iPad.

The captured metadata's unused table bytes were zero. That does not prove
that the original GPU object's unused slots or the separate auxiliary inputs
are initialized correctly. A distinct source path references an optional
SRAM performance table. A later read-only capture on the same RAM boot found
that the firmware metadata had no such property; it did not establish the
GPU object's auxiliary values or physical clock state. An offline trace of
one selected new-object path zeroed synthetic performance fields, but a
negative control showed that the absent-property path preserves pre-existing
auxiliary changes. Intervening initialization remains unmodeled.
The framebuffer remains CPU-rendered: no GPU core identity, firmware
handshake, submitted job, accelerated frame, or matching DRM/Mesa path has
been demonstrated.

No recovered Apple firmware, instruction bytes, device tree, calibration,
private logs, credentials, or personal device identifiers are included here.
