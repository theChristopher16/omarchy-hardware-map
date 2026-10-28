# iPad mini 2 J85 PCM access-mode guard: offline review

The [existing audio evidence](https://github.com/theChristopher16/omarchy-hardware-map/blob/main/evidence/ipad-mini2-j85/2026-10-27-audio.md)
records the earlier RAM-boot inventory and offline audio work. No new physical
audio result is reported here.

A host test using a synthetic stereo planar buffer found that a descriptor
plan from a separate protected PCM staging wrapper would select the wrong
samples. Its older helper assumed interleaved data without checking access;
no DMA transfer occurred. This was not an observed iPad failure.

A local guard permits the two interleaved access types and refuses other
types before the protected validation or staging path writes its temporary
buffers, after existing input and overlap checks. It does not implement
protected planar audio, and direct callers of the older helper still need
their own access checks.

The author and an independent reviewer tested the changed function bodies
with synthetic PCM and DMA objects, including sanitizer and optimized builds.
The independent checks covered 1,024 unsupported access values and 512
synthetic periods across the two accepted access types. These tests depend on
their fixture assumptions and do not establish real audio-device mapping,
synchronization, playback or capture.

The guarded revision has not been built against real kernel headers, loaded
or tested on the iPad. An earlier refusal-only kernel build applied to the
original unchanged bundle, not this revision. Speaker output and microphone
capture remain unverified. The detailed review artifacts are not included
with this note.
