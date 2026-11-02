# J72 read-only storage code compared with J85 runtime9 build inputs

**2 November 2026.** These are offline source and object-build results. No
storage controller was initialized, no iPad storage was accessed and no
installation was attempted.

The [J72 iPad Air project](https://github.com/thisiscamk/ipad-air-j72-linux/blob/29c571c847878568c256b7504c22ac94e8a67616/code/storage/linux-asp-observer35/README.md)
reports a read-only internal-storage observer on that A7 device: the author
describes matching repeated reads and verification of both GPT copies. The
author says no internal writes or installation were performed. J72 is a
different model; its result does not establish storage support on J85.

The public J72 patch did not fully pass a context check against the retained
public Hoolock kernel base because the MACSMC context differs. An isolated
J72 ASP fixture, with its original J72 machine guard retained and its
registered probe unconditionally refusing, compiled to an AArch64 object
using the saved runtime9 configuration and a local J72 RTKit header overlay.
A separate modpost against the saved runtime9 symbol table failed because
`apple_rtkit_protocol_version` is not exported there; no module was produced.
The object was not loaded, and the overlay is not the running kernel's ABI.

For a follow-up source experiment, J72's RTKit and mailbox changes were applied
in a separate fixture, its MACSMC change was adapted to the Hoolock source
context, and the Apple PMP client was compiled with the same overlay header.
RTKit, mailbox, crashlog, MACSMC and PMP compiled as separate AArch64 objects;
a compile-time layout sentinel also passed. A partial `ld -r` aggregate with
the refusal-probe ASP object resolved the version-function reference but left
111 other symbols unresolved. This is not a full kernel link, device tree,
boot image, working J85 storage driver or proof of runtime safety.

Compiler-emitted layout checks found that the saved RTKit operations structure
places `recv_message` at offset 8, while the J72 overlay places it at offset
16. All shared provider and client binaries therefore need coherent ABI
integration; a single missing-function shim is insufficient. A separate host
test of the patched endpoint-start function showed that a *simulated*
management-send error was not returned to the caller. This is a source/fake
observation, not an observed failure on either physical iPad.

J85-specific firmware handoff, controller/DMA ownership, read-only admission,
timeout and recovery remain unverified. The iPad was not detected over USB
when these builds were made. No internal installation or persistent boot is
established.
