# Contributing and moderation

Anyone who can view the site can browse approved records. A ChatGPT account is required to propose a new record, edit, or removal. A moderator inspects each proposal and its source before approval. Rejected submissions can have a moderator note. If an approved record changes after an edit was proposed, the stale proposal is marked as a conflict and must be submitted again against the latest version.

There is currently no application-level daily submission quota. All submissions, including the owner's, enter the same moderator review queue.

Use exact model names where known. Add component manufacturer and model, architecture, CPU, GPU, memory, Wi-Fi chipset, firmware, Omarchy/kernel version, build stage, observed result, and a public issue, code, log, or documentation link when available. Do not include secrets, personal information, serial numbers, or private logs.

A signed-in contributor can display a public name on a two-hour claim for a specific report. Claims show that someone is working on it; they expire automatically and do not prevent others from proposing changes. A claim's owner or a moderator can release it. Claims are coordination signals, not proof of testing or completion.

The owner can use the Site MCP to grant or revoke additional moderators by their site-scoped user ID. A collaborator can retrieve their own ID with the `get_access` MCP tool and share it with the owner. Moderator role changes require owner access; no one should be added without the owner's authorization.
