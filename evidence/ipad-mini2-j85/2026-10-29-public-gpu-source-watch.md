# iPad mini 2 GPU: public-source watch

29 October 2026 UTC. This note records public-source research and a limited
RAM-boot module inventory. The iPad mini 2's GPU identity, Linux driver
compatibility and accelerated rendering remain unverified.

## Runtime9 module inventory

At approximately 04:14 UTC on 29 October, the saved runtime9 kernel
configuration specified `CONFIG_DRM_POWERVR=m`. A read-only comparison found
seven named lab source files matched the [public Hoolock base at commit
`6831bc70`](https://github.com/HoolockLinux/linux/tree/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination):
`pvr_device.c`, `pvr_device_info.c`, `pvr_device_info.h`, `pvr_fw.c`,
`pvr_drv.c`, `pvr_queue.c`, and the public DRM UAPI header
[`pvr_drm.h`](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/include/uapi/drm/pvr_drm.h).
The seven-file match does not establish the entire build tree or its contents
at build time. The base [Kconfig](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/Kconfig)
names the module `powervr` when configured as a module.

A separate read-only inventory of that RAM boot found a generic `powervr.ko`
file present and the PowerVR module not loaded. No GPU module was loaded for
the check. File presence and the build option do not establish J85 GPU
identity, a compatible binding or firmware, GPU initialization or accelerated
rendering. The observations are point-in-time evidence, not a GPU test.

## OrchardLinux DART draft

[OrchardLinux/linux draft PR #1](https://github.com/OrchardLinux/linux/pull/1)
proposes correcting a packed stream-control update in an Apple DART driver.
Its author reports a J71s-config object build and mocked register/concurrency
tests; the PR explicitly says those do not establish working hardware DMA or
storage on S8000. The draft was open and unmerged when checked, at base
`6831bc701a6ce059e71e5aaa9488c9195bea6927` and head
`0b1c4b0d7026be4a5e3948669b5fec0583865576`.

The public base driver includes an S5L8960X profile, and its public J85
device source identifies the mini 2 as S5L8960X/A7. A bounded inspection of
that source and its local includes did not find a GPU-to-DART binding; it does
not prove that the physical route is absent. Whether the iPad's GPU uses the
driver is unverified. The PR is a conditional source lead, not evidence of
working J85 GPU DMA, a compatible driver or an accelerated frame.

## Historical G6430 conformance

A [2014 Khronos conformance entry](https://www.khronos.org/conformance/adopters/conformant-products/opengles)
submitted by Imagination Technologies lists the PowerVR Rogue G6430 among
products for OpenGL ES 3.1 on ARMv7 Linux 3.4.10 with a null window system.
It does not identify a board, GPU revision, driver source or license, firmware,
or a physical J85 device. This historical record does not establish an open
driver or compatible Linux graphics stack for the iPad mini 2.

The separate [Mesa PowerVR support table](https://docs.mesa3d.org/drivers/powervr.html)
distinguishes revisions by BVNC and does not list G6430. A model-family name
is not a measured GPU revision or proof of compatibility.

## Upstream firmware-interface limits

At [Linux commit `c339f401`](https://github.com/torvalds/linux/blob/c339f4010dea8b0d754f84ace70cd1b089878ef8/drivers/gpu/drm/imagination/pvr_device.c#L516-L540),
the PowerVR kernel driver lists BVNCs `33.15.11.3`, `36.52.104.182` and
`36.53.104.796` as supported. A [vendor-authored linux-firmware change](https://kernel.googlesource.com/pub/scm/linux/kernel/git/tnguy/firmware/+/f328d8c751ab4d2fae0e66b600bd02779d777808%5E%21/)
records the corresponding three firmware filenames. This is a snapshot of
those sources, not an inventory of every vendor firmware distribution.

At the same Linux revision, the [firmware validator](https://github.com/torvalds/linux/blob/c339f4010dea8b0d754f84ace70cd1b089878ef8/drivers/gpu/drm/imagination/pvr_fw.c#L82-L151)
requires an appropriate file size and header/layout, an exact firmware-to-GPU
BVNC match, major version 1 and an `OPEN_SOURCE` compatibility flag. The
[header](https://github.com/torvalds/linux/blob/c339f4010dea8b0d754f84ace70cd1b089878ef8/drivers/gpu/drm/imagination/pvr_fw_info.h#L70-L95)
identifies the info format as version 3. The flag name is not proof that
firmware source is public or that its license covers a particular device.
A matching filename alone would not prove a working driver or legal rights.

Mesa's table is a separate userspace support list and includes revisions not
on that kernel snapshot's supported list. The [Linux device-tree binding](https://github.com/torvalds/linux/blob/c339f4010dea8b0d754f84ace70cd1b089878ef8/Documentation/devicetree/bindings/gpu/img,powervr-rogue.yaml)
lists no Apple A7 integration. The iPad's exact GPU/BVNC, compatible firmware,
platform integration and hardware acceleration remain unverified. These are
public source observations, not a new GPU test.

A separate conditional comparison examines a public [Intel/Fugu source profile](https://android.googlesource.com/kernel/x86_64/+/66d871570ff4011a986da6b96359c69c0c60d783/drivers/external_drivers/intel_media/graphics/rgx/hwdefs/km/cores/rgxcore_km_1.72.4.12.h)
for BVNC `1.72.4.12` and its [configuration header](https://android.googlesource.com/kernel/x86_64/+/66d871570ff4011a986da6b96359c69c0c60d783/drivers/external_drivers/intel_media/graphics/rgx/hwdefs/km/configs/rgxconfig_km_1.V.4.12.h).
Some feature names have counterparts in the [current Linux schema](https://github.com/torvalds/linux/blob/c339f4010dea8b0d754f84ace70cd1b089878ef8/drivers/gpu/drm/imagination/pvr_device_info.h),
but other values remain unresolved. Similar field names do not prove
command, firmware, ABI or platform compatibility; the Intel example does not
identify the iPad's GPU.

## Services 1.17 partial comparison

An offline comparison of the public [ChromiumOS Services 1.17 kernel
headers](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_srvcore_bridge.h)
and a [Mesa Services header from a non-official mirror](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv_bridge.h)
found matching CONNECT field order and 42 sampled bridge group/function
indices. Their build revisions differ, and effective build options, including
PDUMP, can affect whether CONNECT is accepted.

A separate freestanding AArch64 compile checked the sampled layouts and
offsets in a manually transcribed fixture; independent checks also compiled
public declaration fragments with synthetic shims. Packing and synthetic enum
negative controls failed as expected. These checks use one compiler target,
not the actual paired Linux builds or a live ioctl, and do not establish the
full ABI or firmware compatibility.

The newer ChromiumOS driver's [feature table](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/km/rgx_bvnc_table_km.h)
has one observed device-feature row, labeled `4.0.2.51`. That profile is
not an established match for the iPad mini 2. This partial comparison does not
identify J85 or demonstrate compatible firmware, initialization, a GPU job,
or an accelerated frame. No GPU job was run for this comparison.
