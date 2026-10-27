# Contributing and moderation

Anyone who can view the site can browse approved records. A ChatGPT account is required to propose a new record, edit, or removal. A moderator inspects each proposal and its source before approval. Rejected submissions can have a moderator note. If an approved record changes after an edit was proposed, the stale proposal is marked as a conflict and must be submitted again against the latest version.

Use exact model names where known. Add component manufacturer and model, architecture, CPU, GPU, memory, Wi-Fi chipset, firmware, Omarchy/kernel version, build stage, observed result, and a public issue, code, log, or documentation link when available. Do not include secrets, personal information, serial numbers, or private logs.

A signed-in contributor can display a public name on a two-hour claim for a specific report. Claims show that someone is working on it; they expire automatically and do not prevent others from proposing changes. A claim's owner or a moderator can release it. Claims are coordination signals, not proof of testing or completion.

Deployers must securely provision the first moderator's site-scoped user ID through their own private deployment administration before enabling public access. The repository deliberately does not include a public first-visitor moderator-setup endpoint. Moderator identity and database contents are deployment-specific and are not stored in the source repository.
