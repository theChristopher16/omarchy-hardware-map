# J85 native selector boundary and public GPU leads — 5 November 2026 UTC

## Native J85 evidence

A one-shot, read-only capture on the iPad mini 2 Wi-Fi (J85/A7) reproduced
the same Apple device-tree GPU metadata table already preserved for this
board. Independent review recomputed every exported hash and replayed the
capture transcript. The kernel log before and after the capture was
byte-identical, the action-event list was empty, and the capture returned
success.

The table is 128 bytes. Its declared metadata reports seven performance
states and three GPU performance states. Parsing it conservatively yields
seven opaque pairs followed by a 72-byte zero tail. Three pairs in the first
nonzero set and three in the second set share their second fields, while the
first fields in the second set are exactly half the corresponding first-set
values. The capture alone does not establish their units or consumer.

Public source resolves the table schema without resolving the write path.
[m1n1 parses each legacy entry as frequency then voltage](https://github.com/AsahiLinux/m1n1/blob/70757dc74c2dac485188acaa2fa7e73be5b108ee/proxyclient/m1n1/adt.py#L149-L152),
and Orchard's current
[A7-A11 OPP conversion](https://github.com/OrchardLinux/orchard/blob/a6ffc904bf8acb7af2fd0fc94f84ca194bd82ed2/boot/m1n1/patches/orchard/0011-kboot-Fill-the-A7-A11-GPU-s-performance-states-from-.patch#L1-L82)
defines them as Hz and mV, keeps state zero as off and preserves the original
array index as `opp-level`. The live device's voltage entries differ from the
public [J85 ADT sample](https://github.com/SoMainline/adt_collection/blob/768d800c46140c9ba39a372d097fa49f7197a66d/a7/j85.adt#L2780-L2833).
That is evidence to retain the device-filled table, not substitute another
J85's values. It still does **not** establish clock ownership, an active row,
a physical rate or safe writes.

The same RAM boot also exposed a disabled live device-tree node compatible
with `apple,s5l8960x-gpu`, two register resources and a reference to the
existing `gfx` generic power domain. Linux reported that domain off, with no
attached device, no bound GPU driver and no visible GPU clock consumer.
SimpleDRM continued to use only the loader-provided framebuffer.

No GPU register was mapped or read. No clock, power-domain, reset, firmware,
job, storage or persistent-state action was performed. These observations
establish a metadata and ownership boundary, not GPU acceleration.

A subsequent, independently reviewed one-register diagnostic read the J85
`ps_gfx` provider's PMGR record at offset `0x20218` exactly once. It returned
`0x00000300`: target and actual state were both zero, reset and device-disable
were clear, and the clock- and power-gated history bits were set. The exact
scope and kernel log were byte-identical before and after; no hardware write
or GPU/wrapper register access occurred. This closes the passive OFF-baseline
substep only. It does not prove a retained owner epoch or authorize a power
transition.

## Public work reviewed

Orchard now carries an
[identity-only J85 catalog entry](https://github.com/OrchardLinux/orchard/blob/a6ffc904bf8acb7af2fd0fc94f84ca194bd82ed2/devices/j85/device.toml)
and a hash-pinned
[iOS 12.5.8 boot-input record](https://github.com/OrchardLinux/orchard/blob/a6ffc904bf8acb7af2fd0fc94f84ca194bd82ed2/devices/j85/boot.json).
This is useful upstream structure for a later contribution, but it is
deliberately not a J85 build profile: the entry says there is no Orchard
bring-up, its methods table is empty, and the generated compatibility matrix
lists A7 as zero boards in build. The matrix's J85 driver bindings for
backlight, buttons and USB describe enabled device-tree nodes, not verified
features. Our native touch, Wi-Fi and PMGR observations therefore must not be
silently promoted into Orchard's feature table without a reproducible Orchard
image and board qualification.

[Project Cascadia's Apple A5 GPU notebook](https://github.com/rzxvx/Project-Cascadia/blob/091d441f19e101699f7e1835a80ccb48d6e54eec/devices/a5/docs/research/p105-gpu.md)
documents a device-tested SGX543MP2 bring-up. Its most transferable lesson is
methodological: recover the exact iOS sequence, keep Apple firmware outside
the repository and hash-gate local extraction, bring up the smallest kernel
render path before Mesa, and record every failed hardware assumption. It also
records that several apparent clock failures were actually reads from a
write-only broadcast bank or a core bank before it was ready. That supports
our refusal to use exploratory GPU-bank reads on J85.

The corresponding
[A5 GPU implementation](https://github.com/rzxvx/Project-Cascadia/tree/091d441f19e101699f7e1835a80ccb48d6e54eec/devices/a5/patches/files/drivers/gpu/drm/apple-sgx)
uses a board-specific SGX543 driver, locally extracted iOS 8.4.1 microkernel,
SGX MMU and command format. J85 has a different A7-era Rogue GPU and a
different platform integration. A5 addresses, reset values, firmware, command
buffers and shader programs are not J85 inputs.

[Orchard PR #74](https://github.com/OrchardLinux/orchard/pull/74) is an open
draft for A9/S8003 G5P rendering on J71t. It reinforces a useful ownership
shape: the platform power domain owns power while a distinct GPU wrapper owns
device-local wake and transport; firmware is extracted locally and pinned.
The PR's own report says the exported Orchard image has not yet been booted.
Its A9 constants, 16 KiB-page assumptions, firmware and wrapper details do
not establish J85 support.

[Project Cascadia PR #32](https://github.com/rzxvx/Project-Cascadia/pull/32)
adds fail-closed charger error handling and was merged on 4 November. It is an
A5 software result with no hardware requalification, not a J85 charging fix.
The current J72 and J86 repositories have no newer public commit establishing
A7 GPU acceleration. Hoolock's public kernel head is also unchanged.

The clean-room
[Apple GPU firmware ABI notes](https://github.com/mischa85/apple-gpu-firmware-abi/tree/fab13c5d71ee6aa6e7c5ad01142c098b50cef8e6)
describe the much newer T8140 firmware interface. Their confidence-tagged
documentation style is useful, but their transport, structures and recovery
path are not evidence for A7 or J85.

## Next guarded J85 rung

The next admissible native experiment is intentionally smaller than a GPU
probe:

1. **Completed:** on an exact, provenance-checked RAM boot, the typed
   `ps_gfx` PMGR baseline matched the public J85 OFF-state fields.
2. **Next:** in a separately reviewed image, attach only the disabled GPU
   platform node to the existing `gfx` generic power domain and perform one
   acquire/release cycle with rollback evidence.
3. Keep both anonymous 1 MiB GPU resources untouched until an exact J85 source
   identifies a safe wrapper-status register. Public A9 and A10 reports do not
   establish that either J85 resource or offset has those semantics.

Any later OPP provider must keep the live table's original selector indices;
sorting by frequency would mix the full- and half-rate banks and lose the
hardware token.

That rung must not select a performance row, read a GPU core/broadcast bank,
assert a device reset, issue START, load firmware or submit a job. A later rung
can be admitted only after the owner and rollback evidence are stable.

This checkpoint advances the J85 power-ownership plan. It does not establish
a PowerVR render node, firmware handshake, completed GPU job, triangle or
accelerated Omarchy desktop.
