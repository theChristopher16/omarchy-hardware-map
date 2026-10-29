# iPad mini 2 J85 keyboard: offline review

This note concerns a keyboard candidate for one experimental Linux RAM desktop.
The earlier owner-confirmed touch session showed aligned one- and two-finger
input after calibration; it did not establish physical keyboard typing. A
later inventory found no touchscreen input device and the touch module was
not loaded. Those observations and their limits are described in the
[existing touchscreen evidence](https://github.com/theChristopher16/omarchy-hardware-map/blob/main/evidence/ipad-mini2-j85/2026-10-27-touch-runtime9.md).

An R12 desktop image includes a keyboard recovery change. Its offline file
round trip and a separate comparison of contents, ownership, modes and link
structure passed. The image has not been launched as a desktop on the iPad;
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

## Later R12 image read on the iPad

On 29 October 2026 UTC, the full R12 image was transferred into RAM on the iPad, verified by hash, and mounted read-only in a private namespace. The keyboard controller and a software graphics backend file were read and their hashes matched the saved image. The temporary mount, loop device and filesystem module were removed cleanly, and the image was deleted from RAM. This checks image access and decompression; it does not establish a desktop launch, physical keyboard typing, touchscreen activation, GPU acceleration or an internal installation.

A second test at 03:19 UTC mounted the same hash-verified RAM image read-only with execution enabled inside private mount and network namespaces. The program `/usr/bin/true`, its loader and libc were hash-checked; this one minimal dynamically linked program ran successfully as root. The temporary mount, loop device, filesystem module and image were removed cleanly. This does not establish a desktop launch, a non-root privilege drop, touch or keyboard interaction, GPU acceleration, or internal installation.

A further 29 October test ran `foot --version` as root from the hash-verified
R12 image mounted read-only in private RAM namespaces. It printed the expected
Foot 1.28.0 version line and exited successfully. Normal unmount, loop detach,
filesystem-module unload and cleanup succeeded; a separate same-boot
postflight confirmed the stated resources were released. This version-mode
check did not show a terminal window or establish process-tree quiescence,
keyboard or touch operation, GPU acceleration, charging or internal installation.


A subsequent 29 October version-only check ran the hash-checked R12
`Hyprland --version` executable on the iPad from a hash-verified, read-only RAM
image in private mount and network namespaces. It ran as root with
no-new-privileges, reported Hyprland 0.56.2 and exited successfully. Normal
unmount, loop detach, filesystem-module unload and cleanup succeeded; a separate
same-boot postflight verified the stated resources were released. This check
did not establish a graphical session, touchscreen or keyboard input, a GPU job
or accelerated rendering, charging, or internal installation. It also did not
prove complete descendant-process quiescence.


A later configuration-only check bound a hash-pinned 325-byte minimal display
Lua file read-only over the hash-verified R12 image in private RAM mount and
network namespaces. On the iPad, Hyprland 0.56.2 ran `--verify-config` as
root, returned 0 and reported `config ok`. Normal reverse cleanup of the
bind and image mounts, loop and filesystem module succeeded; a separate
same-boot postflight confirmed the stated resources were released. This checks
that one configuration through the version's verification mode. It did not
establish a desktop or window, seat or VT operation, touch or keyboard input,
a GPU job or acceleration, charging, or internal installation.

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

## Keymap sizing

A separate offline source review found that the saved keyboard's keymap upload
allocated and supplied the formatted string length without its terminating
NUL, while copying the NUL as well. A source-only candidate uses the
NUL-inclusive size and checks formatting and allocation failures. Four author
host-test methods and 42 independent formatted keymap/file cases passed in
normal and optimized Python. An independent test also reproduced an existing
file-descriptor and mapping leak after successful uploads; the size candidate
does not fix that leak. These tests did not perform a full XKB parse, run a
compositor, build the ARM64 application or access the iPad. The candidate has
not been installed; its detailed local test artifacts are not included here.

A separate, uninstalled cleanup successor attempts to release the local
mapping, original file descriptor and formatted buffer after the keymap
request. Five author host methods and 63 independent scenario/map cases
passed in normal and optimized Python using fake transport; some negative
controls deliberately reproduced missing or misdirected requests. The
successor assumes the target libwayland duplicates the file descriptor during
marshalling. Public source for two libwayland revisions does so, but the
iPad's actual runtime library and the source-to-binary relationship have not
been verified. A queued request is not proof of compositor delivery. The
cleanup candidate is not ready to install.

## Combined source snapshot

The single-contact ownership source and the conditional keymap sizing and
resource-cleanup source are now combined in one uninstalled experimental source
snapshot. An independent local review checked all 46 archived source files,
confirmed only those two replacements, and reproduced both patch chains. Five
author host-test methods and four independent source/scratch checks passed in
normal and optimized Python. The host fixtures use fake Wayland and queued-file
descriptor behavior, including negative controls for unresolved failures.

The Omarchy Super key layout, icon-drawing source and theme color controls
remain present in the source. That does not establish visible logo rendering,
theme reload or keyboard typing. The combined source has not been built as a
full application or tested with the real target Wayland library, compositor or
iPad. Surface-loss and modifier-release issues remain, and the target library's
file-descriptor ownership behavior is unverified. The snapshot is not ready to
install, and no new physical touch or keyboard result is claimed.


## Later offline keyboard link and startup

On 29 October, a newer, uninstalled keyboard candidate was linked as an AArch64 Linux executable in an isolated build. Static review checked its ELF architecture, direct dependencies, recorded link inputs and selected first-damage request sequence. A separate device-free version-only startup using saved R12 libraries printed `wvkbd-0.21` and exited successfully with empty stderr; this option returns before normal Wayland initialization.

An earlier instrumented startup emitted dynamic symbol-lookup diagnostics despite exiting successfully, so later library fallback behavior remains unverified. Neither run used the iPad or a compositor. They do not establish visible keyboard rendering, touch typing, modifier and release behavior, theme reload, or installation.


## Offline uppercase A-accent candidate

A separate uninstalled keyboard source candidate adds eleven direct uppercase choices to the A-accent compose page using the existing unmodified Copy path. The prior safety gate still refuses Copy while a local modifier is held; Shift must be toggled off before using these choices. Host tests using fake drawing and transport exercised the labels, values, press and release handling, and Shift refusal. An independent source and geometry review reproduced the tests and checked hit testing at synthetic screen sizes.

A fresh local cross-link produced an AArch64 Linux executable containing the new choices, but the linker emitted an SFrame error despite the runner taking its successful path. The result uses different startup inputs from an earlier successful build; its runtime and unwinding behavior remain unverified. The candidate has not been installed or run on the iPad. These host checks do not establish a usable on-screen layout, compositor acceptance, physical touch typing, XKB parsing, or actual text delivery.


### Newer-linker comparison

A subsequent workspace-only build produced a macOS-native GNU binutils 2.46.1 AArch64 Linux linker. Its source archive matched published Gentoo package digests, but its detached GNU signature remains unverified. The host-tool build completed with several retained configuration and compiler warnings. GNU's small AArch64 SFrame v3 fixture and a discard control passed; no generated Linux file was executed.

The uppercase-accent keyboard was then relinked separately with the new linker using the same recorded application objects and libraries as the earlier attempt. The recorded link exited zero with empty stderr, and the earlier SFrame diagnostic did not recur. Independent static review confirmed the linked uppercase layout choices, matching dependency and import records, and SFrame v3 data. The binary remains uninstalled and unexecuted; loader behavior, unwinding, compositor acceptance, physical touch and text delivery remain unverified.
