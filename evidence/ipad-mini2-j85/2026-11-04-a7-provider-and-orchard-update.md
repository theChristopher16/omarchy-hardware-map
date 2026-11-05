# J85 A7 provider and Orchard update — 4 November 2026 UTC

## J85 work completed offline

A new fail-closed A7 phase-provider adapter separates four hardware-evidence
boundaries around the existing experimental GPU start path: control-path
liveness, exact pre-start safety, post-start liveness and a later optional
core-rate observation. Missing hooks, stale generations, callback mutation,
re-entry and physical-hook errors invalidate the owner instead of falling back
to a fixed clock or a cached success. The adapter does not implement the
physical J85 clock, reset or performance-profile callbacks.

The reviewed adapter sources passed 130 ASan/UBSan/Werror host cases. Their
SHA-256 hashes are:

- `j85-a7-phase-provider.c`:
  `0c74183b876f06ffbf5a6d20f52d4a0b3f3d968cca3b0ffc9121a7b9842b02b0`
- `j85-a7-phase-provider.h`:
  `8ef549b72728e970aed3454f774d67620f652d5b8fbfa9ba090e73f158a04ead`

The exact sources were also linked with warnings treated as errors into an
ARM64 refusal-only test module. The resulting module has SHA-256
`da0d3d646541386fe617e9fcec034bc29092e7a5d162e95d95b8b9cc5fb89702`
and vermagic
`7.3.0-rc1-ipad-mini2-touch4-gpu-runtime9 SMP preempt mod_unload aarch64`.
That build targets a prospective four-pin lab kernel and symbol table, not the
exact image currently running on the iPad. Matching vermagic is not sufficient
to make it load-safe. The module remains unloaded and uninstalled, and its
initializer intentionally refuses to enter the provider.

## Connected J85 observation

A passive read-only USB check of the connected iPad reported Linux
`7.3.0-rc1-ipad-mini2-touch4-gpu-runtime9`, an empty module list and a DRM
`card0`. The card is bound to `simple-framebuffer`/`simpledrm` at the
loader-provided `/chosen/framebuffer@83d000000`; the only connector was the
simple framebuffer connector. This confirms that a `/dev/dri/card0` pathname
by itself is not GPU acceleration. No PowerVR render node, firmware handshake,
submitted GPU job or accelerated frame was observed.

No module was loaded and no MMIO, clock, reset, firmware, storage, reboot or
DFU action was performed during this check.

## Public-source changes reviewed

Orchard's A10/J71b GPU README at
[GPU commit `42f6add`](https://github.com/OrchardLinux/gpu/blob/42f6add03616c9ccb6852dad688fc11d15c3a649/a10/README.md)
reports Hyprland with effects and live blur at 60 fps through Zink and its G9P
Vulkan backend. This is a contributor-reported A10 result, not an independently
reproduced J85/A7 result. A10 RTKit, firmware, registers, page size and power
controller details must not be copied to J85 without board-specific evidence.

Orchard now records GPU qualification per chip, using the highest dEQP GLES
suite that completes through Zink without a GPU hang and with only listed
failures. At
[commit `153290c`](https://github.com/OrchardLinux/orchard/commit/153290c46da216a0fa6d0789bfbea022950d5cae),
no chip had reached that catalog milestone. The A10 desktop report is useful
bring-up evidence, but it does not yet satisfy Orchard's new conformance gate.

Orchard's generated catalog at
[commit `993751e`](https://github.com/OrchardLinux/orchard/tree/993751ea5a2421c23903276f2bb64771107830f8)
distinguishes a driver that could bind from a feature that works. Its J85 entry
is still identity-only: the public device tree exists but is not enabled in an
Orchard build, and the J85 boot recipe has no implemented method. The generated
driver table lists possible J85 bindings only for backlight, buttons, USB
network and USB serial; it does not identify a J85 GPU driver. Orchard's
[J85 bring-up report](https://github.com/OrchardLinux/orchard/blob/993751ea5a2421c23903276f2bb64771107830f8/docs/bring-up/j85.md)
now credits Christopher M. Smith for the measured RAM-boot status while keeping
the same no-GPU/no-install boundary.

The related A7/J72 project reported its first native touch and desktop
qualification in
[commit `741c995`](https://github.com/thisiscamk/ipad-air-j72-linux/commit/741c9953a998e28ce9c2c22ed227e864a2ec9daf).
That is useful evidence for A7 touch/runtime packaging, not proof of J85 GPU or
internal-storage support. The J86 iPad mini 2 project most recently published
bounded audio and PipeWire work, including
[commit `bf6637c`](https://github.com/perryraskin/ipad-mini2-omarchy/commit/bf6637c8e8a68d5ba9c7382afcf0ab041502e229);
its cellular-board firmware, calibration and settings are not J85 inputs.

## Remaining J85 GPU gates

1. Implement source-supported physical `control_live`, `start_safe` and
   `post_start_live` callbacks for A7/J85.
2. Add STOP, retirement and lifecycle invalidation that preserve uncertainty
   when hardware-off cannot be proven.
3. Compose those callbacks with the exact controller/backend scope and build a
   matching four-pin J85 RAM kernel.
4. Requalify the connected device on that exact image before any module load or
   register-writing test.
5. Demonstrate firmware startup, a completed GPU job, a render node and an
   observed accelerated frame. Then run bounded conformance tests; a desktop
   screenshot alone is not the finish line.

This checkpoint advances the software contract and records a current live
baseline. It does not establish J85 GPU acceleration or a native installation.
