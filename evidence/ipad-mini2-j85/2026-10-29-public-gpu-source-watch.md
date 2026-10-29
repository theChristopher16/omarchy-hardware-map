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


### Static module metadata

A later same-boot SHA-256 comparison found that the iPad's unloaded
`powervr.ko` file matched the existing lab module. Static `modinfo` on the
lab file listed device-tree aliases for `thead,th1520-gpu`, `img,img-rogue`
and `img,img-axe`, and firmware names `powervr/rogue_36.53.104.796_v1.fw`,
`powervr/rogue_36.52.104.182_v1.fw` and
`powervr/rogue_33.15.11.3_v1.fw`.

These are module metadata, not evidence that any named firmware file is
present or suitable, that a J85 device-tree node matches, or that the iPad's
GPU identity or GPU support has been established. The file comparison does not
prove the module's compile-time source tree. The module was not loaded or
probed for this check.

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

### Follow-up: Orchard's layered DART changes

A later check on 29 October found that [OrchardLinux/linux PR #1 was
closed](https://github.com/OrchardLinux/linux/pull/1) after its maintainers
incorporated related changes in Orchard's hardware patch layer. The
[Apple-4K series](https://github.com/OrchardLinux/hardware/blob/ae1457edee7d2e52213e4d979aee02dbbeb90ce0/kernel/series/apple-4k)
describes A7, A8 and A8X; it includes
[S5L8960X page-table changes](https://github.com/OrchardLinux/hardware/blob/ae1457edee7d2e52213e4d979aee02dbbeb90ce0/kernel/patches/drivers/iommu/0002-iommu-io-pgtable-dart-Add-a-quirk-for-S5L8960X-table.patch)
and a [stream-control lock](https://github.com/OrchardLinux/hardware/commit/f82f35a396d314bd815a2f44e01727993e30cc21).
A maintainer reports iPad 6 Wi-Fi and NVMe tests for the latter; those are
A10 peripheral observations, not J85 GPU tests. The lock applies to a
layered source tree and is not established as a standalone patch against the
pinned Hoolock base.

The public [J85 device tree](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/arch/arm64/boot/dts/apple/s5l8960x-j85.dts#L9-L13)
uses `apple,s5l8960x` as a board SoC compatible; the driver's
`apple,s5l8960x-dart` is a separate IOMMU-node match. A bounded inspection of
the pinned board include closure did not identify an `iommus` property or a
GPU-labelled node. That is not proof the physical mapping is absent. The
upstream changes do not establish J85 GPU DMA, compatible firmware, or an
accelerated frame.

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

## Series 6XT render precedent

A [Linux GPU patch discussion](https://patchew.org/linux/20260728091804.382753-1-wenst@chromium.org/) reports Vulkan and Zink rendering on a MediaTek MT8173 Chromebook with a PowerVR GX6250, BVNC `4.40.2.51`, using Mesa 26.1.5 and a platform-specific Linux patch series. The author's benchmark logs show several scenes before the runs were interrupted. A second tester reported that a newer firmware build allowed several scenes to render before a later hang and kernel warning. These are external reports of experimental behavior, not a completed stability test.

This Series 6XT GPU and its MediaTek power, clock and device-tree integration are not the iPad's established GPU or platform. [Mesa's support table](https://docs.mesa3d.org/drivers/powervr.html) lists that exact GX6250 revision as partial and warns that features and workarounds may be missing. The precedent does not identify J85's GPU, establish a compatible firmware license or ABI, or demonstrate an accelerated iPad frame.

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


## Services and native PowerVR use different kernel interfaces

An independently reviewed comparison of public source found a practical
distinction for the prepared Mesa work. Mesa has a
[Services winsys](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv.c#L682-L728)
that expects a DRM driver named `pvr` with version 1.17 and initializes
the Services bridge. Mesa also has a separate
[native PowerVR winsys](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvr_winsys.c#L93-L115),
selected for a driver named `powervr`.

The examined [Hoolock PowerVR driver](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_drv.h#L10-L19)
reports `powervr` version 1.0 and exposes a
[different native DRM interface](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/include/uapi/drm/pvr_drm.h#L97-L111).
For example, DRM-relative slot 5 is
[Services module initialization](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv_bridge.h#L103-L120)
in the Services interface and `PVR_VM_MAP` in the native interface. Equal
slot numbers do not make their structures or operations interchangeable.
Changing a reported name or version would not translate the interfaces.

Mesa's [device discovery](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/pvr_instance.c#L68-L124)
looks for a compatible render device; a display-only framebuffer or primary
node does not by itself provide that interface. Opening a render node can
invoke a driver callback and should not be treated as a passive file check.

This is a source comparison, not a new GPU hardware test. The iPad's actual
GPU identity, matching kernel binding, platform resources and compatible
firmware remain unverified, as do GPU initialization and an accelerated frame.
Compiling the prepared Services changes alone would not supply a compatible
kernel device; no ioctl or GPU job was run for this comparison.


## Offline Mesa Services object build

On 29 October, an offline ARM64 Linux build of Mesa 26.2.5 with its
Services winsys enabled compiled three patched PowerVR Rogue source files
for compute, render and transfer submission. Independent review matched the
saved build log and the three outputs, identifying each output as an AArch64
relocatable object. The build completed successfully; two separate helper
sources produced warnings about ignored `fread` return values.

That earlier stage verified object compilation only. It did not itself link a
Vulkan ICD or test a kernel Services interface, firmware, the iPad or a GPU.
It does not establish this iPad's GPU identity, a compatible driver or an
accelerated frame.


### Subsequent offline ICD link

A later offline ARM64 build of Mesa 26.2.5 with Services enabled successfully
linked an AArch64 PowerVR Vulkan ICD shared object. Independent inspection
checked the saved build result and linked artifact. The build had no
configured Wayland Vulkan window-system platform or OpenGL ES stack.
The linked file requires dynamic libraries and includes `GLIBC_2.38` among
its symbol-version requirements; availability on the iPad is unverified.

The link does not establish loader operation, kernel or firmware
compatibility, GPU execution, display presentation or an accelerated frame.
The ICD has not been tested on the iPad.


### R12 archive comparison and separate Wayland build

An independently reviewed static comparison between the earlier non-Wayland
ICD and a saved R12 image found candidates for the ICD's ten named direct
libraries and their recorded version labels. The image's libc exports the four
`GLIBC_2.38` symbol/version pairs that ICD requires. This does not establish
what the iPad would load or prove relocation. A name-only image scan found no
conventional Vulkan loader or ICD manifest filenames; differently named code
or later runtime mounts were not ruled out.

A separate offline ARM64 Mesa 26.2.5 configuration enabled Services and
Vulkan Wayland WSI. Its build succeeded and linked an AArch64 PowerVR Vulkan
ICD; independent inspection found Wayland and Services functions retained in
the file. The build produced two helper-source warnings about ignored `fread`
results. Two Wayland function probes returned `NO`; the source contains
fallback paths whose runtime behavior is untested.

The R12 library comparison above applies to the earlier non-Wayland ICD, not
this new Wayland build. The Wayland ICD depends on `libwayland-client.so.0`,
whose availability and compatibility on the target have not been established.
Vulkan WSI alone does not provide Hyprland's OpenGL/EGL renderer. This ICD
has not been tested with a Vulkan loader, the iPad's GPU, kernel or firmware.
No Wayland presentation or accelerated frame is established.


### Offline dependency lists and transfer cleanup

Two reported device-free ARM64 Linux checks used an R12-derived dynamic linker
to list the dependencies of separately built Mesa 26.2.5 PowerVR Vulkan ICDs,
one without Wayland and one with Wayland. The saved Wayland list selects all
11 non-interpreter libraries from a prepared bundle, including the Wayland
client library and its `libffi` dependency. The non-Wayland run was reported
to select its expected bundle; its raw output was not retained, so that listing
could not be independently checked.

Separately, a source-only candidate changes the [Mesa Services transfer
submission error path](https://github.com/chaotic-cx/mesa-mirror/blob/ddaf85e353442d9d7f192fdcf1823e652e3f2ee3/src/imagination/vulkan/winsys/pvrsrvkm/pvr_arch_srv_job_transfer.c)
to free a temporary heap allocation if duplicating a wait descriptor fails.
Local host tests exercised that path with a fake GPU bridge, including a real
host-side file-descriptor exhaustion case. The modified Mesa source file was
compiled into an ARM64 relocatable object and linked into a separate non-Wayland
ICD in an isolated build. An independent static comparison matched 1,336
function bytes while excluding 180 relocation bytes; it also found the expected
Vulkan exports and conditional cleanup branch. The scratch ICD's staged library
dependencies were listed by an ARM64 dynamic linker. These checks do not validate
the excluded bytes, complete ABI, ICD initialization or iPad behavior. The
existing ICD was not replaced, and the scratch ICD was not tested on the iPad.

These checks do not establish Vulkan loader/ICD discovery, full relocation,
Wayland presentation, GPU initialization or an accelerated frame. J85 GPU
compatibility remains unverified.

### Public J85 platform-resource gap

A bounded review of the published [J85 board source](https://github.com/Pauli1Go/HoolockLinux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/arch/arm64/boot/dts/apple/s5l8960x-j85.dts)
and its checked include closure found no GPU-named node or `img,img-rogue`
compatible in that selected source. The [native PowerVR binding](https://github.com/Pauli1Go/HoolockLinux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/Documentation/devicetree/bindings/gpu/img%2Cpowervr-rogue.yaml)
requires a compatible, register resource, clocks and interrupt. These are
source-integration gaps to investigate; the search does not rule out an
unrecognized node, other configurations or bootloader changes, and it does
not identify the physical GPU or its resources.

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


A further independently reviewed public-source comparison sampled 13
Services 1.17 commands spanning synchronization, memory allocation and
mapping, compute-context creation and compute submission. Across the
[Mesa Services bridge header](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv_bridge.h)
and ChromiumOS's pinned [synchronization](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_sync_bridge.h),
[memory](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_mm_bridge.h)
and [compute](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_rgxcmp_bridge.h)
declarations, the sampled group/function numbers and corresponding ordered
outer fields aligned by role. The review covered 25 input/output structure
pairs, but did not establish that the sampled commands are sufficient for a
working system.

The declarations are not identical: one context selector is Mesa
`uint32_t` versus ChromiumOS `IMG_BOOL`, whose actual ABI width remains to
be checked. For sync-block allocation, Mesa passes a null input and zero size
while the ChromiumOS declaration has an empty-input placeholder; the
[generated handler](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/server_sync_bridge.c)
does not dereference that placeholder, but the generic dispatcher still takes
a zero-length copy path. This does not prove an ioctl succeeds. Layout and
offset checks for the larger sampled structures, pointed-to arrays, build
options, command contents, firmware compatibility and target runtime behavior
remain open. This source comparison does not identify the iPad's GPU or
establish a GPU job or accelerated frame.

The newer ChromiumOS driver's [feature table](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/km/rgx_bvnc_table_km.h)
has one observed device-feature row, labeled `4.0.2.51`. That profile is
not an established match for the iPad mini 2. This partial comparison does not
identify J85 or demonstrate compatible firmware, initialization, a GPU job,
or an accelerated frame. No GPU job was run for this comparison.

### Isolated Mesa desktop build

A separate offline ARM64 Mesa 26.2.5 build, configured for the PowerVR Services winsys, Zink, EGL, GBM, OpenGL ES and Wayland, completed all 1,354 build steps. It produced a PowerVR Vulkan ICD and desktop graphics libraries, plus an ICD manifest and a Zink driver link. Static inspection identified the seven recorded libraries as AArch64 shared objects. The build log contains three warnings: two ignored `fread` results and one ignored `asprintf` result.

The Gallium library requires `libLLVM.so.18.1`. A filename check of the saved R12 image found no matching entry at the exact `/usr/lib` path; a separate ARM64 LLVM 18 library candidate exists, but its dependencies and actual runtime compatibility remain unresolved. Some graphics libraries retain build-layout search paths, and the generated Zink link points into the build tree. They need packaging and relocation work before installation; file presence does not prove successful loading.

This is an offline build and static file inspection. The iPad's GPU identity, compatible kernel driver and firmware, and GPU initialization remain unverified. The resulting stack has not been tested with the iPad GPU, and no accelerated frame or Wayland presentation has been demonstrated.


### Scratch Wayland relink and desktop staging

A later isolated ARM64 build compiled the transfer-cleanup candidate with the Wayland configuration and linked it into a separate Wayland-enabled PowerVR Vulkan ICD. Independent static inspection found the expected Wayland WSI functions and Vulkan ICD exports. The transfer function matched the new object at 1,336 bytes outside 180 excluded relocation bytes; the excluded bytes and their targets remain unverified. Its ordered direct dependencies and dynamic-symbol metadata matched the earlier Wayland ICD. This scratch link is separate from the Zink desktop build above and has not been loaded or installed on the iPad.

The desktop build was also staged into a separate private-prefix scratch tree. Its selected graphics libraries no longer carry build-tree RPATH or RUNPATH entries, and the Zink alias is relative. A separate static provider comparison found candidate names, versions and strong symbols for the checked dependency graph; that is not actual loader resolution or proof of the redirector's dynamically selected plugin path. The existing software-rendering fallback was not replaced.

A subsequent isolated ARM64 dynamic-loader `--list` run against that newly linked Wayland ICD selected all 11 expected libraries from the staged R12-derived bundle and exited successfully. The temporary image and container were removed. This is a dependency-path listing; it does not establish full relocation, Vulkan loader/ICD negotiation or application behavior. The loader itself executed, and whether it suppressed every target initializer was not independently proven for that exact binary.

These results do not establish the iPad's GPU revision, matching kernel interface or firmware, loader negotiation, Wayland presentation, a GPU job or an accelerated frame.


### Combined offline Wayland relink

On 29 October, two previously reviewed Mesa Services error-path changes were linked together into a new scratch AArch64 Wayland Vulkan ICD. One cleans up a temporary allocation if a wait-descriptor duplication fails; the other cleans up resources when an unsupported GPU profile is rejected. Independent static inspection checked the expected function regions outside relocation words, link-map entries and selected dynamic symbols. The earlier ICDs were preserved.

This is an offline userspace build, not a new GPU device profile or a compatible J85 kernel driver. The library was not loaded on the iPad, and no GPU initialization, job, presented image or accelerated frame was demonstrated. Its build receipt has a runner-hash attribution limitation; it should not be treated as complete runtime provenance.


### Original-header ARM64 bridge comparison

A later offline AArch64 compile compared the actual saved Mesa and ChromiumOS Services headers for 35 sampled synchronization, memory and compute structures. The paired structure sizes and alignments, 102 sampled field offsets and widths, and 11 selected pointed-to element widths matched in that hybrid build environment. The checked kernel release and debug configurations had different annotation-length limits; Mesa's examined fixed 23-byte annotation fits both. The sync-allocation input declarations also remain different: one side has a placeholder while Mesa supplies an empty input.

These are sampled source-layout results, not proof of identical command semantics, complete ABI compatibility, actual ioctl behavior, firmware compatibility or a working J85 GPU. The comparison used saved public headers with a hybrid build configuration; it did not run on the iPad or submit a GPU job.


### Orchard A7 kernel and DART update

On 29 October, Orchard's hardware layer added an [apple-4k kernel configuration](https://github.com/OrchardLinux/hardware/commit/b036485d09d4e81ec91a8fc341c2a7ae95f2da28) for A7, A8 and A8X and reports a clean build. It also integrated an [S5L8960X DART stream-control lock](https://github.com/OrchardLinux/hardware/commit/24cd27b345e1ae5332a845b3b392687d3d7b0b57), crediting the earlier OrchardLinux/linux PR #1; that PR was closed without being merged. These are public source/build developments, not a J85 GPU result.

The [Omarchy A README](https://github.com/OrchardLinux/omarchy-a/blob/5a44b36986165775588ea6802e987cfb44bfec91/README.md) still lists only the iPad 6 Wi-Fi as an experimental installation target and states that GPU acceleration is unavailable. Whether a J85 GPU uses DART and whether either update helps its graphics path remain unverified.

### Combined ICD dependency and fence checks

A later isolated ARM64 dynamic-linker dependency listing used the combined Wayland ICD described above, rather than the earlier transfer-only artifact. The saved R12 loader exited successfully and listed its 11 named dependencies in the staged bundle. This checks dependency paths, not complete relocation, Vulkan/ICD initialization, GPU discovery, Wayland presentation or iPad compatibility. The run author observed removal of the temporary image and container; a separate reviewer verified the saved results but did not independently witness cleanup.

A separate static check compared the final ICD's submit-function bytes with its recorded link inputs and inspected the AArch64 call instructions. For the four examined Services fence names, the ICD constructs and passes the previously reviewed 32-byte padded buffers. A separate render wait-descriptor cleanup was later compiled as a standalone object, but is not in that ICD; see the later section below. Neither observation demonstrates an actual ioctl, GPU job or rendered frame.

### Further sampled Services source checks

An offline original-header comparison checked sampled Services command IDs, constants and eight branches of the actual Mesa allocation helper. The examined command IDs and allocation-mask results matched numerically. The selected headers also differ in optional heap-hint encoding, real-time priority and other constants; those differences have not been shown to affect the examined paths. A build-options comparison shows a conditional incompatibility when the sampled kernel enables PDUMP and the client does not. An independent review reproduced the stated comparisons. This is a hybrid source fixture, not a target configuration, CONNECT test or proof of ABI compatibility.

For the sampled sync-allocation input, the examined Linux Services wrapper normally treats a zero-length user copy as successful; its generic NULL-source documentation is broader than that implementation-specific observation. An independently reviewed host-fake test did not exercise a real target ioctl or usercopy.


### Standalone render cleanup object

A later local Clang compilation produced a separate AArch64 relocatable object from the reviewed Services render cleanup and padded-name source. It used selected saved R12-family headers, Linux UAPI headers from a saved Arch package, and generated Mesa headers from the earlier GCC/Ubuntu-configured build. The compiler rejected the original GCC TLS option, which was omitted for this standalone check; the examined translation unit had no TLS relocations. The final object was compiled with explicit stack protection. Independent static review checked its inputs and the expected guard, padded names and cleanup path.

The object is not linked into the existing GCC-built ICD, and the differing compiler, generated headers and options do not establish compatibility with it. No real descriptor submission, iPad GPU initialization, rendering or presentation has been tested.

### Verified ARM64 development inputs

Three Ubuntu Noble arm64 development packages were obtained as data after checking their exact sizes and hashes against a saved signed archive index. The archive-signing key's full fingerprint was checked against [Ubuntu's published key information](https://documentation.ubuntu.com/security/software-integrity/image-verification/). At acquisition the signed index was inside the prior 48-hour freshness window; this is a point-in-time observation. No package was installed or executed.

Selected GCC and C-runtime startup files and all ordinary members of the three SPIR-V Tools static archives identify as AArch64 relocatable ELF objects. The downloaded SPIR-V package's pkg-config version is 2025.1.1, matching the earlier Mesa configure log, and its header contains the examined inline LinkerOptions method. This does not prove that the archives are byte-identical to the earlier build image, that the full dependency closure is compatible, or that a complete Mesa link succeeds. The acquired GCC linker script also names shared runtime dependencies that remain to be checked.

Separately, a syntax check of saved generated Mesa NIR source found that two GCC-detected overflow-builtin defines are invalid for the tested Clang compiler. Mesa's configuration has compiler-feature detection for those defines, so a fresh configuration is required for a coherent Clang build. These checks do not establish a compatible J85 driver, firmware, GPU job, or rendered frame.

A subsequent standalone Clang 23 check compiled Mesa's SPIR-V member expression against selected headers from the verified Ubuntu arm64 packages; a deliberately nonexistent member failed as expected. Independent inspection matched the staged headers to their package members and checked the generated ARM64 object and dependencies. This is a compile-only expression check, not a full Meson configuration, GCC ABI comparison, ICD link, or GPU test.


### AArch64 SPIR-V link prerequisite

A later workspace-only experiment used selected files from authenticated Ubuntu arm64 development and runtime packages to compile a small caller and link an AArch64 shared library against a SPIR-V Tools archive. A control without the C++ runtime failed with the expected missing-symbol errors; the corresponding link with the runtime succeeded. An independent postflight checked the saved commands, staged inputs, link traces and map, ELF metadata and dynamic dependency names. The output has SHA-256 `bd914a0fafe091a9ffa8a5e11cbc7170c19d96619f43f31981061f2f0ebc2bb8`.

This is a small static link check, not a full fresh Mesa build, a Vulkan ICD, dynamic-loader execution or proof of compatibility with the iPad. It does not establish GPU initialization, a GPU job or an accelerated frame.


### Conditional display-buffer synchronization investigation

A public-source trace examined a possible split-display path in which a display-owned DMA-BUF is imported into Mesa's Services winsys and later re-exported to Zink. In the examined [Mesa import/export path](https://github.com/chaotic-cx/mesa-mirror/blob/ddaf85e353442d9d7f192fdcf1823e652e3/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv_bo.c) and a separate [ChromiumOS Services 1.17 export implementation](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/physmem_dmabuf.c), the re-export can be a new DMA-BUF wrapper. Under the examined [Hoolock DMA-BUF implementation](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/dma-buf/dma-buf.c), that wrapper can receive a different reservation object from the original display buffer. A fence attached only to the wrapper would not, by itself, reach the original reservation.

A separate candidate preserves a duplicate of the original descriptor for DMA-BUF import followed by same-type re-export. Independent source review checked the selected ownership and cleanup paths, and host fakes exercised descriptor handling. The complete changed Mesa source file also compiled into an unlinked AArch64 object, using Clang and a mixed set of saved headers and configuration. The successful compile used libdrm 2.4.134 headers with an older configuration reporting 2.4.125; it emitted two unsupported GCC-warning-option notices.

These are conditional findings across sources from different projects, not a demonstrated compatible target build or observed iPad failure. The candidate does not cover newly allocated WSI buffers or cross-type exports and does not itself solve inter-context ordering or cache visibility. It has not been linked into an ICD, installed or tested on the iPad. J85 GPU identity, driver binding, firmware, initialization and acceleration remain unverified.


### Native shader-build prerequisites

A fresh ARM64 Linux Mesa cross-configuration now finds zlib 1.3 and libdrm 2.4.125 in an isolated sysroot and passes the saved pthread affinity link probe. It still stops at the required target LLVM configuration; macOS LLVM libraries cannot simply substitute for Linux ARM64 libraries. No target executable was run.

Separately, a macOS ARM64 build of the Mesa 26.2.5 `vtn_bindgen2` helper succeeded. For one saved SPIR-V input, the helper generated C++ and header files byte-identical to previously saved outputs. A separate native build of saved SPIRV-Tools source produced its core, optimizer and linker archives; a host test assembled, linked, optimized and validated a small SPIR-V module. Independent reviews checked the saved results. The SPIRV-Tools source archives were checked for local consistency, not independently authenticated upstream in that build, and the build did not have an independently verified network sandbox.

These were macOS host build tools, not an iPad graphics driver. At that stage, the separate `mesa_clc` generator, a compatible LLVM-to-SPIR-V translator and a complete fresh Mesa configuration were unresolved. J85 GPU initialization, a GPU job and an accelerated frame remain unverified.


### Fresh ARM64 Mesa build with native generators

A subsequent workspace-only build produced a macOS-native LLVM-to-SPIR-V translator and Mesa `mesa_clc` and `pco_clc` helpers. A small OpenCL shader compiled by `mesa_clc` produced SPIR-V that a separately built host validator accepted; malformed and corrupt controls failed as expected. The `pco_clc` test used its generic COMMON target, not an identified iPad GPU revision.

Using those helpers, a verified private Bison and an Ubuntu ARM64 sysroot, a fresh Mesa 26.2.5 configuration for the PowerVR Services Vulkan driver and Zink completed all 1,205 build steps. Independent static inspection identified five AArch64 shared objects, including the PowerVR Vulkan ICD, Gallium, EGL, GBM and the GBM backend. Earlier failed builds and their dependency corrections were preserved. The ICD's recorded symbol requirements include GLIBC_2.38; target dependency closure has not been tested.

This is an intermediate build with Wayland, GLES and llvmpipe disabled. EGL and the GBM backend retain build-tree-relative search paths. The outputs have not been packaged, installed or dynamically loaded on the iPad. They do not establish a compatible J85 kernel driver or firmware, GPU initialization, hardware acceleration, a rendered frame, or an Omarchy desktop.


### Render and transfer bridge layout comparison

A later offline AArch64 compile compared all 35 mapped fields in four render-context and transfer-submission input/output structure pairs, using the saved public [Mesa Services header](https://github.com/chaotic-cx/mesa-mirror/blob/5f31557bb1a51004a8bbac397af99fd6a2cbb59a/src/imagination/vulkan/winsys/pvrsrvkm/pvr_srv_bridge.h) and ChromiumOS Services 1.17 [render](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_rgxta3d_bridge.h) and [transfer](https://chromium.googlesource.com/chromiumos/third_party/kernel/+/f66be639e83bf9b6fe6e57d5fc84029958022f3c/drivers/gpu/drm/img-rogue/1.17/common_rgxtq_bridge.h) headers. The checked structure sizes, alignment and named field metrics matched under the recorded hybrid compile configuration. An independent review checked the semantic field mapping and reproduced the compiled results. A same-width pointer-field swap and a packing change were detected by negative controls.

This is a comparison with a public Services example, not the iPad's verified kernel interface. It does not establish the values or semantics behind pointers, flags, handle lifetimes, compatible firmware, the J85 GPU revision, successful submissions, or an accelerated frame. No iPad or GPU job was used for this comparison.


### Four-fix headless ARM64 build

A fresh Mesa 26.2.5 ARM64 cross-build combined four previously reviewed Services source candidates: 32-byte fence-name buffers in compute, render and transfer; render and transfer error-path cleanup; and cleanup after an unsupported profile is returned. The source tree differed from the successful baseline in exactly four files. The build completed all 1,205 actions, and independent static inspection identified five AArch64 shared libraries. The new PowerVR Vulkan ICD has SHA-256 `763cf10d0aac81d5904402b04a0d70b5c727b01e2b9332357e41f0cf491dd60b`; the other four inspected library hashes match the unmodified baseline.

The four changed sources produced distinct ARM64 objects. The saved build graph, archive membership and final symbols support their inclusion in the ICD, although no link map was recorded to prove every instruction's provenance. The changes are compile/link candidates, not proof that the cleanup paths work against a real kernel. The build was expected to remain offline, but did not have an independently enforced network sandbox.

This configuration remains headless, with Wayland and GLES disabled, and still needs packaging. It was not installed or executed on the iPad. The J85 GPU revision, compatible kernel interface and firmware, actual GPU submission, display presentation and an accelerated frame remain unverified.


### Four-fix scratch staging

A later workspace-only staging run copied the new ICD, Gallium, EGL, GBM, GBM backend and ICD manifest into a separate private tree. Independent static inspection confirmed the six file contents, two contained relative library links and the unchanged source files. The two graphics libraries' build-tree `DT_RPATH` entries were removed from their copies; the output bytes matched the expected dynamic-section rewrites. The other four files remained byte-identical to their inputs. All five staged libraries are AArch64 shared objects with no RPATH or RUNPATH.

A later check found newer change-time metadata on all six copies, while their content hashes and other checked identity fields still matched the saved result. The cause was not established. The manifest still names an absolute `/usr/local/lib` path, so this scratch tree is not a self-contained loader test or a deployable package. No library was loaded and no iPad or GPU test was performed.


### Static relative-manifest specimen

A separate two-file scratch specimen copies the PowerVR ICD and changes only its manifest's `library_path` to `../../../lib/libvulkan_powervr_mesa.so`. Independent static checks confirmed that the relative path resolves to the copied library inside that specimen root, with no symlinks or unexpected files. The copied ICD matches its source hash. The two output change-times later advanced, although their content hashes and other checked identity fields remained the same; the cause was not established.

The [Vulkan Loader 1.3.275 documentation](https://github.com/KhronosGroup/Vulkan-Loader/blob/v1.3.275/docs/LoaderDriverInterface.md#driver-manifest-file-format) describes slash-containing relative library paths as relative to the manifest. The exact saved loader binary has not been shown to derive from that pinned source. No loader or ICD was executed, and this two-file specimen is not a complete runtime package or evidence of J85 GPU compatibility.


### Desktop dispatch packaging and synchronization review

The earlier Wayland/GLES/GLVND Mesa build's off-device dependency selection omitted the GLVND GLES frontend, although the saved R12 image contains it. A new separate static artifact contains the three package-matched R12 EGL, GLES and GLdispatch libraries, their relative SONAME links and the corresponding license. Independent static inspection checked their ARM64 ELF metadata and found name/version candidates for the GLES library's 14 direct strong imports. This does not establish actual dispatch, vendor selection, library relocation, a desktop session, or GPU acceleration.

The older desktop's Gallium library needs LLVM 18; the saved R12 image has a different LLVM 23 SONAME. A saved LLVM 18 candidate and selected dependencies have static name/version candidates under a specific proposed R12 library selection. Eight projected Ubuntu libraries total about 148 MiB; actual binding, dynamic loads, memory use and the GBM provider choice remain untested.

Separately, a public-source review of [Zink's batch synchronization](https://github.com/chaotic-cx/mesa-mirror/blob/ddaf85e353442d9d7f192fdcf1823e652e3f2ee3/src/gallium/drivers/zink/zink_batch.c) and [semaphore handling](https://github.com/chaotic-cx/mesa-mirror/blob/ddaf85e353442d9d7f192fdcf1823e652e3f2ee3/src/gallium/drivers/zink/zink_screen.c) identified conditional failure paths that can omit a required wait or leave producer and consumer semaphore counts inconsistent. Host fakes reproduced the logical cases without a real out-of-bounds access. No actual GPU failure was observed and no complete fail-closed fix is established; ownership, publication and ordering remain open. These findings do not establish a J85 driver or an accelerated frame.


### Conditional sync-file cleanup and fresh ICD

A separate source candidate changes one [Mesa common Vulkan semaphore path](https://github.com/chaotic-cx/mesa-mirror/blob/ddaf85e353442d9d7f192fdcf1823e652e3f2ee3/src/vulkan/runtime/vk_semaphore.c): if exporting a sync-file succeeds but resetting the permanent payload fails, it attempts to close a nonnegative descriptor before returning the error. A `-1` sync-file value is a valid already-signaled sentinel; Vulkan's [reference page](https://docs.vulkan.org/refpages/latest/refpages/source/VkImportSemaphoreFdInfoKHR.html) describes it, and [VkResult](https://docs.vulkan.org/refpages/latest/refpages/source/VkResult.html) says output contents are generally undefined on runtime error. The candidate's `-1` output on this particular error path is an implementation choice, not a general API guarantee. A failed close is not guaranteed to release the descriptor.

Host tests included real pipe descriptors, a descriptor-zero case, the `-1` sentinel, and injected success and failure controls. An independent review reproduced the bounded checks. The inspected Services reset returns success, so these tests do not establish a Services or iPad leak, and the change does not resolve Zink's broader wait, semaphore-count or external-publication problems.

A fresh headless ARM64 Mesa build then combined this candidate with the four earlier changes and completed all 1,205 actions. Independent static checks found all five changed functions in the resulting PowerVR ICD and matched non-relocated instruction words; the new error branch calls the linked close entry and stores `-1`. The ICD has SHA-256 `59c8869cde5d3bb534d30f66bbd44e6fa92b647255235b99525062e0e441ac7d`. Relocation behavior, runtime reachability, compatible J85 hardware/firmware, and an accelerated frame remain unverified. This build did not enable Wayland or GLES and was not installed or run on the iPad.


### Public Rogue references and versioned profile data

[Imagination's open-source driver page](https://developer.imaginationtech.com/solutions/open-source-gpu-driver/) links two public 2022 Rogue register-reference documents. Two different PDF text extractors found no exact J85, G6430, BVNC, or `1.72.4.12` identifier in the extracted text. This is a bounded text search and may miss images, formatting or alternative names; it does not prove a value is absent. The documents describe generic Rogue registers, not an established J85 clock, reset or firmware contract. Their title pages describe the documents as public but containing proprietary information and allow document redistribution with source acknowledgment; that is not a general firmware or software license.

Separately, two public MediaTek DDK variants give different errata masks for the hypothetical `1.72.4.12` profile: the [5389149 table](https://github.com/MediaTek-Labs/common-kernel-4.19/blob/e440f21fa5dca203a027f31c2ed30af50e6b05c7/drivers/gpu/mediatek/gpu_rgx/m1.11ED5389149/hwdefs/km/rgx_bvnc_table_km.h) has a nonzero row while the [5425693 table](https://github.com/MediaTek-Labs/common-kernel-4.19/blob/e440f21fa5dca203a027f31c2ed30af50e6b05c7/drivers/gpu/mediatek/gpu_rgx/m1.11ED5425693/hwdefs/km/rgx_bvnc_table_km.h) has a zero row. The difference is specific to those source versions; it does not establish J85's GPU identity, applicable workarounds, matching firmware or missing Mesa feature values. No GPU test or rendered frame follows from these source checks.


### Conditional PowerVR reset recovery deadlock

In the pinned Hoolock source, [the MMU flush path](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_mmu.c#L124-L189) holds a DRM device critical section while reset or retry failure can call [device-loss handling](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_power.c#L33-L45). That handler synchronously unplugs the DRM device and waits for outstanding sections, which conditionally includes the caller itself. Some submission paths hold an additional outer section; simply leaving the inner one is not a complete repair.

A tester separately [reported the corresponding hang](https://lists.infradead.org/pipermail/linux-arm-kernel/2026-July/1155621.html) on an experimental MT8173/GX6250 stack. A [subsequent system-sleep proposal](https://lists.openwall.net/linux-kernel/2026/09/10/382) says it addresses one trigger and leaves the reset deadlock separate. An independent source review checked the pinned call paths and nested lifetime concern. No complete fix was applied or validated here. This is not evidence that J85 runs this driver, experienced the hang, or has working GPU acceleration.


A follow-up public-source review checked why merely deferring the unplug is not yet a complete fix. The pinned [reset error path](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_power.c#L594-L605) can restart stopped queues after marking the device lost, and the [MMU-operation cleanup](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_mmu.c#L2285-L2310) ignores a flush return before releasing page-table backing. An independent review confirmed these source-order observations. They identify a need to account for admission, worker lifetime and DMA quiescence; they do not prove actual post-loss DMA or a failure on the iPad. No patch or device test was performed.


### Exploratory submission guard after device loss

A separate, uninstalled source candidate checks the existing device-loss flag
after entering the [PowerVR submission ioctl](https://github.com/HoolockLinux/linux/blob/6831bc701a6ce059e71e5aaa9488c9195bea6927/drivers/gpu/drm/imagination/pvr_drv.c#L1146-L1165).
If that read observes loss, it returns an error before starting a new job.
Single-threaded host tests of the extracted source functions exercised that
branch; a control showed that loss occurring after the check can still allow
the submission. The candidate is not a synchronized admission barrier and
does not fix the reset/unplug deadlock, stop queued jobs, or establish DMA
quiescence.

The baseline and candidate versions of two complete PowerVR source files were
also compiled offline into AArch64 relocatable objects. This was a manually
assembled Clang compile against a GCC-generated configuration in which
PowerVR was disabled, with warnings in both versions. It was not a
PowerVR-enabled Kbuild, linked kernel module, device test, or proof of target
ABI compatibility. No J85 driver binding, GPU initialization, GPU job, or
accelerated frame was established.


### Exploratory initial clock-rate guard

A separate, uninstalled PowerVR source candidate samples the core clock after
successful runtime-PM acquisition and rejects a zero rate or one too large
for the firmware's 32-bit field before mapping GPU registers. Local fake-PM
and clock controls exercised the actual extracted initialization function;
the full baseline and modified source files also compiled to AArch64 objects
with a manually assembled Clang command and a PowerVR-disabled configuration.
No PVR-enabled kernel build or device test followed.

The check covers only that initial sample: later firmware initializers still
read the clock separately, and reset handling is unchanged. A provider that
temporarily cannot report a valid rate could newly fail initialization. The
existing cleanup attempts a synchronous runtime-PM put but ignores a failure
from it, so physical power-off is not established. This candidate does not
identify the iPad's GPU or clock, supply firmware, or establish an accelerated
frame.


### Follow-up: PowerVR-enabled scratch compilation

A later local Clang 23 build compiled baseline and experimental PowerVR source
files as AArch64 relocatable objects with `CONFIG_DRM_POWERVR=m`, using
generated headers from the [public Hoolock kernel](https://github.com/HoolockLinux/linux/tree/6831bc701a6ce059e71e5aaa9488c9195bea6927).
This was a direct translation-unit compile, not full Kbuild or a linked module.
The saved builds produced warnings, including four untriaged default-const
warnings in each `pvr_drv.c` variant.

A first generic scratch configuration selected 52-bit virtual and physical
addresses and pointer authentication. A later scratch configuration started
from the saved runtime9 configuration, retained its 48-bit address settings
and disabled pointer authentication, and was used for a separate direct
compile. In the selected object comparison, the user-address limit changed
from `1<<52` to `1<<48` and the generated per-task canary offset changed
from 1344 to 1280. These are object/configuration observations, not evidence
of the running iPad's offsets or ABI.

The public Kconfig did not know four runtime9-specific PMGR worker options,
and 45 serialized entries differed from the saved seed after configuration.
The exact target configuration, source and toolchain needed for a compatible
module are not established. These compiles did not link or load a PowerVR
module or demonstrate GPU initialization, a job or an accelerated frame.
