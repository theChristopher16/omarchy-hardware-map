# A10 GPU source build against the iPad mini 2 runtime9 kernel

**Observed 1 November 2026.** This is a source and build comparison, not a
working iPad mini 2 GPU driver or a rendered frame.

The public [OrchardLinux A10 PowerVR patch](https://github.com/OrchardLinux/orchard/blob/25b46df53097962f69e63743b8f57e17ddf7cfd8/kernel/patches/drivers/gpu/0001-drm-imagination-Support-the-Apple-A10-T8010-GPU.patch)
was verified against Git blob `a5f6ee5fbc87e9e67148507f12122190323f963b`.
Its clean application check passed against the retained runtime9 kernel
source. The patch was applied only to a separate copy in
the driver lab; the saved kernel and device boot image were not changed.

In that isolated copy, normal `olddefconfig` accepted the new A10 GPU option.
The configuration differed from the retained runtime9 configuration by only
`CONFIG_DRM_POWERVR_APPLE=y`; it retained ARM64 4 KiB pages, modular PowerVR,
and built-in Apple RTKit. `modules_prepare` and the AArch64 PowerVR module build
completed successfully using the saved kernel's `Module.symvers`, with module
versioning disabled. The resulting module's release string matched runtime9,
and it retained the A10 `apple,t8010-gpu` device match. The module stayed in
the lab and was not copied to or loaded on the iPad.

Matching release strings alone do not prove a compatible runtime ABI.
Compilation does not prove that this driver runs with 4 KiB pages, supports
the iPad mini 2's A7, initializes its GPU, has compatible firmware or renders
anything. The A10 patch targets a different SoC and firmware interface; do not
force its device match onto J85. Hardware identity, resource ownership,
clock/reset/fabric readiness, memory mapping, recovery, a completed GPU job,
and a GPU-rendered frame remain open.

A second lab-only comparison compiled the same patched GPU heap source with
4 KiB and 16 KiB kernel configurations. The six compiler-emitted Apple heap
entries used page-size shifts of 12 and 14 respectively. The other fields in
those entries matched. This is a difference in compiled descriptions; it
does not show which values the A10 firmware or the J85 GPU would accept.

The previously staged Mesa 26.2.5 device-info lookup rejected a synthetic
A10 `13.10.6.2` profile. A focused host test of the newly published
[Orchard Mesa A10 profile](https://github.com/OrchardLinux/mesa/blob/4a8c71666d9dae6913d1af8ae77c5f34a7a86039/src/imagination/common/device_info/apple-a10.h)
accepted the same synthetic input and selected its Apple G9P feature; known
non-Apple profiles served as controls. This was a source-level lookup test,
not a complete Mesa build, GPU job, or test of the A7 iPad.

An ARM64 build of the same small lookup and test harness subsequently ran in
RAM on the iPad mini 2's CPU. The fixed synthetic A10 input and a fixed
non-Apple control both returned the expected results. The temporary binary
was removed and a same-boot postflight succeeded. This was a CPU-only software
test: it did not inspect the iPad's GPU, identify its GPU, or render a frame.

Separately, a fresh iPad mini 2 Wi-Fi/J85 runtime9 **RAM** boot was verified
over USB. A read-only inventory found no registered battery power supply,
no active Wi-Fi interface and no internal block device. The iPad's current
charge and charging rate were not measured. No internal storage device was
opened, no GPU driver was loaded, and no GPU register was accessed as part of
this build comparison.

Related prior observations are documented in the [J85 graphics evidence](https://github.com/theChristopher16/omarchy-hardware-map/blob/main/evidence/ipad-mini2-j85/2026-10-27-gpu-performance.md).
