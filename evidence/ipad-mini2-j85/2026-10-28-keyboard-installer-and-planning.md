# iPad mini 2 J85 keyboard: offline review

This note concerns a keyboard candidate for one experimental Linux RAM desktop.
The earlier owner-confirmed touch session showed aligned one- and two-finger
input after calibration; it did not establish physical keyboard typing. A
later inventory found no touchscreen input device and the touch module was
not loaded. Those observations and their limits are described in the
[existing touchscreen evidence](https://github.com/theChristopher16/omarchy-hardware-map/blob/main/evidence/ipad-mini2-j85/2026-10-27-touch-runtime9.md).

An R12 desktop image includes a keyboard recovery change. Its offline file
round trip and a separate comparison of contents, ownership, modes and link
structure passed. The image has not been booted or tested on the iPad, and
physical typing and keyboard recovery remain unverified.

An independent offline review of the legacy keyboard installer found that
its safeguards for target selection and user-data preservation are incomplete.
The old installer is **not ready to run**.

A separate read-only file planner has no enabled apply path. Its source was
independently reviewed, and its file-planning and refusal behavior passed
tests using synthetic temporary roots. It has not been validated on a real
target or the iPad. Its checks do not authenticate an offline target or
establish exclusive ownership, safe backup reservation or crash recovery.
It is not an installer or evidence that the keyboard is ready to deploy.

The detailed installer and planner review artifacts are not included with
this note. These are reported offline findings; no new physical touch or
keyboard result is claimed.

## Input ownership review

A subsequent offline review of a wvkbd source archive packaged with the
staged keyboard found that the saved touch callbacks do not track touch IDs
and share one active key slot with pointer input. This is a source and host
fixture finding; the corresponding failure has not been observed on the iPad.
The archive's provenance records [wvkbd commit bbecd996](https://github.com/jjsullivan5196/wvkbd/tree/bbecd996aae5a4dc4bc32bd643d37cefa9f63752),
with additional Omarchy changes. A reproducible link from that archive to the
staged ARM64 binary has not been established.

An uninstalled source-only candidate arbitrates one touch contact or pointer
button, and attempts to release latched momentary modifiers on normal hide. It
is not multitouch chording. Seven author host-test methods and fourteen
independent compiled synthetic cases passed in normal and optimized Python;
some negative cases passed by reproducing remaining faults. The tests used
fake Wayland/compositor output and selected archived keyboard code, not a full
application build or the iPad.

Independent review identified unresolved surface-close cleanup, a conditional
configuration-loss case, and a layer-change path that can leave modifier key
releases unsent. Actual Caps Lock and AltGr behavior in the compositor also
remain unverified. The candidate is not ready to install. Its source and local
review artifacts are not included in this public note, and no new physical
touch, keyboard or accelerated-GPU result is claimed.
