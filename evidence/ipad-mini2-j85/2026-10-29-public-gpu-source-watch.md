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
