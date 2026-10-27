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
auxiliary changes. A further source emulation showed that the selected
initializer clears both arrays before property lookup; a simulated provider
side effect can still change them. Actual provider behavior and configuration
remain unverified. Another offline source branch uses built-in fallback
records when a configuration bit is set; the actual setting and whether
that path applies to the iPad remain unverified. In the selected original
initialization path, a provider property named `model-slow` controls the
fallback bit. A separate same-boot read did not find that property in the
GPU device-metadata node. The original iOS provider could supply properties
independently, so this does not establish the actual flag or clock state.
A separate source trace found that the selected provider can copy an incoming
registry entry's properties. The pinned original firmware tree also lacks the
property, but boot-time augmentation and later changes remain possible.

Separately, a staging helper was corrected to reject a copy outside its
caller-declared extent even when the allocation is larger. The updated helper
passed 59 synthetic host tests and a refusal-only ARM64 kernel build; it has
not been loaded on the iPad and does not prove GPU DMA or firmware operation.
An isolated staging transaction additionally rejects partial images and
currently refuses all publication; it passed synthetic concurrency and fault
checks and a separate refusal-only build. Its changed context layout requires
consumers to rebuild, and it is not a functioning firmware handoff. An
offline preflight now joins a restricted set of ordered firmware commands
with the separate START-derived configuration patch; the saved firmware's
structure passes with synthetic planner inputs. A later host-only test compared ordered overlapping CONFIG, LOAD and ZERO
writes in a synthetic shared buffer with selected original-source traces. It
does not establish native mapping, DMA visibility, firmware ABI or publication.
The saved J85 firmware image is not a multiple of 4 KiB, so the pinned Linux
PowerVR validator rejects it at its first size check without reaching later
format fields. The original firmware checksum and complete validation path
remain unknown; padding or bypassing this check is not justified.
A separate resource-ownership observer passed synthetic lifecycle tests and an
offline kernel build with readiness explicitly unsupported. Its complete
module contains experimental controller code and was not loaded; continuous
ownership through a real GPU identity operation remains unfinished. A separate unlinked
ownership-lifetime component passed synthetic concurrency checks and built as
a module that deliberately refuses to load. No live owner, physical readiness
or safe GPU shutdown is established by that build. The
staged test kernel's GPU node has no explicit clock or reset properties; a
fresh read-only inventory found the same absence on the current Linux GPU
node. This describes the device tree, not physical clock or reset state.
The local reset API can report zero for a missing optional reset handle;
that is not evidence of a deasserted physical reset or a working clock.
An offline source audit found performance counters but no established mapping
from the observed records to GFX; no counter has been tested on the iPad.
A further source trace found GFX-dependent configuration calculations in a
SoC-tuner. The selected controller wrapper ignores that calculated value and
requests a fixed mode; the source trace does not establish a physical change. A bounded read-only search
of the running Linux device tree found no matching tuner or memory-controller
compatible strings under the inspected SoC subtree; this does not establish
physical absence or GPU readiness. No corresponding hardware access occurred.
A separate offline identity-selection trace found that multiple synthetic
revision inputs collapse to the same derived diagnostic profile. The profile
alone cannot distinguish those revisions; no physical GPU identity was read.
A further unlinked observer candidate passed synthetic ownership, cancellation
and private-close tests. Private close is not evidence of physical GPU power
state, and provider lifetimes and real kernel linking remain unresolved. A
separate private CPU firmware-staging candidate passed host sanitizer and
fault tests using test-header shims; it does not publish to the device and
has not been built against the target kernel. These candidates do not prove
GPU address translation, firmware acceptance or an accelerated frame. A CPU-only root preflight
also rejects malformed synthetic address and ownership inputs, but accepts
only caller claims; it cannot establish actual mappings, retained ownership,
firmware compatibility or authority to publish.
An isolated host integration now carries separate synthetic page-table-entry
and catalogue addresses through the existing buffer-group and root-I/O bodies.
A separate candidate copies a private CPU image into a DMA-owner staging buffer
under host shims, and retains it if isolation fails. Both passed local fault
and concurrency tests, but neither has a verified native translation or
isolation provider, a target-kernel link, firmware handshake or GPU frame.
The framebuffer remains CPU-rendered: no GPU core identity, firmware
handshake, submitted job, accelerated frame, or matching DRM/Mesa path has
been demonstrated. A source review of the available Linux and Mesa snapshots
also found separate device-identity and userspace-interface requirements; a
first GPU job alone would not establish a working compositor. The J85 GPU's
actual identity and driver compatibility remain unmeasured.

A separate C preflight for a restricted firmware-command shape passed 366
synthetic differential cases and additional buffer-alias and corrupted-plan
checks. It compiled to ARM64 objects, but it is not linked to a kernel or a
native firmware loader. Address translation, synchronization, publication and
hardware behavior remain open.

An offline Mesa PowerVR no-op shim test verified two supported synthetic device
identities. For an unsupported hypothetical identity, the shim warned and fell
back to a default; an independent harness rejected the mismatch. The full
PowerVR Vulkan ICD and shim have since built offline from an unchanged local
Mesa 26.2.5 snapshot, using dependencies checked against signed Ubuntu indexes
and the lab's existing archive keyring. The Mesa source archive's upstream
signature was not independently verified. With a synthetic BXS profile, the shim
returned the expected identity, Mesa compiled a compute shader, and Vulkan
created a compute pipeline. A separate synthetic Series 6XT GX6250 profile
also compiled a shader and created a pipeline, but required Mesa's explicit
experimental opt-in and emitted warnings about missing hardware workarounds.
No job was submitted and no GPU executed either pipeline. Neither synthetic
identity is a measured J85 identity; actual J85 compatibility remains unknown.
A separate [public Fugu reference table](https://github.com/LineageOS/android_kernel_asus_fugu/blob/13030953e0359cce6a830b8e1a35954fe4399b73/drivers/staging/imgtec/rogue/hwdefs/km/rgx_bvnc_table_km.h#L99-L107)
describes an older G6430 reference with different feature and errata values;
it does not identify the J85 or establish compatible firmware.

A later source-pinned host harness checked how Mesa handles unsupported simulated GPU identities. With assertions enabled, the selected Mesa function aborted; with assertions disabled, the shim path fell back to a different GPU identity. An exact-identity check rejected both outcomes across 14 synthetic cases. This harness used stubs rather than the full driver, and neither result identifies the iPad GPU or proves rendering support. The [Mesa support table](https://docs.mesa3d.org/drivers/powervr.html) lists GX6250 as partial support, which does not establish support for J85.

A later read of the running kernel's device-tree metadata found the disabled GPU node has no clock or clock-name properties, and its ancestors have no clock-ranges property. The local PowerVR driver requires a core clock and passes its rate to firmware. This narrows the current binding gap; it does not exclude a separately registered clkdev mapping or measure the physical clock. No GPU register, power or clock change was made.

A public-source review did not find a supported open-source firmware build for a verified J85 GPU identity. [TI's open-stack documentation](https://software-dl.ti.com/processor-sdk-linux/esd/AM62X/10_01_10_04/exports/docs/linux/Foundational_Components/Graphics/Rogue/Build_Guide.html#open-source-firmware) describes the firmware in that release as a closed-source binary. Linux checks device identity and firmware metadata; a different device's GPU name or firmware is not evidence of a J85 match. This review does not rule out every possible firmware source.

No recovered Apple firmware, instruction bytes, device tree, calibration,
private logs, credentials, or personal device identifiers are included here.
