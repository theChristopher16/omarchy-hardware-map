# Orchard J85 profile and additional PowerVR reference — 6 November 2026 UTC

## Orchard's J85 boundary moved

Orchard `main` now contains a real experimental device profile for the Wi-Fi
iPad mini 2 (`iPad4,4` / `apple,j85`), not only the earlier identity record.
[The profile](https://github.com/OrchardLinux/orchard/blob/fa5fd64bed644afc0c4a7212d80561832333637f/devices/j85/device.toml)
selects the `apple-4k` kernel, `s5l8960x-j85` DTB, `checkm8-pongo` through the
`checkra1n` entry and a pinned public-firmware recipe. The catalog addition is
in [8ef6165](https://github.com/OrchardLinux/orchard/commit/8ef6165354448d2e0fc0816cb497c355e49a9017),
and [fa5fd64](https://github.com/OrchardLinux/orchard/commit/fa5fd64bed644afc0c4a7212d80561832333637f)
makes recovery availability derive from the selected kernel.

This is useful build and boot-chain integration, but it is not a J85 install
or hardware qualification. Orchard labels the profile experimental, says its
recovery image has not run on this board and still marks storage, GPU, touch,
Wi-Fi, charging, audio and cameras missing. The display, backlight, buttons and
USB entries are `untested`, meaning only that their drivers or boot console are
present in the device tree. No feature should be promoted from our separate
RAM image until the equivalent Orchard artifact is built and tested on J85.

In particular, the new profile does not remove the DFU/checkm8 dependency,
enable internal-root installation or replace Apple's first-stage boot logo.
Storage read and write both remain missing, so a native installer is still
outside the evidence.

## A9/G5P adds another useful public GPU architecture reference

[Orchard PR #74](https://github.com/OrchardLinux/orchard/pull/74) is a draft
integration of the Apple A9 G5P kernel render driver for J71t. Its reported
hardware evidence comes from the contributor's exact fork kernel: original
locally extracted META firmware, firmware communication, a render node, a
pixel-exact clear and displayed compositor output. The PR explicitly says the
exported Orchard image has not itself been booted or qualified.

[Orchard Mesa PR #6](https://github.com/OrchardLinux/mesa/pull/6) layers the
experimental A9 backend into the shared PowerVR userspace path and reports a
Zink desktop stack on that A9 hardware. This provides another earlier Apple
Rogue reference alongside the A10 work, but it is not a drop-in A7 driver.
J85 uses 4 KiB pages and different firmware, wrapper resources, register
contracts, command records and generation features.

The transferable parts are architectural and procedural:

- keep platform power-domain ownership separate from GPU-local firmware and
  transport ownership;
- extract the owner's original firmware locally and fail closed on exact
  revision and digest, without publishing Apple bytes;
- validate typed job records in the kernel rather than accepting arbitrary
  register images;
- prove firmware alive, a fenced null job and an off-screen pixel-exact clear
  before attempting presentation or a desktop;
- keep hardware evidence tied to the exact kernel, firmware and userspace
  revisions that produced it.

The A9 constants, firmware image, context programs, descriptor layouts and
16 KiB-page assumptions are not J85 inputs and must not be copied.

## Same-day Orchard changes relevant to the J85 lab

[Orchard PR #80](https://github.com/OrchardLinux/orchard/pull/80) merged our
PowerVR reset-safety contribution. If acquiring the GPU power reference fails,
`pvr_power_reset()` now returns before taking the reset lock, invoking reset
callbacks or releasing a reference it never acquired. Orchard reproduced the
source tree and compiled the change for `apple-16k`; the patch has not been
booted on a device, and it does not implement J85 clocks, firmware or jobs.

[Orchard PR #81](https://github.com/OrchardLinux/orchard/pull/81) merged two
generic Apple DWC2 gadget fixes: use `INCR16` DMA bursts and NAK idle non-iso
OUT endpoints instead of allowing them to block the shared receive FIFO. The
author measured materially better USB-network and FunctionFS throughput on
J71b, and the patches are in the common Apple USB series. They are promising
for the J85 serial/network stalls seen during RAM bring-up, but have not been
tested on J85 and are not GPU support. The same PR's Tristar no-source fallback
is also untested outside its source board and must not be treated as a J85
charging result.

## Other public changes reviewed

[The J86 repository's 6 November update](https://github.com/perryraskin/ipad-mini2-omarchy/commit/536e8dbb1cf57b712dbc45fdf37fbd1683188617)
records progress toward an offline internal-root audit, while still leaving
J85/J86 installation disabled and unqualified. It is useful as a refusal and
receipt model, not evidence that J85 storage works. Board-specific firmware,
calibration and settings remain non-transferable.

A newly published [J85 Pongo/RAM-Linux lab](https://github.com/juan-garassino/003-pongo-lab/tree/f05e75cc243811f7bf5d75468bbce290cb2f5bca)
documents another same-board boot path and a touch diagnostic. Its published
hardware result is a touchscreen probe timeout, not a working GPU or touch
stack, and the repository currently declares no license. It is useful for
cross-checking boot and diagnostic structure only; its source is not a reusable
input unless the author supplies compatible licensing and independent evidence.

Our earlier documentation contribution was merged as
[Orchard PR #5](https://github.com/OrchardLinux/orchard/pull/5). The new J85
profile supersedes its catalog limitation, but not its hardware-support
warnings. There is no honest Orchard feature PR to open from the current J85
GPU work yet: the next publishable contribution needs a reproducible Orchard
build and native J85 evidence, not an offline module or synthetic test result.

## Resulting J85 GPU plan

The current guarded J85 sequence remains:

1. preserve the proven framework-owned `gfx` power-domain acquire and rollback;
2. identify and test the physical A7 clock/reset/startup owner without a
   duplicate PMGR owner;
3. prove the exact A7 META firmware revision alive;
4. complete a fenced null job;
5. complete an off-screen pixel-exact clear;
6. only then add presentation and a triangle.

The A9 work strengthens the design target for steps 3–6. It does not close
step 2 or establish a working J85 GPU, render node, frame or accelerated
Omarchy desktop.

## Follow-up: exact provider gap and current public delta

The current [Orchard PR #74](https://github.com/OrchardLinux/orchard/pull/74)
head reviewed for this follow-up is
[`85adc6e`](https://github.com/OrchardLinux/orchard/commit/85adc6e3cad99c73b25c254eb88c07e5b8f8d217).
Its most transferable contribution is the separation of responsibilities:
local exact-device firmware extraction, firmware transport, a typed render
ABI, VM/arena lifetime, GEM/PRIME/syncobj integration, bounded retirement and
recovery, and release-time power/IRQ teardown. That architecture is useful for
reviewing a future J85 driver. Its J71t MMIO, IRQs, device tree, firmware
hashes, command ABI and reset constants are still A9-specific and must not be
copied into the A7 port. Orchard is mixed/per-file SPDX, so any eventual source
reuse also needs a file-level license check.

The J85 work now has a more precise step-2 boundary. A phase-separated API for
the A7 provider has been host-tested, but all four physical callbacks remain
unimplemented: control-bus/profile live, START-safe, post-START live and later
core-rate observation. The successful tests use synthetic callbacks. Retained
J85 metadata contains a frequency catalog and SGX performance rows, but no
source-backed relation from the GFX power gate to a frequency ID, active
performance index/bank, units or state-to-divider control. Consequently a
PMGR-active bit, CPU counter, parsed table row or callback presence cannot be
promoted to proof of a safe physical START profile.

This narrows the next useful work without changing the hardware claim: identify
the exact J85 consumer/selector and its current reset/mapping epoch, then bind a
bounded physical observation to the same owner interval. Until that exists,
the provider must refuse rather than invent a fixed clock or choose an OPP row.
No physical callback, firmware-alive event, fenced job or GPU frame has been
verified on J85.

Two new Orchard `main` commits are relevant to later power work:
[`c8fed9c`](https://github.com/OrchardLinux/orchard/commit/c8fed9cd8e30af1b8925869f5d252d673c12b7ad)
and
[`7e8eceb`](https://github.com/OrchardLinux/orchard/commit/7e8ecebccf3be0fbe90fe8cf7790eadf4c545266)
add suspend/charger-wake changes. They are not GPU support and have not been
qualified on J85. A fresh scan of the tracked J72, J86, omapad, img-pvr,
Hoolock and Project Cascadia sources found no newer evidence-backed A7/J85 GPU
implementation.
