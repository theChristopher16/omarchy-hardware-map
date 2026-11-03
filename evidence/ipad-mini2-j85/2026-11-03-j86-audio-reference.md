# J86 iPad mini 2 audio reference for J85 — public-source review

Reviewed 3 November 2026 UTC. This is a comparison of public sources; no J85 audio experiment was performed in this review.

## Reported J86 result

[Perry Raskin's iPad mini 2 Omarchy project](https://github.com/perryraskin/ipad-mini2-omarchy/tree/bf6637c8e8a679164847493e96ce99ca9627f326) targets the cellular iPad4,5/J86AP, not the J85 Wi-Fi model. Its [native PCM checkpoint](https://github.com/perryraskin/ipad-mini2-omarchy/blob/bf6637c8e8a679164847493e96ce99ca9627f326/audio/pcm-native/README.md) reports that the owner heard a bounded 500 Hz tone from the speakers in an isolated RAM boot. It reports bounded drain, interruption, restart, and cleanup checks on the identified earlier live driver revision. This is the contributor's hardware report; we have not independently reproduced it.

The repository head also contains a queued-worker stop-race correction, which its checkpoint calls host-tested only. It does not qualify that revision, long playback, microphone capture, or desktop/touch/Wi-Fi coexistence. Its [PipeWire checkpoint](https://github.com/perryraskin/ipad-mini2-omarchy/blob/bf6637c8e8a679164847493e96ce99ca9627f326/audio/pipewire/README.md) reports silent application transfers in an isolated session, not audible desktop application output.

The J86 PCM source is explicitly board-gated, requires matching kernel inputs, an exclusive healthy SIO session and the owner's private speaker records. It is not an installer or an unmodified J85 driver. Exact device-specific settings and private calibration must not be copied across boards. The repository's older hardware-summary paragraph says no audible playback; the more specific PCM checkpoint records the subsequent reported test and retains the earlier history.

## J85 boundary and next comparison

On one J85 runtime9 RAM boot, a read-only inventory found no registered ALSA card or playback/capture PCM. Our [earlier J85 audio evidence](https://github.com/theChristopher16/omarchy-hardware-map/blob/9853e028e9835a4ff6c284b93291662d818a9c26/evidence/ipad-mini2-j85/2026-10-28-cascadia-audio-reference.md) and later refusal-only builds and synthetic period-tracker tests do not demonstrate real DMA, speakers or microphone.

The useful next source comparison is SIO ownership, completion/stop handling, clock and amplifier lifecycles, and the separation of live-tested from host-only revisions. Then identify the J85-specific prerequisites and a reviewed, bounded test. No external driver has been installed or run on J85 as a result of this review.
